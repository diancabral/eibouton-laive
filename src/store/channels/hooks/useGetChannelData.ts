import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { ChannelType } from '../../../types';

export const useGetChannelData = (data: ChannelType) => {
  const selected = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.selected), [data]));
  const metadata = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.metadata), [data]));
  const mixer = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.mixer), [data]));
  const device = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.device), [data]));
  const midi = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.midi.input), [data]));

  const isMaster = metadata.type === 'master';

  return {
    selected,
    metadata,
    mixer,
    device,
    midi,
    isMaster
  }
}

export const useGetDevice = (data: ChannelType) => {
  return useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.device.component), [data]));
}
