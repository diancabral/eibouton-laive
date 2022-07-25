import { memo, useEffect, useState } from 'react';
import { Mixer } from '../Mixer/Mixer';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import * as Styled from './styled';

import { MIDIProvider } from '../../../providers/MIDIProvider/MIDIProvider';
import { ChannelsContext } from '../../../contexts/ChannelsContext/ChannelsContext';
import { useUpdateChannels } from '../../../hooks/useUpdateChannels';

export const App = memo(() => {
  const [ready, setReady] = useState(false);

  const { createChannel } = useUpdateChannels();

  useEffect(() => {
    createChannel();
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
