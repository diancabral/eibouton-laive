import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { CurrentChannel } from '..';
import { MIDINoteType } from '../../midi/types';

export const useUpdateCurrentChannel = () => {
  const updateCurrentChannelOptions = useUpdateAtom(useAtomValue(CurrentChannel));
  const updateCurrentChannel = useUpdateAtom(CurrentChannel);

  const clearCurrentChannelMIDI = () => updateCurrentChannelOptions(current => ({
    ...current,
    midi: {
      ...current.midi,
      input: {
        notesOn: [],
        notesOff: 0
      }
    },
    mixer: {
      ...current.mixer,
      arm: false,
    }
  }));

  const setCurrentChannelMIDI = ({
    notesOn,
    notesOff
  }: {
    notesOn: MIDINoteType[],
    notesOff: number
  }) => updateCurrentChannelOptions(current => ({
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
    updateCurrentChannel,
    updateCurrentChannelOptions,
    clearCurrentChannelMIDI,
    setCurrentChannelMIDI
  }
}
