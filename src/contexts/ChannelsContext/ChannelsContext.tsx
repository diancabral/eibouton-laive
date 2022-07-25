import React, { useMemo } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { Channels } from '../../store/channels';
import { ChannelMetadata } from '../../store/channels/types';
import { selectAtom } from 'jotai/utils';

const RenderDevice = ({ data }: {
  data: PrimitiveAtom<ChannelMetadata>
}) => {
  const [component] = useAtom(useMemo(() => selectAtom(data, channel => channel.device.component), []));
  return component || <></>;
};

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
