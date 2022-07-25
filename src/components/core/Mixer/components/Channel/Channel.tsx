import { memo } from 'react';
import { ChannelTrackType, ChannelType } from '../../../../../store/channels/types';
import { TYPES_TITLES } from './consts';

import { useGetChannelData } from './hooks/useGetChannelData';
import { useUpdateChannelData } from './hooks/useUpdateChannelData';

import { Merus } from '../../../../../devices/Merus/Merus';

import * as Styled from './styled';

//

type ChannelTitleProps = {
  isMaster: boolean
  type: ChannelTrackType
  title?: string
  index?: number
}

const ChannelTitle = memo(({
  isMaster,
  type,
  title,
  index = 0
}: ChannelTitleProps) => {
  return isMaster ?
    <Styled.Title>{TYPES_TITLES['master']}</Styled.Title> :
    <Styled.Title>{`${!title ? (index + 1) : ''} ${title || TYPES_TITLES[type]}`}</Styled.Title>;
});

ChannelTitle.displayName = 'Channel Title';

//

type ChannelProps = {
  index?: number
  data: ChannelType
};

export const Channel = memo(({ index = 0, data }: ChannelProps) => {
  const {
    metadata,
    mixer,
    device,
    isMaster
  } = useGetChannelData(data);

  const {
    updateChannelTitle,
    updateChannelDevice,
    activateChannelArm
  } = useUpdateChannelData(data);

  //

  const addDevice = () => {
    updateChannelTitle(!index ? 'sawtooth' : index === 1 ? 'square' : index === 2 ? 'triangle' : 'sine');
    updateChannelDevice(<Merus data={data} type={!index ? 'sawtooth' : index === 1 ? 'square' : index === 2 ? 'triangle' : 'sine'} />);
  }

  const activateMIDI = async () => {
    if (!mixer.arm) activateChannelArm();
  }

  return (
    <Styled.Container>
      <ChannelTitle isMaster={isMaster} type={metadata.type} index={index} title={metadata.title} />
      {
        !isMaster && (
        <>
          { !device.component ? <button onClick={addDevice}>add device</button> : 'device connected' }
          <button onClick={activateMIDI}>arm channel</button>
          { mixer.arm && 'channel armed' }
        </>)
      }
    </Styled.Container>
  );
});

Channel.displayName = 'Channel';
