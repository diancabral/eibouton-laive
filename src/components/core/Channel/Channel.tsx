import { memo } from 'react';
import { ChannelTrackType, ChannelType } from '../../../types';
import { TYPES_TITLES } from './consts';

import { useGetChannelData } from '../../../store/channels/hooks/useGetChannelData';

import { Merus } from '../../../devices/Merus/Merus';

import * as Styled from './styled';
import { useUpdateChannelData } from '../../../store/channels/hooks/useUpdateChannelData';
import { useGetCurrentChannelMIDIInput } from '../../../store/channels/hooks/useGetCurrentChannelData';
import { MIDIIndicator } from '../../ui/MIDIIndicator/MIDIIndicator';

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

export const InputIndicator = ({ midi }: any) => {
  return <MIDIIndicator data={midi} />
}

type ChannelProps = {
  index?: number
  data: ChannelType
};

export const Channel = memo(({ index = 0, data }: ChannelProps) => {
  const {
    selected,
    metadata,
    mixer,
    device,
    midi,
    isMaster
  } = useGetChannelData(data);

  const {
    updateChannelTitle,
    updateChannelDevice,
    activateChannelArm,
    updateChannelSelected
  } = useUpdateChannelData(data);

  //

  const addDevice = () => {
    updateChannelTitle(!index ? 'sawtooth' : index === 1 ? 'square' : index === 2 ? 'triangle' : 'sine');
    updateChannelDevice(<Merus data={data} type={!index ? 'sawtooth' : index === 1 ? 'square' : index === 2 ? 'triangle' : 'sine'} />);
  }

  const activateMIDI = async () => {
    if (!mixer.arm) activateChannelArm();
  }

  const selectChannel = async () => {
    if (!selected) updateChannelSelected();
  }

  return (
    <Styled.Container $selected={selected}>
      <div onClick={selectChannel}>
        <ChannelTitle  isMaster={isMaster} type={metadata.type} index={index} title={metadata.title} />
      </div>
      {
        !isMaster && (
        <>
          { !device.component ? <button onClick={addDevice}>add device</button> : 'device connected' }
          <InputIndicator midi={midi} />
          <button onClick={activateMIDI}>{ !mixer.arm ? 'arm' : 'armed' }</button>
        </>)
      }
    </Styled.Container>
  );
});

Channel.displayName = 'Channel';
