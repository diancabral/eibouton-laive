import { atom, PrimitiveAtom } from 'jotai';
import { ChannelMetadata } from '../../types';
import { MIDIControllerType, MIDINoteType } from './types';

export const MIDINotesOn = atom<MIDINoteType[]>([]);
export const MIDINotesOff = atom(0);
export const MIDIControllers = atom<MIDIControllerType[]>([]);
export const MIDIReceived = atom(0);
export const MIDIOctave = atom(0);
export const MIDIArmed = atom<PrimitiveAtom<ChannelMetadata>>({} as PrimitiveAtom<ChannelMetadata>);
