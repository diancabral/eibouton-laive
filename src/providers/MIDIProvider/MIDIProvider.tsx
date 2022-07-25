import { useEffect } from 'react';
import { getNoteInfo } from './utils';
import { MIDI_NOTE_OFF, MIDI_NOTE_ON } from './consts';
import { MIDIBridge } from './MIDIBridge';
import { useUpdateMIDIGlobal } from './hooks/useUpdateMIDIGlobal';

//

export const MIDIProvider = () => {
  const {
    updateControllers,
    updateMIDIReceived,
    updateMIDINotesOn,
    updateMIDINotesOff
  } = useUpdateMIDIGlobal();

  const registerMIDIController = (controller: MIDIInput) => {
    updateControllers(current => [...current, {
      id: controller.id,
      name: controller.name ?? '',
      manufacturer: controller.manufacturer ?? ''
    }]);
  };

  const removeMIDIMessage = async (key: number) => {
    updateMIDINotesOff(key);
    updateMIDINotesOn(current => current.filter((val) => val.key !== key));
  }

  const registerMIDINoteMessage = ([ _, key, velocity ]: any) => {
    const { frequency, octave, note } = getNoteInfo(key) || {};
    updateMIDINotesOff(0);
    updateMIDINotesOn(current => [...current, {
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
    updateMIDIReceived(+new Date());
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

  return <MIDIBridge />;
};
