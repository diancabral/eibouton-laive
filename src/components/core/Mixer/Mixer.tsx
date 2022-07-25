import { memo } from 'react';
import { Channel } from './components/Channel/Channel';

import { useUpdateChannels } from '../../../hooks/useUpdateChannels';
import { useGetChannels } from '../../../hooks/useGetChannels';

import * as Styled from './styled';

const MixerChannels = () => {
  const { channels } = useGetChannels();
  return (
    <>
      {channels.map((val, index) => {
        return (
          <Styled.Column key={val.uuid}>
            <Channel data={val} index={index} />
          </Styled.Column>
        );
      })}
    </>
  );
};

const MixerAdd = () => {
  const { createChannel } = useUpdateChannels();
  return <button onClick={createChannel} style={{ height: '20px '}}>add channel</button>
};

export const Mixer = memo(() => {
  return (
    <Styled.Container>
      <Styled.Row>
        <MixerAdd />
        <MixerChannels />
      </Styled.Row>
      <Styled.Row $fixed>
        <Styled.Column $fixed>
          {/* <Channel data={ChannelMasterModel} /> */}
        </Styled.Column>
      </Styled.Row>
    </Styled.Container>
  );
});

Mixer.displayName = 'Mixer';
