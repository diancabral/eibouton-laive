import { memo } from 'react';
import { masterChannel } from '../../../models/masterChannel';
import { useGetChannels } from '../../../store/channels/hooks/useGetChannels';
import { useUpdateChannels } from '../../../store/channels/hooks/useUpdateChannels';
import { Button } from '../../ui/Button/Button';
import { Wrapper } from '../../ui/Wrapper/Wrapper';
import { Channel } from '../Channel/Channel';

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
  return <Button onClick={() => createChannel()}>add channel</Button>;
};

export const Mixer = memo(() => {
  return (
    <Wrapper>
      <Styled.Container>
        <Styled.Row>
          <MixerChannels />
          <Styled.Message>
            Drop Samples or devices here or
            <br />
            <br />
            <MixerAdd />
          </Styled.Message>
        </Styled.Row>
        <Styled.Row $fixed>
          <Styled.Column $fixed>{/* <Channel data={{ channel: masterChannel }} /> */}</Styled.Column>
        </Styled.Row>
      </Styled.Container>
    </Wrapper>
  );
});

Mixer.displayName = 'Mixer';
