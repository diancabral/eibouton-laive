import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/core/App/App';

import GlobalCSS from './styled/global';
import custom from './styled/custom';

import { GlobalTheme } from './components/core/GlobalTheme/GlobalTheme';
import { MIDIProvider } from './components/core/MIDIContext/MIDIContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <GlobalTheme theme={custom}>
      <MIDIProvider>
        <React.StrictMode>
          <GlobalCSS />
          <App />
        </React.StrictMode>
      </MIDIProvider>
    </GlobalTheme>
);
