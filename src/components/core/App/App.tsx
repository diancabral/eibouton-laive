import { memo } from 'react';
import { Mixer } from '../Mixer/Mixer';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import * as Styled from './styled';

export const App = memo(() => {
  return (
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
  );
});

App.displayName = 'App';
