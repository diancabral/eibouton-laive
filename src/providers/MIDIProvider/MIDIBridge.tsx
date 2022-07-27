import { useEffect } from 'react';
import { useGetMIDIGlobal } from '../../store/midi/hooks/useGetMIDIGlobal';
import { useUpdateMIDIArmed } from '../../store/midi/hooks/useUpdateMIDIArmed';

export const MIDIBridge = () => {
  const {
    getMIDINotesOn: notesOn,
    getMIDINotesOff: notesOff
  } = useGetMIDIGlobal();

  const { setMIDIArmedMIDI } = useUpdateMIDIArmed();

  useEffect(() => {
    setMIDIArmedMIDI({
      notesOn,
      notesOff,
    })
  }, [notesOn, notesOff]);

  return <></>;
}
