import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { ChannelType } from '../../../types';

export const useGetChannelData = (data: ChannelType) => {
  const selected = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.selected), []));
  const metadata = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.metadata), []));
  const mixer = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.mixer), []));
  const device = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.device), []));
  const midi = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.midi.input), []));

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
  return useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.device.component), []));
}
