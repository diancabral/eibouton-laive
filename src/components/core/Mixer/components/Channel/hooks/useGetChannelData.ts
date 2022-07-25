import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { ChannelType } from '../../../../../../store/channels/types';

export const useGetChannelData = (data: ChannelType) => {
  const metadata = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.metadata), []));
  const mixer = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.mixer), []));
  const device = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.device), []));

  const isMaster = metadata.type === 'master';

  return {
    metadata,
    mixer,
    device,
    isMaster
  }
}
