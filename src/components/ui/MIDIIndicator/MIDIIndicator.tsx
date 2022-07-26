import { useMemo } from 'react';
import { MIDIInputType } from '../../../store/midi/types';

import * as Styled from './styled';

type MIDIIndicatorType = {
  data: MIDIInputType;
  small?: boolean;
};

export const MIDIIndicator = ({ data, small }: MIDIIndicatorType) => {
  const midi = useMemo(() => data.notesOn, [data.notesOn]);
  const dots = useMemo(() => {
    const length = small ? 10 : 20;
    const array = [...Array(length).keys()];
    const note = midi.slice(-1)[0];
    return array
      .map((val, index) => ({
        active: !!midi.length && index * (127 / length) <= (note.velocity || 0),
        duration: (!!midi.length ? index : array.length - index) / 200,
      }))
      .reverse();
  }, [midi]);

  return (
    <Styled.Container>
      {dots.map((val, index) => (
        <Styled.Dots $active={val.active} $duration={val.duration} key={index} $small={small as boolean} />
      ))}
    </Styled.Container>
  );
};
