import { useContext, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AudioContext } from '../../contexts/AudioContext/AudioContext';
import { MIDINotesOff, MIDINotesOn } from '../../store/midi';
import Oscillator from '../../web-audio/Oscillator';

export const Merus = () => {
  const [notes] = useAtom(MIDINotesOn);
  const [release] = useAtom(MIDINotesOff);
  const audio = useContext(AudioContext);

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
  const portamento = .005;
  const voices = 1;
  // const detune = 0;

  useEffect(() => {
    if (notes.length) {
      for (let i = 0; i < voices; i++) {
        const oscillator = new Oscillator(audio.context);

        oscillator.wave = 'sawtooth';
        // oscillator.fine = 0 + oscillator.calcDetuneFine(i, voices, detune);

        const key = notes.map((val) => val.key).slice(-1)[0] || 0;
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
  }, [notes]);

  useEffect(() => {
    stopOscillator(release as number);
  }, [release]);

  //

  return <p>oscillator</p>
}
