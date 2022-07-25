import { useGetMIDIGlobal } from '../../../store/midi/hooks/useGetMIDIGlobal';

import * as Styled from './styled';

const MidiNoteIndicator = () => {
  const { getMIDINotesOn } = useGetMIDIGlobal();
  return !!getMIDINotesOn.length ? (
    <>MIDI Note: {getMIDINotesOn.map((val) => val.display).slice(-1)}</>
  ) : <></>;
}

export const Footer = () => {
  return (
    <Styled.Container>
      <MidiNoteIndicator />
    </Styled.Container>
  );
}
