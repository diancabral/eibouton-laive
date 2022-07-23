import { MIDIInputType } from '../../midi/types';
import { ChannelMetadata } from '../types';

export const ChannelMIDIInputModel: MIDIInputType = {
  notesOn: [],
  notesOff: 0
}

export const ChannelModel: ChannelMetadata = {
  type: 'midi',
  title: '',
  device: {
    node: null,
    config: null,
  },
  midi: {
    input: ChannelMIDIInputModel,
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
  active: true,
  solo: false,
  arm: false,
  gain: 0,
  pan: 0,
};

export const ChannelMasterModel: Omit<ChannelMetadata, 'device' | 'midi'> = {
  type: 'master',
  title: 'Master',
  gain: 0,
  pan: 0,
};
