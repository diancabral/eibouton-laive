import { selectAtom, useAtomValue } from 'jotai/utils';
import { useMemo } from 'react';
import { MIDIArmed } from '..';

export const useGetMIDIArmed = () => {
  const getMIDIArmedOptions = useAtomValue(MIDIArmed);
  const armed = useAtomValue(useMemo(() => selectAtom(getMIDIArmedOptions, channel => channel.mixer.arm), [getMIDIArmedOptions]));

  return {
    armed
  }
}
