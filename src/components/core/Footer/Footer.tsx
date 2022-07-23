import { useAtom } from 'jotai';
import { MIDINotesOn } from '../../../store/midi';

import * as Styled from './styled';

const MidiNoteIndicator = () => {
  const [notes] = useAtom(MIDINotesOn);
  return !!notes.length ? (
    <>MIDI Note: {notes.map((val) => val.display).slice(-1)}</>
  ) : <></>;
}

export const Footer = () => {
  return (
    <Styled.Container>
      <MidiNoteIndicator />
    </Styled.Container>
  );
}
