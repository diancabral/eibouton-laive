import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { CurrentChannel } from '..';
import { ChannelType } from '../../../types';
import { useUpdateMIDIArmed } from '../../midi/hooks/useUpdateMIDIArmed';

export const useUpdateCurrentChannel = () => {
  const updateCurrentChannelOptions = useUpdateAtom(useAtomValue(CurrentChannel));
  const updateCurrentChannel = useUpdateAtom(CurrentChannel);

  const { updateMIDIArmed, clearMIDIArmed } = useUpdateMIDIArmed();

  const clearChannelSelected = () => updateCurrentChannelOptions(current => ({
    ...current,
    selected: false,
  }));

  const setCurrentChannel = (data: ChannelType, midi: boolean = true) => {
    if (midi) {
      clearMIDIArmed();
      updateMIDIArmed(data.channel);
    }
    clearChannelSelected();
    updateCurrentChannel(data.channel);
  }

  return {
    setCurrentChannel,
    updateCurrentChannel,
    updateCurrentChannelOptions,
  }
}
