import { MyCustomType } from './types/generated';
import { ThemeTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTypes, MyCustomType {}
}
