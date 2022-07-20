import React, { memo, useContext } from 'react';
import { MIDIContext } from '../MIDIContext/MIDIContext';

import * as Styled from './styled';

export const App = memo(() => {

  const midi = useContext(MIDIContext);

  return (
    <Styled.Container>
      <Styled.Row>lalalala</Styled.Row>
      <Styled.Row>
        <>controllers connected: {JSON.stringify(midi.controllers)}</>
      </Styled.Row>
      <Styled.Row>
        <>received midi input: {midi.received}</>
      </Styled.Row>
      <Styled.Row>
        <>messages received: {JSON.stringify(midi.messages)}</>
      </Styled.Row>
    </Styled.Container>
  );
});

App.displayName = 'App';
