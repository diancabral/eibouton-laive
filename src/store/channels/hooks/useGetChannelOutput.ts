import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { ChannelType } from '../../../types';

export const useGetChannelOutput = (data: ChannelType) => {
  return useAtomValue(useMemo(() => selectAtom(data.channel, (channel) => channel.output), [data]));
};
