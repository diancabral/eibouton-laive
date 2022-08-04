import { useEffect, useMemo, useState } from 'react';
import Oscillator from '../../web-audio/Oscillator';
import { ChannelType } from '../../types';
import { useGetMIDIMessages } from './hooks/useGetMIDIMessages';
import { useGetAudioGlobal } from '../../store/audio/hooks/useGetAudioGlobal';
import { useGetDeviceConfig } from './hooks/useGetDeviceConfig';

type MerusType = {
  data: ChannelType;
};

export const Merus = ({ data }: MerusType) => {
  const { context, master } = useGetAudioGlobal();
  const { midi } = useGetMIDIMessages(data);
  const { config } = useGetDeviceConfig(data);

  const [, setCurrentOscillators] = useState<
    {
      oscillators: Oscillator[];
      key: number;
    }[]
  >([]);

  //

  const [lastKey, setLastKey] = useState(0);

  const stopOscillator = (key: number) => {
    setCurrentOscillators((current) => {
      const group = current.find((val) => val.key === key);
      if (group) {
        group.oscillators.forEach((oscillator) => {
          oscillator.stop();
        });
        return current.filter((val) => val.key !== key);
      }
      return current;
    });
  };

  const stopAllOscillators = () => {
    setCurrentOscillators((current) => {
      current.forEach(({ oscillators }) => oscillators.forEach((oscilattor) => oscilattor.stop()));
      return current;
    });
  };

  //

  const wave = useMemo(() => config.wave, [config]);
  const attack = useMemo(() => config.attack, [config]);
  const decay = useMemo(() => config.decay, [config]);
  const sustain = useMemo(() => config.sustain, [config]);
  const octave = useMemo(() => config.octave, [config]);
  const fine = useMemo(() => config.fine, [config]);
  const portamento = useMemo(() => config.portamento, [config]);
  const release = useMemo(() => config.release, [config]);

  const updateOscilattorsWave = (wave: OscillatorType) => {
    setCurrentOscillators((current) => {
      current.forEach(({ oscillators }) => oscillators.forEach((oscilattor) => (oscilattor.wave = wave)));
      return current;
    });
  };

  useEffect(() => {
    updateOscilattorsWave(wave as OscillatorType);
  }, [wave]);

  const updateOscilattorsOctave = (octave: number) => {
    setCurrentOscillators((current) => {
      current.forEach(({ oscillators }) => oscillators.forEach((oscilattor) => (oscilattor.octave = octave)));
      return current;
    });
  };

  useEffect(() => {
    updateOscilattorsOctave(octave as number);
  }, [octave]);

  const updateOscilattorsFine = (fine: number) => {
    setCurrentOscillators((current) => {
      current.forEach(({ oscillators }) => oscillators.forEach((oscilattor) => (oscilattor.fine = fine)));
      return current;
    });
  };

  useEffect(() => {
    updateOscilattorsFine(fine as number);
  }, [fine]);

  const monophonic = true;
  const voices = 1;
  // const detune = 0;

  useEffect(() => {
    if (midi.notesOn.length) {
      for (let i = 0; i < voices; i++) {
        const oscillator = new Oscillator(context as AudioContext);

        oscillator.wave = (wave as OscillatorType) || 'sawtooth';
        oscillator.fine = fine as number;
        // oscillator.fine = 0 + oscillator.calcDetuneFine(i, voices, detune);

        const key = midi.notesOn.map((val) => val.key).slice(-1)[0] || 0;
        oscillator.setKey(key + (octave || 0) * 12, lastKey, (portamento || 0) / 1000);

        if (voices === 1) stopOscillator(key);
        if (monophonic && lastKey) stopOscillator(lastKey);

        setCurrentOscillators((current) => {
          const index = current.findIndex((val) => val.key === key);
          if (index > -1) {
            current[index].oscillators.push(oscillator);
            return current;
          }
          return [
            ...current,
            {
              oscillators: [oscillator],
              key,
            },
          ];
        });
        setLastKey(key);

        oscillator.connectTo(master as GainNode);
        oscillator.play(attack, decay, sustain);
      }
    } else {
      stopAllOscillators();
    }
  }, [midi.notesOn]);

  useEffect(() => {
    stopOscillator(midi.notesOff);
  }, [midi.notesOff]);

  //

  return <></>;
};
