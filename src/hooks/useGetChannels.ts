import { useAtomValue } from 'jotai';
import { Channels } from '../store/channels';

export const useGetChannels = () => {
  const channels = useAtomValue(Channels);

  return {
    channels
  }
}
