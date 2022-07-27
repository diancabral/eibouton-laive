import { createGlobalStyle } from 'styled-components'

import JostNormal from '../static/fonts/jost/Jost-VariableFont_wght.ttf';
import JostItalic from '../static/fonts/jost/Jost-Italic-VariableFont_wght.ttf';
import AlbertSansNormal from '../static/fonts/albert-sans/AlbertSans-VariableFont_wght.ttf';
import AlbertSansItalic from '../static/fonts/albert-sans/AlbertSans-Italic-VariableFont_wght.ttf';

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
  @font-face {
    font-family: 'Albert Sans';
    src: local('Albert Sans'), url(${AlbertSansNormal}) format('truetype-variations');
    font-weight: 1 999;
  }
  @font-face {
    font-family: 'Albert Sans';
    src: local('Albert Sans'), url(${AlbertSansItalic}) format('truetype-variations');
    font-weight: 1 999;
    font-style: italic;
  }
  body {
    margin: 0;
    padding: 0;
  }
  * {
    font-family: 'Albert Sans', sand-serif;
    letter-spacing: .1px;
    font-weight: 450;
    user-select: none;
    box-sizing: border-box;
  }
`
