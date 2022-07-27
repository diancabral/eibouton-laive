import { atom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { v4 as uuidv4 } from 'uuid';
import { Channels } from '..';
import { defaultChannel } from '../../../models/defaultChannel';
import { useUpdateCurrentChannel } from './useUpdateCurrentChannel';

export const useUpdateChannels = () => {
  const updateChannels = useUpdateAtom(Channels);

  const { setCurrentChannel } = useUpdateCurrentChannel();

  const createChannel = () => {
    const data = {
      uuid: uuidv4(),
      channel: atom(structuredClone(defaultChannel)),
    };
    setCurrentChannel(data);
    updateChannels((current) => ([
      ...current,
      data
    ]));
  }

  return {
    createChannel
  }
};
