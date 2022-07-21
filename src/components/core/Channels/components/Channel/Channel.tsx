import { memo } from 'react';

import * as Styled from './styled';

type ChannelType = {
  index?: number
  master?: boolean
  type: keyof typeof TYPES_TITLES
}

const TYPES_TITLES = {
  AU: 'Audio',
  MI: 'MIDI',
  MA: 'Master'
}

export const Channel = memo(({ index = 0, master = false, type }: ChannelType) => {
  return (
    <Styled.Container>
      {
        master ?
        <Styled.Title>{TYPES_TITLES['MA']}</Styled.Title> :
        <Styled.Title>{`${index + 1} ${TYPES_TITLES[type]}`}</Styled.Title>
      }
    </Styled.Container>
  );
});

Channel.displayName = 'Channel';
