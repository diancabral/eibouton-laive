import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { clearMIDINotes } from '../providers/MIDIProvider/utils';
import { CurrentChannel } from '../store/channels';

export const useUpdateCurrentChannel = () => {
  const updateCurrentChannelOptions = useUpdateAtom(useAtomValue(CurrentChannel));
  const updateCurrentChannel = useUpdateAtom(CurrentChannel);

  const clearCurrentChannelMIDI = () => updateCurrentChannelOptions(clearMIDINotes);

  return {
    updateCurrentChannel,
    updateCurrentChannelOptions,
    clearCurrentChannelMIDI
  }
}
