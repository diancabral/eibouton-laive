import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { ChannelType } from '../../../types';

export const useGetChannelData = (data: ChannelType) => {
  const selected = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.selected), [data.channel]));
  const metadata = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.metadata), [data.channel]));
  const mixer = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.mixer), [data.channel]));
  const device = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.device), [data.channel]));
  const midi = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.midi.input), [data.channel]));

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
  return useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.device.component), [data.channel]));
}
