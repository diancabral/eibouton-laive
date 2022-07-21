import { createGlobalStyle } from 'styled-components'

import JostNormal from '../static/fonts/jost/Jost-VariableFont_wght.ttf';
import JostItalic from '../static/fonts/jost/Jost-Italic-VariableFont_wght.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Jost';
    src: local('Jost'), url(${JostNormal}) format('truetype-variations');
    font-weight: 1 999;
  }
  @font-face {
    font-family: 'Jost';
    src: local('Jost'), url(${JostItalic}) format('truetype-variations');
    font-weight: 1 999;
    font-style: italic;
  }
  body {
    margin: 0;
    padding: 0;
  }
  * {
    font-family: 'Jost', sand-serif;
    box-sizing: border-box;
  }
`
