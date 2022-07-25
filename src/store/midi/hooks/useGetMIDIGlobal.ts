import { useAtomValue } from 'jotai';
import { MIDIControllers, MIDINotesOff, MIDINotesOn, MIDIReceived } from '..';

export const useGetMIDIGlobal = () => {
  const getControllers = useAtomValue(MIDIControllers);
  const getMIDIReceived = useAtomValue(MIDIReceived);
  const getMIDINotesOn = useAtomValue(MIDINotesOn);
  const getMIDINotesOff = useAtomValue(MIDINotesOff);

  return {
    getControllers,
    getMIDIReceived,
    getMIDINotesOn,
    getMIDINotesOff
  }
}
