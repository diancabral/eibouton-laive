import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { ChannelType } from '../../../types';

export const useGetChannelDeviceConfig = (data: ChannelType) => {
  return useAtomValue(useMemo(() => selectAtom(data.channel, (channel) => channel.device.config), [data]));
};

export const useGetChannelDeviceComponent = (data: ChannelType) => {
  return useAtomValue(useMemo(() => selectAtom(data.channel, (channel) => channel.device.component), [data]));
};
