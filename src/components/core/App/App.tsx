import { memo, useEffect, useState } from 'react';
import { Mixer } from '../Mixer/Mixer';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { v4 as uuidv4 } from 'uuid';
import { useUpdateAtom } from 'jotai/utils';
import { Channels, CurrentChannel } from '../../../store/channels';

import * as Styled from './styled';
import { atom } from 'jotai';
import { ChannelModel } from '../../../store/channels/models';
import { MIDIProvider } from '../../../providers/MIDIProvider/MIDIProvider';
import { ChannelsContext } from '../../../contexts/ChannelsContext/ChannelsContext';

export const App = memo(() => {
  const [ready, setReady] = useState(false);

  const updateChannels = useUpdateAtom(Channels);
  const updateCurrentChannel = useUpdateAtom(CurrentChannel);

  const addChannel = () => {
    const uuid = uuidv4();
    const channel = {
      uuid,
      channel: atom(structuredClone(ChannelModel)),
    };
    updateCurrentChannel(channel.channel);
    updateChannels((current) => ([
      ...current,
      channel
    ]));
  };

  useEffect(() => {
    addChannel();
    setReady(true);
  }, []);

  return ready ? (<>
    <MIDIProvider />
    <ChannelsContext />
    <Styled.Container>
      <Styled.Row $fit>
        <Header />
      </Styled.Row>
      <Styled.Row>
        <Mixer />
      </Styled.Row>
      <Styled.Row $fit>
        <Footer />
      </Styled.Row>
    </Styled.Container>
  </>) : <></>;
});

App.displayName = 'App';
