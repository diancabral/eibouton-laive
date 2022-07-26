import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { MIDIArmed } from '..';
import { MIDINoteType } from '../types';

export const useUpdateMIDIArmed = () => {
  const updateMIDIArmedOptions = useUpdateAtom(useAtomValue(MIDIArmed));
  const updateMIDIArmed = useUpdateAtom(MIDIArmed);

  const clearMIDIArmed = () => updateMIDIArmedOptions(current => ({
    ...current,
    midi: {
      ...current.midi,
      input: {
        notesOn: [],
        notesOff: 0
      }
    },
    mixer: {
      ...current,
      arm: false,
    }
  }));

  const setMIDIArmedMIDI = ({
    notesOn,
    notesOff
  }: {
    notesOn: MIDINoteType[],
    notesOff: number
  }) => updateMIDIArmedOptions(current => ({
    ...current,
    midi: {
      ...current.midi,
      input: {
        notesOn,
        notesOff
      }
    }
  }));

  return {
    updateMIDIArmed,
    updateMIDIArmedOptions,
    clearMIDIArmed,
    setMIDIArmedMIDI
  }
}
