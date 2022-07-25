import { memo, useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Merus } from '../../../../../devices/Merus/Merus';
import { ChannelTrackType, ChannelType } from '../../../../../store/channels/types';
import { TYPES_TITLES } from './consts';

import { selectAtom, useUpdateAtom } from 'jotai/utils';
import { clearMIDINotes } from '../../../../../providers/MIDIProvider/utils';
import { CurrentChannel } from '../../../../../store/channels';

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
  const updateChannelOptions = useUpdateAtom(data.channel);
  const updateCurrentChannelOptions = useUpdateAtom(useAtomValue(CurrentChannel));
  const updateCurrentChannel = useUpdateAtom(CurrentChannel);

  const metadata = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.metadata), []));
  const mixer = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.mixer), []));
  const device = useAtomValue(useMemo(() => selectAtom(data.channel, channel => channel.device), []));

  //

  const isMaster = metadata.type === 'master';

  //

  const addDevice = () => {
    updateChannelOptions(current => ({
      ...current,
      metadata: {
        ...current.metadata,
        title: 'Merus Square',
      },
      device: {
        ...current.device,
        component: <Merus data={data} type={!index ? 'sawtooth' : index === 1 ? 'square' : index === 2 ? 'triangle' : 'sine'} />
      }
    }));
  }

  const activateMIDI = async () => {
    if (!mixer.arm) {
      updateCurrentChannelOptions(clearMIDINotes);
      updateCurrentChannel(data.channel);
      updateChannelOptions(current => ({
        ...current,
        mixer: {
          ...current.mixer,
          arm: true
        }
      }));
    }
  }

  return (
    <Styled.Container>
      <ChannelTitle isMaster={isMaster} type={metadata.type} index={index} title={metadata.title} />
      {
        !isMaster && (
        <>
          { !device.component ? <button onClick={addDevice}>add device</button> : 'device connected' }
          <button onClick={activateMIDI}>activate midi</button>
          { mixer.arm && 'channel armed' }
        </>)
      }
    </Styled.Container>
  );
});

Channel.displayName = 'Channel';
