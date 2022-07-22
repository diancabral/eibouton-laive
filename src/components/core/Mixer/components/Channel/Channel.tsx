import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { AudioContext } from '../../../../../contexts/AudioContext/AudioContext';
import { MIDIContext } from '../../../../../contexts/MIDIContext/MIDIContext';
import Oscilattor from '../../../../../web-audio/Oscilattor';
import { TYPES_TITLES } from './consts';

import * as Styled from './styled';

type ChannelType = {
  index?: number
  master?: boolean
  type: keyof typeof TYPES_TITLES
}

const Device = () => {
  const midi = useContext(MIDIContext);
  const audio = useContext(AudioContext);

  const [currentOscilattors, setCurrentOscilattors] = useState<{
    oscilattor: Oscilattor,
    key: number,
  }[]>([]);

  const clearOscilattors = () => {
    currentOscilattors.forEach((val) => val.oscilattor.stop());
  }

  const clearOscilattor = (key: number) => {
    const index = currentOscilattors.findIndex((val) => val.key === key);
    if (index > -1) {
      currentOscilattors[index].oscilattor.stop();
      setCurrentOscilattors(currentOscilattors.filter((val) => val.key !== key));
    }
  }

  useEffect(() => {
    if ((midi.messages || []).length) {
      clearOscilattors();
      const oscilattor = new Oscilattor(audio.context);
      oscilattor.connectTo(audio.master);
      oscilattor.wave = 'sawtooth';
      const key = (midi.messages || []).map((val) => val.key).slice(-1)[0] || 0;
      oscilattor.key = key;
      oscilattor.play();
      setCurrentOscilattors(current => [...current, {
        oscilattor,
        key
      }]);
    }
  }, [midi.messages]);

  useEffect(() => {
    clearOscilattor(midi.release || 0);
  }, [midi.release]);

  //

  return <p>oscilattor</p>
}

export const Channel = memo(({ index = 0, master = false, type }: ChannelType) => {
  return (
    <Styled.Container>
      {
        master ?
        <Styled.Title>{TYPES_TITLES['MA']}</Styled.Title> :
        <Styled.Title>{`${index + 1} ${TYPES_TITLES[type]}`}</Styled.Title>
      }
      { !master ? <Device /> : null }
    </Styled.Container>
  );
});

Channel.displayName = 'Channel';
