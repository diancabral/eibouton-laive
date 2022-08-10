import { atom, PrimitiveAtom } from 'jotai';
import { ChannelMetadata, ChannelType } from '../../types';

export const Channels = atom<ChannelType[]>([]);
export const CurrentChannel = atom<PrimitiveAtom<ChannelMetadata>>({} as PrimitiveAtom<ChannelMetadata>);
