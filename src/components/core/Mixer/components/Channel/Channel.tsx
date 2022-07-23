import { memo } from 'react';
import { ChannelMetadata } from '../../../../../store/channels/types';
import { TYPES_TITLES } from './consts';

import * as Styled from './styled';

type ChannelType = {
  index?: number
  data: Partial<ChannelMetadata>
}

export const Channel = memo(({ index = 0, data }: ChannelType) => {
  const isMaster = data.type === 'master';
  return (
    <Styled.Container>
      {
        isMaster ?
        <Styled.Title>{TYPES_TITLES['master']}</Styled.Title> :
        <Styled.Title>{`${index + 1} ${TYPES_TITLES[data.type || 'audio']}`}</Styled.Title>
      }
    </Styled.Container>
  );
});

Channel.displayName = 'Channel';
