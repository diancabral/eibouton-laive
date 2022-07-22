import React, { memo, ReactElement } from 'react';
import NativeAudioContext from '../../web-audio/NativeAudioContext';
import Gain from '../../web-audio/Gain';
import { AudioContextTypes } from './types';


const NativeAudioContextNode = new NativeAudioContext();
const GainNode = new Gain(NativeAudioContextNode.context);

GainNode.connectTo(NativeAudioContextNode.destination);

//

type AudioContextProps = {
  children?: ReactElement | ReactElement[]
}

const value = {
  context: NativeAudioContextNode.context,
  master: GainNode.node
}

export const AudioContext = React.createContext<AudioContextTypes>(value);

AudioContext.displayName = 'AudioContext';

//

export const AudioProvider = memo(({ children }: AudioContextProps) => {
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
});

AudioProvider.displayName = 'AudioProvider';
