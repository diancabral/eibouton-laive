import { atom, PrimitiveAtom } from 'jotai';
import { firstChannel } from '../../models/firstChannel';
import { ChannelMetadata, ChannelType } from '../../types';

export const Channels = atom<ChannelType[]>([firstChannel]);
export const CurrentChannel = atom<PrimitiveAtom<ChannelMetadata>>(firstChannel.channel);
