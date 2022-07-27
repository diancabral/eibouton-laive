import { ChannelMetadata } from '../types';

export const defaultChannel: ChannelMetadata = {
  selected: true,
  metadata: {
    type: 'midi',
    title: '',
  },
  device: {
    node: null,
    config: null,
  },
  midi: {
    input: {
      notesOn: [],
      notesOff: 0
    },
    messages: [
      {
        title: '',
        color: '',
        start: {
          bar: 0,
          beat: 0,
          sixteenth: 0,
        },
        length: 0,
      },
    ],
  },
  mixer: {
    active: true,
    solo: false,
    arm: true,
    gain: 0,
    pan: 0,
  }
};
