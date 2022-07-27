import { useEffect } from 'react';
import NativeAudioContext from '../../web-audio/NativeAudioContext';
import Gain from '../../web-audio/Gain';

import { useUpdateAudioGlobal } from '../../store/audio/hooks/useUpdateAudioGlobal';

export const AudioProvider = () => {
  const ContextNode = new NativeAudioContext();
  const MasterNode = new Gain(ContextNode.context);

  MasterNode.connectTo(ContextNode.destination);

  const context = ContextNode.context;
  const master = MasterNode.node;

  const { setAudio } = useUpdateAudioGlobal();

  useEffect(() => {
    setAudio({
      context,
      master
    })
  }, []);

  return <></>
};
