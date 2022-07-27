import { useEffect } from 'react';
import { useGetMIDIArmed } from '../../store/midi/hooks/useGetMIDIArmed';
import { useGetMIDIGlobal } from '../../store/midi/hooks/useGetMIDIGlobal';
import { useUpdateMIDIArmed } from '../../store/midi/hooks/useUpdateMIDIArmed';

export const MIDIBridge = () => {
  const {
    getMIDINotesOn: notesOn,
    getMIDINotesOff: notesOff
  } = useGetMIDIGlobal();

  const { clearMIDIArmedNotes, setMIDIArmedMIDI } = useUpdateMIDIArmed();
  const { armed } = useGetMIDIArmed();

  useEffect(() => {
    if(!armed) {
      clearMIDIArmedNotes();
    }
  }, [armed]);

  useEffect(() => {
    if (armed) {
      setMIDIArmedMIDI({
        notesOn,
        notesOff,
      });
    }
  }, [notesOn, notesOff, armed]);

  return <></>;
}
