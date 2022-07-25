import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/core/App/App';

import { GlobalTheme } from './styled/components/GlobalTheme/GlobalTheme';
import GlobalCSS from './styled/global';
import custom from './styled/custom';

//

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
<GlobalTheme theme={custom}>
  {/* <React.StrictMode> */}
    <GlobalCSS />
    <App />
  {/* </React.StrictMode> */}
</GlobalTheme>
);
