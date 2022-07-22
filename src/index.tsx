import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/core/App/App';

import GlobalCSS from './styled/global';
import custom from './styled/custom';

import { GlobalTheme } from './contexts/GlobalTheme/GlobalTheme';
import { MIDIProvider } from './contexts/MIDIContext/MIDIContext';
import { AudioProvider } from './contexts/AudioContext/AudioContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <GlobalTheme theme={custom}>
      <MIDIProvider>
        <AudioProvider>
          {/* <React.StrictMode> */}
            <GlobalCSS />
            <App />
          {/* </React.StrictMode> */}
        </AudioProvider>
      </MIDIProvider>
    </GlobalTheme>
);
