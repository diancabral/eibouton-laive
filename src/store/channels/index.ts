import { atom } from 'jotai';
import { ChannelMetadata } from './types';

export const Channels = atom<ChannelMetadata[]>([]);
