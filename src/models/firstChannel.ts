import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { defaultChannel } from './defaultChannel';

export const firstChannel = {
  uuid: uuidv4(),
  channel: atom(structuredClone(defaultChannel)),
};
