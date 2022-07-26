import { useAtomValue } from 'jotai';
import { Merus } from '../../../devices/Merus/Merus';
import { CurrentChannel } from '../../../store/channels';
import { useGetCurrentChannelDevice } from '../../../store/channels/hooks/useGetCurrentChannelData';
import { useUpdateChannelData } from '../../../store/channels/hooks/useUpdateChannelData';

import * as Styled from './styled';

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
      { !device.component ? <button onClick={addDevice}>add device</button> : 'device connected' }
    </Styled.Container>
  );
}
