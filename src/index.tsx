import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/core/App/App';

import GlobalCSS from './styled/global';
import custom from './styled/custom';

import { v4 as uuidv4 } from 'uuid';

import { GlobalTheme } from './contexts/GlobalTheme/GlobalTheme';
import { MIDIProvider } from './providers/MIDIProvider/MIDIProvider';
import { AudioProvider } from './contexts/AudioContext/AudioContext';
import { ChannelsContext } from './contexts/ChannelsContext/ChannelsContext';
import { atom, Provider } from 'jotai';
import { Channels } from './store/channels';
import { ChannelModel } from './store/channels/models';
import { MIDIInput } from './store/midi';

//

const newChannel = atom({
  uuid: uuidv4(),
  channel: atom(structuredClone(ChannelModel)),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
<GlobalTheme theme={custom}>
  {/* <Provider initialValues={[
    [Channels, [newChannel]],
    [MIDIInput, [newChannel]]
  ]}> */}
    <MIDIProvider>
      <AudioProvider>
      {/* <React.StrictMode> */}
        <ChannelsContext />
        <GlobalCSS />
        <App />
      {/* </React.StrictMode> */}
      </AudioProvider>
    </MIDIProvider>
  {/* </Provider> */}
</GlobalTheme>
);
