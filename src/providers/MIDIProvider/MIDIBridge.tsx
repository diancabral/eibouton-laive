import { useEffect } from 'react';
import { useGetMIDIGlobal } from '../../store/midi/hooks/useGetMIDIGlobal';
import { useUpdateCurrentChannel } from '../../store/channels/hooks/useUpdateCurrentChannel';

export const MIDIBridge = () => {
  const {
    getMIDINotesOn: notesOn,
    getMIDINotesOff: notesOff
  } = useGetMIDIGlobal();

  const { setCurrentChannelMIDI } = useUpdateCurrentChannel();

  useEffect(() => {
    setCurrentChannelMIDI({
      notesOn,
      notesOff,
    })
  }, [notesOn, notesOff]);

  return <></>;
}
