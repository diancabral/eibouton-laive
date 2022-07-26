import { ChannelMetadata } from '../types';

export const masterChannel: Omit<ChannelMetadata, 'device' | 'midi' | 'selected'> = {
  metadata: {
    type: 'master',
    title: 'Master',
  },
  mixer: {
    gain: 0,
    pan: 0,
  }
};
