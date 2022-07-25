import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { CurrentChannel } from '../../store/channels';
import { MIDINotesOff, MIDINotesOn } from '../../store/midi';

export const MIDIBridge = () => {
  const getMIDINotesOn = useAtomValue(MIDINotesOn);
  const getMIDINotesOff = useAtomValue(MIDINotesOff);
  const updateCurrentChannelOptions = useUpdateAtom(useAtomValue(CurrentChannel));

  useEffect(() => {
    updateCurrentChannelOptions(current => ({
      ...current,
      midi: {
        ...current.midi,
        input: {
          notesOn: getMIDINotesOn,
          notesOff: getMIDINotesOff
        }
      }
    }));
  }, [getMIDINotesOn, getMIDINotesOff]);

  return <></>;
}
