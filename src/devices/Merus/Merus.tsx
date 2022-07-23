import { useContext, useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { AudioContext } from '../../contexts/AudioContext/AudioContext';
import Oscillator from '../../web-audio/Oscillator';
import { ChannelType } from '../../store/channels/types';

type MerusType = {
  data: ChannelType;
  type: OscillatorType;
}

export const Merus = ({ data, type }: MerusType) => {
  const audio = useContext(AudioContext);

  const [channel] = useAtom(data.channel);

  const notes = useMemo(() => channel.midi.input, [channel.midi.input]);

  const [, setCurrentOscillators] = useState<{
    oscillators: Oscillator[],
    key: number,
  }[]>([]);

  const [lastKey, setLastKey] = useState(0);

  const stopOscillator = (key: number) => {
    setCurrentOscillators(current => {
      const group = current.find((val) => val.key === key);
      if (group) {
        group.oscillators.forEach((oscillator) => {
          oscillator.stop();
        });
        return current.filter((val) => val.key !== key);
      }
      return current;
    });
  }

  const monophonic = true;
  const portamento = .05;
  const voices = 1;
  // const detune = 0;

  useEffect(() => {
    if (notes.notesOn.length) {
      for (let i = 0; i < voices; i++) {
        const oscillator = new Oscillator(audio.context);

        oscillator.wave = type;
        // oscillator.fine = 0 + oscillator.calcDetuneFine(i, voices, detune);

        const key = notes.notesOn.map((val) => val.key).slice(-1)[0] || 0;
        oscillator.setKey(key, lastKey, portamento);

        if (voices === 1) stopOscillator(key);
        if (monophonic && lastKey) stopOscillator(lastKey);

        setCurrentOscillators(current => {
          const index = current.findIndex(val => val.key === key);
          if (index > -1) {
            current[index].oscillators.push(oscillator);
            return current;
          }
          return [...current, {
            oscillators: [oscillator],
            key
          }];
        });
        setLastKey(key);

        oscillator.connectTo(audio.master);
        oscillator.play();
      }
    }
  }, [notes.notesOn]);

  useEffect(() => {
    stopOscillator(notes.notesOff);
  }, [notes.notesOff]);

  //

  return <p>oscillator</p>
}
