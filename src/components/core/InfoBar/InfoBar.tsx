import { useContext } from 'react';
import { MIDIContext } from '../MIDIContext/MIDIContext';
import * as Styled from './styled';

export const InfoBar = () => {
  const midi = useContext(MIDIContext);
  return (
    <Styled.Container>
      {!!midi.messages?.length && (
      <>
        MIDI Note: {midi.messages.map((val) => val.display).slice(-1)}
      </>
      )}
      &nbsp;
    </Styled.Container>
  );
}
