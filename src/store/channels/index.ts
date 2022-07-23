import { atom } from 'jotai';
import { ChannelType } from './types';

export const Channels = atom<ChannelType[]>([]);
