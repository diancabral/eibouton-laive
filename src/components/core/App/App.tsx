import React, { memo, useContext } from 'react';
import { InfoBar } from '../InfoBar/InfoBar';
// import { MIDIContext } from '../MIDIContext/MIDIContext';

import * as Styled from './styled';

export const App = memo(() => {

  // const midi = useContext(MIDIContext);

  return (
    <Styled.Container>
      <Styled.Row></Styled.Row>
      <Styled.Row style={{
        height: 'fit-content'
      }}>
        <InfoBar />
      </Styled.Row>
    </Styled.Container>
  );
});

App.displayName = 'App';
