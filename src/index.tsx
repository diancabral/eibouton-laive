import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/core/App/App';

import GlobalCSS from './styled/global';
import custom from './styled/custom';

import { GlobalTheme } from './contexts/GlobalTheme/GlobalTheme';
import { MIDIProvider } from './providers/MIDIProvider/MIDIProvider';
import { AudioProvider } from './contexts/AudioContext/AudioContext';
import { ChannelsContext } from './contexts/ChannelsContext/ChannelsContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <GlobalTheme theme={custom}>
      <MIDIProvider>
        <AudioProvider>
            {/* <React.StrictMode> */}
              <ChannelsContext />
              <GlobalCSS />
              <App />
            {/* </React.StrictMode> */}
        </AudioProvider>
      </MIDIProvider>
    </GlobalTheme>
);
