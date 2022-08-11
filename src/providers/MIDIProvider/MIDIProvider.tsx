import { useEffect } from 'react';
import { MIDI_NOTE_OFF, MIDI_NOTE_ON } from './consts';
import { MIDIBridge } from './MIDIBridge';
import { useUpdateMIDIGlobal } from '../../store/midi/hooks/useUpdateMIDIGlobal';

//

export const MIDIProvider = () => {
  const { updateControllers, updateMIDIGlobalKey, removeMIDIMessage } = useUpdateMIDIGlobal();

  const registerMIDIController = (controller: MIDIInput) => {
    updateControllers((current) => [
      ...current,
      {
        id: controller.id,
        name: controller.name ?? '',
        manufacturer: controller.manufacturer ?? '',
      },
    ]);
  };

  const registerMIDINoteMessage = ([_, key, velocity]: any) => {
    updateMIDIGlobalKey(key, velocity);
  };

  const handleMIDIMessage = (message: any) => {
    const [type, key, velocity] = message.data;
    if (type === MIDI_NOTE_ON && velocity > 0) {
      registerMIDINoteMessage(message.data);
    } else if (type === MIDI_NOTE_OFF) {
      removeMIDIMessage(key);
    }
  };

  useEffect(() => {
    navigator.requestMIDIAccess().then(
      (midi: MIDIAccess) => {
        midi.inputs.forEach((entry) => {
          registerMIDIController(entry);
          entry.onmidimessage = handleMIDIMessage;
        });
      },
      () => {
        console.warn('Not allowed to MIDI access. Only virtual and keyboard keys are available!');
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MIDIBridge />;
};
