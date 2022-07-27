import { ReactElement } from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { useUpdateCurrentChannel } from './useUpdateCurrentChannel';
import { ChannelType } from '../../../types';

export const useUpdateChannelData = (data: ChannelType) => {
  const updateChannelOptions = useUpdateAtom(data.channel);
  const { setCurrentChannel } = useUpdateCurrentChannel();

  const updateChannelDevice = (component: ReactElement) => {
    updateChannelOptions(current => ({
      ...current,
      device: {
        ...current.device,
        component
      }
    }));
    activateChannelArm();
  };

  const updateChannelTitle = (title: string) => updateChannelOptions(current => ({
    ...current,
    metadata: {
      ...current.metadata,
      title,
    },
  }));

  const updateChannelSelected = () => {
    setCurrentChannel(data, false);
    updateChannelOptions(current => ({
      ...current,
      selected: true
    }));
  };

  const activateChannelArm = () => {
    setCurrentChannel(data);
    updateChannelOptions(current => ({
      ...current,
      selected: true,
      mixer: {
        ...current.mixer,
        arm: true
      }
    }));
  };

  const activateSoloChannel = () => {
    updateChannelOptions(current => ({
      ...current,
      mixer: {
        ...current.mixer,
        solo: true
      }
    }));
  };

  return {
    updateChannelTitle,
    updateChannelDevice,
    activateChannelArm,
    activateSoloChannel,
    updateChannelSelected,
  }
}
