import { atom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { v4 as uuidv4 } from 'uuid';
import { Channels } from '../store/channels';
import { ChannelModel } from '../store/channels/models';
import { useUpdateCurrentChannel } from './useUpdateCurrentChannel';

export const useUpdateChannels = () => {
  const updateChannels = useUpdateAtom(Channels);

  const { updateCurrentChannel, clearCurrentChannelMIDI } = useUpdateCurrentChannel();

  const createChannel = () => {
    clearCurrentChannelMIDI();
    const data = {
      uuid: uuidv4(),
      channel: atom(structuredClone(ChannelModel)),
    };
    updateCurrentChannel(data.channel);
    updateChannels((current) => ([
      ...current,
      data
    ]));
  }

  return {
    createChannel
  }
};
