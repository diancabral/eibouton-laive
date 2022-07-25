import { ReactElement } from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { ChannelType } from '../../../../../../store/channels/types';
import { useUpdateCurrentChannel } from '../../../../../../hooks/useUpdateCurrentChannel';

export const useUpdateChannelData = (data: ChannelType) => {
  const updateChannelOptions = useUpdateAtom(data.channel);
  const { updateCurrentChannel, clearCurrentChannelMIDI } = useUpdateCurrentChannel();

  const updateChannelDevice = (component: ReactElement) => updateChannelOptions(current => ({
    ...current,
    device: {
      ...current.device,
      component
    }
  }));

  const updateChannelTitle = (title: string) => updateChannelOptions(current => ({
    ...current,
    metadata: {
      ...current.metadata,
      title,
    },
  }));

  const activateChannelArm = () => {
    clearCurrentChannelMIDI();
    updateCurrentChannel(data.channel);
    updateChannelOptions(current => ({
      ...current,
      mixer: {
        ...current.mixer,
        arm: true
      }
    }));
  };

  return {
    updateChannelTitle,
    updateChannelDevice,
    activateChannelArm
  }
}