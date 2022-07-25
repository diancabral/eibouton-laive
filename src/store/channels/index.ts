import { atom, PrimitiveAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { ChannelModel } from './models';
import { ChannelMetadata, ChannelType } from './types';

const data = {
  uuid: uuidv4(),
  channel: atom(structuredClone(ChannelModel)),
};

export const Channels = atom<ChannelType[]>([data]);
export const CurrentChannel = atom<PrimitiveAtom<ChannelMetadata>>(data.channel);
