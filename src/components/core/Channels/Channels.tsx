import { memo } from 'react';
import { Channel } from './components/Channel/Channel';

import * as Styled from './styled';

export const Channels = memo(() => {
  return (
    <Styled.Container>
      <Styled.Row>
        <Styled.Column>
          <Channel type='MI' index={0} />
        </Styled.Column>
      </Styled.Row>
      <Styled.Row $fixed>
        <Styled.Column $fixed>
          <Channel type='MA' master />
        </Styled.Column>
      </Styled.Row>
    </Styled.Container>
  );
});

Channels.displayName = 'Channels';
