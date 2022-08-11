import { useUpdateAtom } from 'jotai/utils';
import { MIDIControllers, MIDINotesOff, MIDINotesOn, MIDIReceived } from '..';
import { getNoteInfo } from '../../../providers/MIDIProvider/utils';

export const useUpdateMIDIGlobal = () => {
  const updateControllers = useUpdateAtom(MIDIControllers);
  const updateMIDIReceived = useUpdateAtom(MIDIReceived);
  const updateMIDINotesOn = useUpdateAtom(MIDINotesOn);
  const updateMIDINotesOff = useUpdateAtom(MIDINotesOff);

  const updateMIDIGlobalKey = (key: number, velocity = 100) => {
    const { frequency, octave, note } = getNoteInfo(key) || {};
    updateMIDINotesOff(0);
    updateMIDINotesOn((current) => [
      ...current,
      {
        key,
        frequency,
        velocity,
        note,
        octave,
        display: `${note}${octave}`,
      },
    ]);
    updateMIDIReceived(+new Date());
  };

  const removeMIDIMessage = (key: number) => {
    updateMIDINotesOff(key);
    updateMIDINotesOn((current) => current.filter((val) => val.key !== key));
    updateMIDIReceived(+new Date());
  };

  const removeAllMIDIMessages = () => {
    updateMIDINotesOff(0);
    updateMIDINotesOn([]);
    updateMIDIReceived(+new Date());
  };

  return {
    removeAllMIDIMessages,
    removeMIDIMessage,
    updateMIDIGlobalKey,
    updateControllers,
    updateMIDIReceived,
    updateMIDINotesOn,
    updateMIDINotesOff,
  };
};
