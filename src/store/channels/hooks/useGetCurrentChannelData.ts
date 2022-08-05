import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { CurrentChannel } from '..';

export const useGetCurrentChannelDeviceComponent = () => {
  const getCurrentChannel = useAtomValue(CurrentChannel);
  return useAtomValue(useMemo(() => selectAtom(getCurrentChannel, (channel) => channel.device.component), [getCurrentChannel]));
};

export const useGetCurrentChannelMIDIInput = () => {
  const getCurrentChannel = useAtomValue(CurrentChannel);
  return useAtomValue(useMemo(() => selectAtom(getCurrentChannel, (channel) => channel.midi.input), [getCurrentChannel]));
};
