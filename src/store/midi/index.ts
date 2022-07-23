import { atom } from 'jotai';
import { ChannelType } from '../channels/types';
import { MIDIControllerType, MIDINoteType } from './types';

export const MIDINotesOn = atom<MIDINoteType[]>([]);
export const MIDINotesOff = atom(0);
export const MIDIControllers = atom<MIDIControllerType[]>([]);
export const MIDIReceived = atom(0);
export const MIDIOctave = atom(0);
export const MIDIInput = atom<ChannelType | null>(null);
