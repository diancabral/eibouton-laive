import { ReactElement, useEffect } from 'react';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { getNoteInfo } from './utils';
import { MIDI_NOTE_OFF, MIDI_NOTE_ON } from './consts';
import { MIDIControllers, MIDIInput, MIDINotesOff, MIDINotesOn, MIDIReceived } from '../../store/midi';
import { ChannelMetadata, ChannelType } from '../../store/channels/types';

//

const ListenMIDIInput = () => {
  const getCurrentChannel = useAtomValue(MIDIInput) as ChannelType;
  const setChannelOptions = useUpdateAtom(getCurrentChannel.channel);
  const getMIDINotesOn = useAtomValue(MIDINotesOn);
  const getMIDINotesOff = useAtomValue(MIDINotesOff);

  useEffect(() => {
    setChannelOptions(current => ({
      ...current,
      midi: {
        ...current.midi,
        input: {
          notesOn: getMIDINotesOn,
          notesOff: getMIDINotesOff
        }
      }
    }));
    console.log(getMIDINotesOn, getCurrentChannel);
  }, [getMIDINotesOn, getMIDINotesOff, setChannelOptions, getCurrentChannel]);

  return <></>;
}

export const MIDIProvider = ({ children }: {
  children?: ReactElement | ReactElement[]
}) => {
  const getCurrentChannel = useAtomValue(MIDIInput);

  const updateControllers = useUpdateAtom(MIDIControllers);
  const updateMIDIReceived = useUpdateAtom(MIDIReceived);
  const updateMIDINotesOn = useUpdateAtom(MIDINotesOn);
  const updateMIDINotesOf = useUpdateAtom(MIDINotesOff);

  useEffect(() => {

  });

  const registerMIDIController = (controller: MIDIInput) => {
    updateControllers(current => [...current, {
      id: controller.id,
      name: controller.name ?? '',
      manufacturer: controller.manufacturer ?? ''
    }]);
  };

  const removeMIDIMessage = async (key: number) => {
    updateMIDINotesOf(key);
    updateMIDINotesOn(current => current.filter((val) => val.key !== key));
  }

  const registerMIDINoteMessage = ([ _, key, velocity ]: any) => {
    const { frequency, octave, note } = getNoteInfo(key) || {};
    updateMIDINotesOf(0);
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
  return (<>
    {getCurrentChannel && <ListenMIDIInput />}
    ${children}
  </>);
};
