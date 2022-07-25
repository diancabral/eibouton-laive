import { useAtomValue } from 'jotai/utils';
import { Audio } from '..';

export const useGetAudioGlobal = () => {
  const audio = useAtomValue(Audio);

  const context = audio.context;
  const master = audio.master;

  return {
    context,
    master
  }
}
