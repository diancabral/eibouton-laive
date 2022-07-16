import { MyCustomType } from './custom';
import { ThemeTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTypes, MyCustomType {}
}
