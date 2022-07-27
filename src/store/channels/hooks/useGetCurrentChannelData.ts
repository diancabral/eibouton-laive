import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { CurrentChannel } from '..';

export const useGetCurrentChannelData = () => {
  const getCurrentChannel = useAtomValue(CurrentChannel);

  const selected = useAtomValue(useMemo(() => selectAtom(getCurrentChannel, channel => channel.selected), []));
  const metadata = useAtomValue(useMemo(() => selectAtom(getCurrentChannel, channel => channel.metadata), []));
  const mixer = useAtomValue(useMemo(() => selectAtom(getCurrentChannel, channel => channel.mixer), []));
  const device = useAtomValue(useMemo(() => selectAtom(getCurrentChannel, channel => channel.device), []));

  return {
    selected,
    metadata,
    mixer,
    device,
  }
}

export const useGetCurrentChannelDevice = () => {
  const getCurrentChannel = useAtomValue(CurrentChannel);
  return useAtomValue(useMemo(() => selectAtom(getCurrentChannel, channel => channel.device), [getCurrentChannel]));
}

export const useGetCurrentChannelMIDIInput = () => {
  const getCurrentChannel = useAtomValue(CurrentChannel);
  return useAtomValue(useMemo(() => selectAtom(getCurrentChannel, channel => channel.midi.input), [getCurrentChannel]));
}
