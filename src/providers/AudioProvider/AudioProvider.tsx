import { ReactElement, ReactNode, useEffect, useState } from 'react';
import NativeAudioContext from '../../web-audio/NativeAudioContext';
import Gain from '../../web-audio/Gain';

import { useUpdateAudioGlobal } from '../../store/audio/hooks/useUpdateAudioGlobal';
import { useUpdateChannels } from '../../store/channels/hooks/useUpdateChannels';

type AudioProviderProps = {
  children: ReactElement | ReactNode;
};

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const ContextNode = new NativeAudioContext();
  const MasterNode = new Gain(ContextNode.context);

  MasterNode.connectTo(ContextNode.destination);

  const context = ContextNode.context;
  const master = MasterNode.node;

  const { setAudio } = useUpdateAudioGlobal();
  const { createChannel } = useUpdateChannels();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAudio({
      context,
      master,
    });
    createChannel(context, master);
    setReady(true);
  }, []);

  return ready ? <>{children}</> : <></>;
};
