import React, { memo, ReactElement, useEffect, useMemo, useState } from 'react';
import { getNoteInfo } from './utils';
import { MIDI_NOTE_OFF, MIDI_NOTE_ON } from './consts';
import { MIDIControllerType, MIDIMessageType, MIDIProviderType } from './types';

//

export const MIDIContext = React.createContext<MIDIProviderType>({});

MIDIContext.displayName = 'MIDIContext';

//

type MIDIContextProps = {
  children?: ReactElement | ReactElement[]
}

export const MIDIProvider = memo(({ children }: MIDIContextProps) => {
  const [messages, setMessages] = useState<MIDIMessageType[]>([]);
  const [release, setRelease] = useState(0);
  const [controllers, setControllers] = useState<MIDIControllerType[]>([]);
  const [received, setReceived] = useState(0);

  const registerMIDIController = (controller: MIDIInput) => {
    setControllers(current => [...current, {
      id: controller.id,
      name: controller.name ?? '',
      manufacturer: controller.manufacturer ?? ''
    }]);
  };

  const removeMIDIMessage = async (key: number) => {
    setMessages(current => current.filter((val) => val.key !== key));
    setRelease(key);
  }

  const registerMIDINoteMessage = ([ _, key, velocity ]: any) => {
    setRelease(0);
    const { frequency, octave, note } = getNoteInfo(key) || {};
    setMessages(current => [...current, {
      key,
      frequency,
      velocity,
      note,
      octave,
      display: `${note}${octave}`
    }]);
  }

  const handleMIDIMessage = async (message: any) => {
    const [ type, key, velocity ] = message.data;
    if (type === MIDI_NOTE_ON && velocity > 0) {
      registerMIDINoteMessage(message.data);
    } else if(type === MIDI_NOTE_OFF || !velocity) {
      removeMIDIMessage(key);
    }
    setReceived(+new Date());
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

  const providerValue = useMemo(() => ({
    messages,
    release,
    controllers,
    received,
  }), [messages, controllers, received, release]);

  return (
    <MIDIContext.Provider value={providerValue}>
      {children}
    </MIDIContext.Provider>
  )
});

MIDIProvider.displayName = 'MIDIProvider';
