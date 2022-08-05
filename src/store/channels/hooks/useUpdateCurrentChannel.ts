import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { CurrentChannel } from '..';
import { ChannelType } from '../../../types';
import Gain from '../../../web-audio/Gain';
import { useGetAudioGlobal } from '../../audio/hooks/useGetAudioGlobal';
import { useUpdateMIDIArmed } from '../../midi/hooks/useUpdateMIDIArmed';

export const useUpdateCurrentChannel = () => {
  const updateCurrentChannelOptions = useUpdateAtom(useAtomValue(CurrentChannel));
  const updateCurrentChannel = useUpdateAtom(CurrentChannel);

  const { updateMIDIArmed, clearMIDIArmed } = useUpdateMIDIArmed();

  const clearChannelSelected = () =>
    updateCurrentChannelOptions((current) => ({
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
  };

  const setCurrentChannelAudio = (context: AudioContext, master: GainNode) => {
    updateCurrentChannelOptions((current) => {
      const output = new Gain(context);
      output.connectTo(master);
      return {
        ...current,
        output: output.node,
      };
    });
  };

  return {
    setCurrentChannel,
    updateCurrentChannel,
    updateCurrentChannelOptions,
    setCurrentChannelAudio,
  };
};
