import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { ChannelType } from '../../../types';

export const useGetMIDIMessages = (data: ChannelType) => {
  const midi = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.midi.input), []));
  return { midi }
};
