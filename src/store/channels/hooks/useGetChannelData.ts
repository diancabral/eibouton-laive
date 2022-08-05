import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { ChannelType } from '../../../types';

export const useGetChannelData = (data: ChannelType) => {
  const selected = useAtomValue(useMemo(() => selectAtom(data.channel, (channel) => channel.selected), [data]));
  const metadata = useAtomValue(useMemo(() => selectAtom(data.channel, (channel) => channel.metadata), [data]));
  const mixer = useAtomValue(useMemo(() => selectAtom(data.channel, (channel) => channel.mixer), [data]));

  const isMaster = metadata.type === 'master';

  return {
    selected,
    metadata,
    mixer,
    isMaster,
  };
};
