import { ChannelMetadata } from '../types';

export const ChannelModel: ChannelMetadata = {
  type: 'midi',
  title: '',
  device: {
    component: null,
    node: null,
    config: null
  },
  midi: [
    {
      title: '',
      color: '',
      start: {
        bar: 0,
        beat: 0,
        sixteenth: 0
      },
      length: 0
    }
  ],
  active: true,
  solo: false,
  arm: false,
  gain: 0,
  pan: 0
};

export const ChannelMasterModel: Omit<ChannelMetadata, 'device'> = {
  type: 'master',
  title: 'Master',
  gain: 0,
  pan: 0
};
