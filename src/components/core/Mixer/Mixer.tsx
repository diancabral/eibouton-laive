import { useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { memo } from 'react';
import { Channels } from '../../../store/channels';
import { ChannelMasterModel, ChannelModel } from '../../../store/channels/models';
import { Channel } from './components/Channel/Channel';

import * as Styled from './styled';
import { ChannelMetadata } from '../../../store/channels/types';
import { Merus } from '../../../devices/Merus/Merus';

const MixerChannels = () => {
  const [channels] = useAtom(Channels);
  return <>{
    channels.map((val, index) => (
    <Styled.Column key={val.uuid}>
      <Channel data={val} index={index} />
    </Styled.Column>
  ))}</>
};

const master = ChannelMasterModel;

export const Mixer = memo(() => {
  const [, setChannels] = useAtom(Channels);

  const addChannel = () => {
    setChannels(current => {
      let newChannel: ChannelMetadata = structuredClone(ChannelModel);
      newChannel.uuid = uuidv4();
      newChannel.device.component = <Merus />;
      return [...current, newChannel]
    });
  }

  return (
    <Styled.Container>
      <Styled.Row>
        <button onClick={addChannel}>add channel</button>
        <MixerChannels />
      </Styled.Row>
      <Styled.Row $fixed>
        <Styled.Column $fixed>
          <Channel data={master} />
        </Styled.Column>
      </Styled.Row>
    </Styled.Container>
  );
});

Mixer.displayName = 'Mixer';
