import { memo } from 'react';
import { Channel } from './components/Channel/Channel';

import * as Styled from './styled';

export const Mixer = memo(() => {
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

Mixer.displayName = 'Mixer';
