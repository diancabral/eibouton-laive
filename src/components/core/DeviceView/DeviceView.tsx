import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { Merus } from '../../../devices/Merus/Merus';
import { MerusInterface } from '../../../devices/Merus/MerusInterface';
import { CurrentChannel } from '../../../store/channels';
import { useGetCurrentChannelDeviceComponent, useGetCurrentChannelMIDIInput } from '../../../store/channels/hooks/useGetCurrentChannelData';
import { useUpdateChannelData } from '../../../store/channels/hooks/useUpdateChannelData';
import { Button } from '../../ui/Button/Button';
import { MIDIIndicator } from '../../ui/MIDIIndicator/MIDIIndicator';
import { Wrapper } from '../../ui/Wrapper/Wrapper';
import { DeviceWrapper } from '../DeviceWrapper/DeviceWrapper';

import * as Styled from './styled';

export const InputIndicator = () => {
  const midi = useGetCurrentChannelMIDIInput();
  return (
    <Styled.InputIndicator>
      <MIDIIndicator data={midi} small />
    </Styled.InputIndicator>
  );
};

export const DeviceView = () => {
  const currentChannel = useAtomValue(CurrentChannel);

  const deviceComponent = useGetCurrentChannelDeviceComponent();

  const { updateChannelDevice } = useUpdateChannelData({ channel: currentChannel });

  const osc = {
    wave: 'sawtooth',
    attack: 0.5,
    decay: 250,
    sustain: -100,
    release: 0.15,
    volume: 0,
  };

  const addDevice = () => {
    updateChannelDevice(<Merus data={{ channel: currentChannel }} />, {
      osc1: {
        ...osc,
        active: true,
      },
      osc2: osc,
    });
  };

  useEffect(() => {
    addDevice();
  }, []);

  return (
    <Wrapper theme="dark" key={currentChannel.toString()}>
      <Styled.Container>
        <InputIndicator />
        {!deviceComponent && (
          <Styled.Message>
            Drop an Sample here or&nbsp;
            <Button onClick={addDevice}>add a Merus Synthesizer</Button>
          </Styled.Message>
        )}
        {deviceComponent && (
          <>
            <DeviceWrapper title="Merus Synthesizer">
              <MerusInterface data={{ channel: currentChannel }} />
            </DeviceWrapper>
            <Styled.Message>Drop Audio Effects here</Styled.Message>
          </>
        )}
      </Styled.Container>
    </Wrapper>
  );
};
