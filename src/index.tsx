import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/core/App/App';

import GlobalCSS from './styled/global';
import custom from './styled/custom';

import { GlobalTheme } from './components/core/GlobalTheme/GlobalTheme';

// import './examples/typescript';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalTheme theme={custom}>
      <>
        <GlobalCSS />
        <App />
      </>
    </GlobalTheme>
  </React.StrictMode>
);
