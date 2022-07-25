import { atom, PrimitiveAtom } from 'jotai';
import { ChannelModel } from './models';
import { ChannelMetadata, ChannelType } from './types';

export const Channels = atom<ChannelType[]>([]);
export const CurrentChannel = atom<PrimitiveAtom<ChannelMetadata>>(atom(ChannelModel));
