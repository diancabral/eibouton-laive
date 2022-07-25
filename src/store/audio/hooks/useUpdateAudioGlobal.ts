import { Audio } from '..'
import { useUpdateAtom } from 'jotai/utils'

export const useUpdateAudioGlobal = () => {
  const updateAudio = useUpdateAtom(Audio);

  const setAudio = ({
    context,
    master
  }: {
    context: AudioContext,
    master: GainNode
  }) => {
    updateAudio(current => ({
      ...current,
      context,
      master,
    }));
  }

  return {
    setAudio
  }
}
