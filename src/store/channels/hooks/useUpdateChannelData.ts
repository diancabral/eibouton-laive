import { ReactElement } from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { useUpdateCurrentChannel } from './useUpdateCurrentChannel';
import { ChannelDeviceConfig, ChannelType } from '../../../types';

export const useUpdateChannelData = (data: ChannelType) => {
  const updateChannelOptions = useUpdateAtom(data.channel);
  const { setCurrentChannel } = useUpdateCurrentChannel();

  const updateChannelDeviceConfig = (config: ChannelDeviceConfig) => {
    updateChannelOptions((current) => ({
      ...current,
      device: {
        ...current.device,
        config,
      },
    }));
  };

  const updateChannelDevice = (component: ReactElement) => {
    updateChannelOptions((current) => ({
      ...current,
      device: {
        ...current.device,
        component,
      },
    }));
    activateChannelArm();
  };

  const updateChannelTitle = (title: string) =>
    updateChannelOptions((current) => ({
      ...current,
      metadata: {
        ...current.metadata,
        title,
      },
    }));

  const updateChannelSelected = () => {
    setCurrentChannel(data, false);
    updateChannelOptions((current) => ({
      ...current,
      selected: true,
    }));
  };

  const activateChannelArm = () => {
    setCurrentChannel(data);
    updateChannelOptions((current) => ({
      ...current,
      selected: true,
      mixer: {
        ...current.mixer,
        arm: true,
      },
    }));
  };

  const deactivateChannelArm = () => {
    updateChannelOptions((current) => ({
      ...current,
      mixer: {
        ...current.mixer,
        arm: false,
      },
    }));
  };

  const activateSoloChannel = () => {
    updateChannelOptions((current) => ({
      ...current,
      mixer: {
        ...current.mixer,
        solo: true,
      },
    }));
  };

  return {
    updateChannelTitle,
    updateChannelDevice,
    activateChannelArm,
    deactivateChannelArm,
    activateSoloChannel,
    updateChannelSelected,
    updateChannelDeviceConfig,
  };
};
