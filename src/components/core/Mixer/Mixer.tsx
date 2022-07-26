import { memo } from 'react';
import { useGetDevice } from '../../../store/channels/hooks/useGetChannelData';
import { useGetChannels } from '../../../store/channels/hooks/useGetChannels';
import { useUpdateChannels } from '../../../store/channels/hooks/useUpdateChannels';
import { ChannelType } from '../../../types';
import { Channel } from './components/Channel/Channel';

import * as Styled from './styled';

const Device = ({ data }: {
  data: ChannelType
}) => {
  return useGetDevice(data) || <></>;
};

const MixerChannels = () => {
  const { channels } = useGetChannels();
  return (
    <>
      {channels.map((val, index) => {
        return (
          <Styled.Column key={val.uuid}>
            <Channel data={val} index={index} />
            <Device data={val} />
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
