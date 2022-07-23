import React from 'react';
import { useAtom } from 'jotai';
import { Channels } from '../../store/channels';

export const ChannelsContext = () => {
  const [channels] = useAtom(Channels);
  return <>{
    channels.map(({ uuid, device }, index) => <React.Fragment key={uuid}>{device.component}</React.Fragment> || <></>)
  }</>
}
