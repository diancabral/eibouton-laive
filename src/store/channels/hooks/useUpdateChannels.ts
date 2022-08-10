import { atom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { v4 as uuidv4 } from 'uuid';
import { Channels } from '..';
import { defaultChannel } from '../../../models/defaultChannel';
import Gain from '../../../web-audio/Gain';
import { useGetAudioGlobal } from '../../audio/hooks/useGetAudioGlobal';
import { useUpdateCurrentChannel } from './useUpdateCurrentChannel';

export const useUpdateChannels = () => {
  const updateChannels = useUpdateAtom(Channels);

  const { setCurrentChannel, setCurrentChannelAudio } = useUpdateCurrentChannel();
  const { context, master } = useGetAudioGlobal();

  const createChannel = (externalContext: AudioContext = context, externalMaster: GainNode = master) => {
    const output = new Gain(externalContext);
    output.connectTo(externalMaster);
    const cloned = structuredClone(defaultChannel);
    const data = {
      uuid: uuidv4(),
      channel: atom({
        ...cloned,
        output: output.node,
      }),
    };
    setCurrentChannel(data);
    setCurrentChannelAudio(externalContext, externalMaster);
    updateChannels((current) => [...current, data]);
  };

  return {
    createChannel,
  };
};
