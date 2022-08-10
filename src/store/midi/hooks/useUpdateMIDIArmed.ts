import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { MIDIArmed } from '..';
import { MIDINoteType } from '../types';

export const useUpdateMIDIArmed = () => {
  const getMIDIArmed = useAtomValue(MIDIArmed);
  const updateMIDIArmedOptions = useUpdateAtom(getMIDIArmed);
  const updateMIDIArmed = useUpdateAtom(MIDIArmed);

  const clearMIDIArmed = () => {
    if (Object.keys(getMIDIArmed).length) {
      updateMIDIArmedOptions((current) => ({
        ...current,
        midi: {
          ...current.midi,
          input: {
            notesOn: [],
            notesOff: 0,
          },
        },
        mixer: {
          ...current,
          arm: false,
        },
      }));
    }
  };

  const clearMIDIArmedNotes = () =>
    updateMIDIArmedOptions((current) => ({
      ...current,
      midi: {
        ...current.midi,
        input: {
          notesOn: [],
          notesOff: 0,
        },
      },
    }));

  const setMIDIArmedMIDI = ({ notesOn, notesOff }: { notesOn: MIDINoteType[]; notesOff: number }) =>
    updateMIDIArmedOptions((current) => ({
      ...current,
      midi: {
        ...current.midi,
        input: {
          notesOn,
          notesOff,
        },
      },
    }));

  return {
    updateMIDIArmed,
    updateMIDIArmedOptions,
    clearMIDIArmed,
    clearMIDIArmedNotes,
    setMIDIArmedMIDI,
  };
};
