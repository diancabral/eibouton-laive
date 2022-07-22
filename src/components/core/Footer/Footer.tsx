import { useContext } from 'react';
import { MIDIContext } from '../../../contexts/MIDIContext/MIDIContext';

import * as Styled from './styled';

const MidiNoteIndicator = () => {
  const midi = useContext(MIDIContext);
  return !!midi.messages?.length ? (
    <>MIDI Note: {midi.messages.map((val) => val.display).slice(-1)}</>
  ) : <></>;
}

export const Footer = () => {
  return (
    <Styled.Container>
      <MidiNoteIndicator />
    </Styled.Container>
  );
}
