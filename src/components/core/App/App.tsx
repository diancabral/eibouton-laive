import { memo } from 'react';
import { Header } from '../Header/Header';
import { Mixer } from '../Mixer/Mixer';
import { DeviceView } from '../DeviceView/DeviceView';
import { Footer } from '../Footer/Footer';

import * as Styled from './styled';

import { MIDIProvider } from '../../../providers/MIDIProvider/MIDIProvider';
import { AudioProvider } from '../../../providers/AudioProvider/AudioProvider';

import  { ReactComponent as Sprite } from '../../../static/icons/svg/sprite.css.svg';

export const App = memo(() => {
  return <>
    <Sprite />
    <AudioProvider />
    <MIDIProvider />
    <Styled.Container>
      <Styled.Row $fitContent>
        <Header />
      </Styled.Row>
      <Styled.Row>
        <Mixer />
      </Styled.Row>
      <Styled.Row $fitContent>
        <DeviceView />
      </Styled.Row>
      <Styled.Row $fitContent>
        <Footer />
      </Styled.Row>
    </Styled.Container>
  </>;
});

App.displayName = 'App';
