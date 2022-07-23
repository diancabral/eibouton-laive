import { memo } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { Merus } from '../../../../../devices/Merus/Merus';
import { ChannelMetadata, ChannelTrackType, ChannelType } from '../../../../../store/channels/types';
import { TYPES_TITLES } from './consts';

import * as Styled from './styled';
import { useUpdateAtom } from 'jotai/utils';
import { MIDIInput } from '../../../../../store/midi';

//

type ChannelTitleProps = {
  isMaster: boolean
  type: ChannelTrackType
  title?: string
  index?: number
}

const ChannelTitle = ({
  isMaster,
  type,
  title,
  index = 0
}: ChannelTitleProps) => {
  return isMaster ?
    <Styled.Title>{TYPES_TITLES['master']}</Styled.Title> :
    <Styled.Title>{`${index + 1} ${title || TYPES_TITLES[type]}`}</Styled.Title>;
};

//

type ChannelProps = {
  index?: number
  uuid: string
  data: ChannelType
};

export const Channel = memo(({ index = 0, data, uuid }: ChannelProps) => {
  const [channel, setChannelOptions] = useAtom(data.channel);
  const [getCurrentMIDI, setCurrentMIDI] = useAtom(MIDIInput);

  //

  const isMaster = channel.type === 'master';

  //

  const addDevice = () => {
    setChannelOptions(current => ({
      ...current,
      title: 'dian carlos',
      device: {
        ...current.device,
        component: <Merus data={data} type={!index? 'sawtooth': 'square'} />
      }
    }));
  }

  const activateMIDI = () => {
    setChannelOptions(current => ({
      ...current,
      arm: true,
    }));
    setCurrentMIDI(data);
  }

  return (
    <Styled.Container>
      <ChannelTitle isMaster={isMaster} type={channel.type} index={index} title={channel.title} />
      { !channel.device.component ? <button onClick={addDevice}>add device</button> : 'device connected' }
      <button onClick={activateMIDI}>activate midi</button>
      { getCurrentMIDI?.uuid === uuid && 'midi active' }
    </Styled.Container>
  );
});

Channel.displayName = 'Channel';
