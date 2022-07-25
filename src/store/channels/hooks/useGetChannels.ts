import { useAtomValue } from 'jotai';
import { Channels } from '..';

export const useGetChannels = () => {
  const channels = useAtomValue(Channels);

  return {
    channels
  }
}
