import { memo } from 'react';
import { Channels } from '../Channels/Channels';
import { InfoBar } from '../InfoBar/InfoBar';

import * as Styled from './styled';

export const App = memo(() => {
  return (
    <Styled.Container>
      <Styled.Row>
        <Channels />
      </Styled.Row>
      <Styled.Row style={{
        height: 'fit-content'
      }}>
        <InfoBar />
      </Styled.Row>
    </Styled.Container>
  );
});

App.displayName = 'App';
