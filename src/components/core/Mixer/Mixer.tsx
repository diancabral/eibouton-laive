import { memo } from 'react';
import { atom, useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { v4 as uuidv4 } from 'uuid';
import { Channels } from '../../../store/channels';
import { ChannelMIDIInputModel, ChannelModel } from '../../../store/channels/models';
import { Channel } from './components/Channel/Channel';

import * as Styled from './styled';
import { ChannelMetadata } from '../../../store/channels/types';

const MixerChannels = () => {
  const [channels] = useAtom(Channels);
  return (
    <>
      {channels.map((val, index) => {
        return (
          <Styled.Column key={val.uuid}>
            <Channel data={val} index={index} uuid={val.uuid} />
          </Styled.Column>
        );
      })}
    </>
  );
};

export const Mixer = memo(() => {
  const updateChannels = useUpdateAtom(Channels);

  const addChannel = async () => {
    const uuid = uuidv4();
    const newChannel = structuredClone(ChannelModel);
    updateChannels((current) => ([
      ...current,
      {
        uuid,
        channel: atom(newChannel),
      },
    ]));
  };

  return (
    <Styled.Container>
      <Styled.Row>
        <button onClick={addChannel}>add channel</button>
        <MixerChannels />
      </Styled.Row>
      <Styled.Row $fixed>
        <Styled.Column $fixed>{/* <Channel data={master} /> */}</Styled.Column>
      </Styled.Row>
    </Styled.Container>
  );
});

Mixer.displayName = 'Mixer';
