import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { ChannelType } from '../../../types';

export const useGetDeviceConfig = (data: ChannelType) => {
  return useAtomValue(useMemo(() => selectAtom(data.channel, (channel) => channel.device.config), [data]));
};

export const useGetDeviceComponent = (data: ChannelType) => {
  return useAtomValue(useMemo(() => selectAtom(data.channel, (channel) => channel.device.component), [data]));
};
