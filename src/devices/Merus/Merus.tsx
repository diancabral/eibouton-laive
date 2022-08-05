import { useEffect, useMemo, useState } from 'react';
import Oscillator from '../../web-audio/Oscillator';
import { ChannelType } from '../../types';
import { useGetAudioGlobal } from '../../store/audio/hooks/useGetAudioGlobal';
import { useGetDeviceConfig } from '../../store/channels/hooks/useGetChannelDevice';
import { useGetMIDIMessages } from '../../store/midi/hooks/useGetMIDIMessages';
import Gain from '../../web-audio/Gain';

type MerusType = {
  data: ChannelType;
};

export const Merus = ({ data }: MerusType) => {
  const { context, master } = useGetAudioGlobal();

  const output = new Gain(context);

  output.connectTo(master);

  const midi = useGetMIDIMessages(data);
  const config = useGetDeviceConfig(data);

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

  const osc1Wave = useMemo(() => config.osc1?.wave, [config]);
  const osc1Attack = useMemo(() => config.osc1?.attack, [config]);
  const osc1Decay = useMemo(() => config.osc1?.decay, [config]);
  const osc1Sustain = useMemo(() => config.osc1?.sustain, [config]);
  const osc1Octave = useMemo(() => config.osc1?.octave, [config]);
  const osc1Fine = useMemo(() => config.osc1?.fine, [config]);
  const osc1Volume = useMemo(() => config.osc1?.volume, [config]);

  const volume = useMemo(() => config.volume, [config]);
  const portamento = useMemo(() => config.portamento, [config]);

  // const updateOscilattorsWave = (wave: OscillatorType) => {
  //   setCurrentOscillators((current) => {
  //     current.forEach(({ oscillators }) => oscillators.forEach((oscilattor) => (oscilattor.wave = wave)));
  //     return current;
  //   });
  // };

  // useEffect(() => {
  //   updateOscilattorsWave(wave as OscillatorType);
  // }, [wave]);

  // const updateOscilattorsOctave = (octave: number) => {
  //   setCurrentOscillators((current) => {
  //     current.forEach(({ oscillators }) => oscillators.forEach((oscilattor) => (oscilattor.octave = octave)));
  //     return current;
  //   });
  // };

  // useEffect(() => {
  //   updateOscilattorsOctave(octave as number);
  // }, [octave]);

  // const updateOscilattorsFine = (fine: number) => {
  //   setCurrentOscillators((current) => {
  //     current.forEach(({ oscillators }) => oscillators.forEach((oscilattor) => (oscilattor.fine = fine)));
  //     return current;
  //   });
  // };

  // useEffect(() => {
  //   updateOscilattorsFine(fine as number);
  // }, [fine]);

  useEffect(() => {
    output.volume = (volume as number) || 0;
  }, [volume, output]);

  const monophonic = true;
  const voices = 1;

  const midiNewNote = useMemo(() => {
    return midi.notesOn.map((val) => val.key).slice(-1)[0] || 0;
  }, [midi.notesOn]);

  const merusOscillators: ['osc1', 'osc2'] = ['osc1', 'osc2'];

  useEffect(() => {
    if (midi.notesOn.length) {
      merusOscillators.forEach((osc) => {
        if (config[osc]?.active) {
          const oscillator = new Oscillator(context);

          oscillator.wave = (config[osc]?.wave as OscillatorType) || 'sawtooth';
          oscillator.fine = (config[osc]?.fine as number) || 0;
          oscillator.volume = (config[osc]?.volume as number) || 0;

          const key = midiNewNote;
          oscillator.setKey(key + (config[osc]?.octave || 0) * 12, lastKey, (portamento || 0) / 1000);

          // if (voices === 1) stopOscillator(key);
          // if (monophonic && lastKey) stopOscillator(lastKey);

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

          oscillator.connectTo(output.node);
          oscillator.play(config[osc]?.attack, config[osc]?.decay, config[osc]?.sustain);
        }
      });
    } else {
      stopAllOscillators();
    }
  }, [midiNewNote]);

  useEffect(() => {
    stopOscillator(midi.notesOff);
  }, [midi.notesOff]);

  //

  return <></>;
};
