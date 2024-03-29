import { useEffect, useState } from 'react';
import Oscillator from '../../web-audio/Oscillator';
import { ChannelType } from '../../types';
import { useGetMIDIMessages } from './hooks/useGetMIDIMessages';
import { useGetAudioGlobal } from '../../store/audio/hooks/useGetAudioGlobal';

type MerusType = {
  data: ChannelType;
  type?: OscillatorType;
}

export const Merus = ({ data, type = 'sawtooth' }: MerusType) => {
  const { context, master } = useGetAudioGlobal();
  const { midi } = useGetMIDIMessages(data);

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

  const stopAllOscillators = () => {
    setCurrentOscillators(current => {
      current.forEach(({ oscillators }) => oscillators.forEach((oscilattor) => oscilattor.stop()));
      return current;
    });
  }

  const monophonic = true;
  const portamento = .05;
  const voices = 1;
  // const detune = 0;

  useEffect(() => {
    if (midi.notesOn.length) {
      for (let i = 0; i < voices; i++) {
        const oscillator = new Oscillator(context as AudioContext);

        oscillator.wave = type;
        // oscillator.fine = 0 + oscillator.calcDetuneFine(i, voices, detune);

        const key = midi.notesOn.map((val) => val.key).slice(-1)[0] || 0;
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

        oscillator.connectTo(master as GainNode);
        oscillator.play();
      }
    } else {
      stopAllOscillators();
    }
  }, [midi.notesOn]);

  useEffect(() => {
    stopOscillator(midi.notesOff);
  }, [midi.notesOff]);

  //

  return <></>
}
