import { useUpdateAtom } from 'jotai/utils';
import { MIDIControllers, MIDINotesOff, MIDINotesOn, MIDIReceived } from '../../../store/midi';

export const useUpdateMIDIGlobal = () => {
  const updateControllers = useUpdateAtom(MIDIControllers);
  const updateMIDIReceived = useUpdateAtom(MIDIReceived);
  const updateMIDINotesOn = useUpdateAtom(MIDINotesOn);
  const updateMIDINotesOff = useUpdateAtom(MIDINotesOff);

  return {
    updateControllers,
    updateMIDIReceived,
    updateMIDINotesOn,
    updateMIDINotesOff
  }
}
