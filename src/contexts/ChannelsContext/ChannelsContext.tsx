import React from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { Channels } from '../../store/channels';
import { ChannelMetadata } from '../../store/channels/types';

const RenderDevice = ({ data }: {
  data: PrimitiveAtom<ChannelMetadata>
}) => {
  const [channel] = useAtom(data);
  return channel.device.component || <></>;
}

export const ChannelsContext = () => {
  const [channels] = useAtom(Channels);
  return (
    <>
      {channels.map((val) => {
        return (
          <React.Fragment key={val.uuid}>
            <RenderDevice data={val.channel} />
          </React.Fragment>
        );
      })}
    </>
  );
};
