import { useAtomValue } from 'jotai';
import { Merus } from '../../../devices/Merus/Merus';
import { CurrentChannel } from '../../../store/channels';
import { useGetCurrentChannelDevice, useGetCurrentChannelMIDIInput } from '../../../store/channels/hooks/useGetCurrentChannelData';
import { useUpdateChannelData } from '../../../store/channels/hooks/useUpdateChannelData';
import { MIDIIndicator } from '../../ui/MIDIIndicator/MIDIIndicator';

import * as Styled from './styled';

export const InputIndicator = () => {
  const midi = useGetCurrentChannelMIDIInput();
  return (
    <Styled.InputIndicator>
      <MIDIIndicator data={midi} small />
    </Styled.InputIndicator>
  )
}

export const DeviceView = () => {
  const currentChannel = useAtomValue(CurrentChannel);

  const device = useGetCurrentChannelDevice();

  const {
    updateChannelDevice,
  } = useUpdateChannelData({ channel: currentChannel });

  const addDevice = () => {
    updateChannelDevice(<Merus data={{ channel: currentChannel }} />);
  }

  return (
    <Styled.Container>
      <InputIndicator />
      { !device.component && <Styled.Message>Drop an Instrument or Sample here</Styled.Message> }
    </Styled.Container>
  );
}
