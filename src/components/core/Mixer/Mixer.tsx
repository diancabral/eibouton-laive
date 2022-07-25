import { memo } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { v4 as uuidv4 } from 'uuid';
import { Channels, CurrentChannel } from '../../../store/channels';
import { ChannelModel } from '../../../store/channels/models';
import { Channel } from './components/Channel/Channel';
import { clearMIDINotes } from '../../../providers/MIDIProvider/utils';

import * as Styled from './styled';

const MixerChannels = () => {
  const [channels] = useAtom(Channels);
  return (
    <>
      {channels.map((val, index) => {
        return (
          <Styled.Column key={val.uuid}>
            <Channel data={val} index={index} />
          </Styled.Column>
        );
      })}
    </>
  );
};

const MixerAdd = () => {
  const updateChannels = useUpdateAtom(Channels);
  const updateCurrentChannelOptions = useUpdateAtom(useAtomValue(CurrentChannel));
  const updateCurrentChannel = useUpdateAtom(CurrentChannel);

  const addChannel = () => {
    const uuid = uuidv4();
    const channel = {
      uuid,
      channel: atom(structuredClone(ChannelModel)),
    };
    updateCurrentChannelOptions(clearMIDINotes);
    updateCurrentChannel(channel.channel);
    updateChannels((current) => ([
      ...current,
      channel
    ]));
  };

  return <button onClick={addChannel}>add channel</button>
};

export const Mixer = memo(() => {


  return (
    <Styled.Container>
      <Styled.Row>
        <MixerAdd />
        <MixerChannels />
      </Styled.Row>
      <Styled.Row $fixed>
        <Styled.Column $fixed>
          {/* <Channel data={ChannelMasterModel} /> */}
        </Styled.Column>
      </Styled.Row>
    </Styled.Container>
  );
});

Mixer.displayName = 'Mixer';
