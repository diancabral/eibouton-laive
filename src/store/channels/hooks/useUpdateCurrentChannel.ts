import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { CurrentChannel } from '..';
import { ChannelType } from '../../../types';
import Gain from '../../../web-audio/Gain';
import { useUpdateMIDIArmed } from '../../midi/hooks/useUpdateMIDIArmed';

export const useUpdateCurrentChannel = () => {
  const getCurrentChannel = useAtomValue(CurrentChannel);
  const updateCurrentChannelOptions = useUpdateAtom(getCurrentChannel);
  const updateCurrentChannel = useUpdateAtom(CurrentChannel);

  const { updateMIDIArmed, clearMIDIArmed } = useUpdateMIDIArmed();

  const clearChannelSelected = () => {
    if (Object.keys(getCurrentChannel).length) {
      updateCurrentChannelOptions((current) => ({
        ...current,
        selected: false,
      }));
    }
  };

  const setCurrentChannel = (data: ChannelType, midi: boolean = true) => {
    if (midi) {
      clearMIDIArmed();
      updateMIDIArmed(data.channel);
    }
    clearChannelSelected();
    updateCurrentChannel(data.channel);
  };

  const setCurrentChannelAudio = (context: AudioContext, master: GainNode) => {
    if (Object.keys(getCurrentChannel).length) {
      updateCurrentChannelOptions((current) => {
        const output = new Gain(context);
        output.connectTo(master);
        return {
          ...current,
          output: output.node,
        };
      });
    }
  };

  return {
    setCurrentChannel,
    updateCurrentChannel,
    updateCurrentChannelOptions,
    setCurrentChannelAudio,
  };
};
