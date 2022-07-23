import { ReactElement, useEffect } from 'react';
import { useAtom } from 'jotai';
import { getNoteInfo } from './utils';
import { MIDI_NOTE_OFF, MIDI_NOTE_ON } from './consts';
import { MIDIControllers, MIDINotesOff, MIDINotesOn, MIDIReceived } from '../../store/midi';

//

export const MIDIProvider = ({ children }: {
  children?: ReactElement | ReactElement[]
}) => {
  const [, setNotesOn] = useAtom(MIDINotesOn);
  const [, setNotesOff] = useAtom(MIDINotesOff);
  const [, setControllers] = useAtom(MIDIControllers);
  const [, setMIDIReceived] = useAtom(MIDIReceived);

  const registerMIDIController = (controller: MIDIInput) => {
    setControllers(current => [...current, {
      id: controller.id,
      name: controller.name ?? '',
      manufacturer: controller.manufacturer ?? ''
    }]);
  };

  const removeMIDIMessage = async (key: number) => {
    setNotesOn(current => current.filter((val) => val.key !== key));
    setNotesOff(key);
  }

  const registerMIDINoteMessage = ([ _, key, velocity ]: any) => {
    setNotesOff(0);
    const { frequency, octave, note } = getNoteInfo(key) || {};
    setNotesOn(current => [...current, {
      key,
      frequency,
      velocity,
      note,
      octave,
      display: `${note}${octave}`
    }]);
  }

  const handleMIDIMessage = (message: any) => {
    const [ type, key, velocity ] = message.data;
    if (type === MIDI_NOTE_ON && velocity > 0) {
      registerMIDINoteMessage(message.data);
    } else if(type === MIDI_NOTE_OFF) {
      removeMIDIMessage(key);
    }
    setMIDIReceived(+new Date());
  };

  useEffect(() => {
    navigator.requestMIDIAccess().then((midi: MIDIAccess) => {
      midi.inputs.forEach((entry) => {
        registerMIDIController(entry);
        entry.onmidimessage = handleMIDIMessage;
      });
    }, () => {
      console.warn('Not allowed to MIDI access. Only virtual and keyboard keys are available!');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (<>${children}</>);
};
