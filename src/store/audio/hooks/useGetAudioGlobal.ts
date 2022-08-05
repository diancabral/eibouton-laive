import { useAtomValue } from 'jotai/utils';
import { Audio } from '..';

export const useGetAudioGlobal = () => {
  const audio = useAtomValue(Audio);

  const context = audio.context as AudioContext;
  const master = audio.master as GainNode;

  return {
    context,
    master,
  };
};
