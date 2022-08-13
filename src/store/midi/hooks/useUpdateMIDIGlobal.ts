import { useUpdateAtom } from 'jotai/utils';
import { useRef } from 'react';
import { MIDIControllers, MIDINotesOff, MIDINotesOn, MIDIReceived } from '..';
import { getNoteInfo } from '../../../providers/MIDIProvider/utils';

export const useUpdateMIDIGlobal = () => {
  const updateControllers = useUpdateAtom(MIDIControllers);
  const updateMIDIReceived = useUpdateAtom(MIDIReceived);
  const updateMIDINotesOn = useUpdateAtom(MIDINotesOn);
  const updateMIDINotesOff = useUpdateAtom(MIDINotesOff);

  const lastKey = useRef<number | null>(null);

  const updateMIDIGlobalKey = (key: number, velocity = 100) => {
    if (lastKey.current === key) return false;
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
    lastKey.current = key;
  };

  const removeMIDIMessage = (key: number) => {
    updateMIDINotesOff(key);
    updateMIDINotesOn((current) => current.filter((val) => val.key !== key));
    updateMIDIReceived(+new Date());
    lastKey.current = null;
  };

  const removeAllMIDIMessages = () => {
    if (lastKey.current === null) return false;
    updateMIDINotesOff(0);
    updateMIDINotesOn([]);
    updateMIDIReceived(+new Date());
    lastKey.current = null;
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
