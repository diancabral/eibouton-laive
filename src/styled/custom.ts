import { CustomThemeType } from './types';
import { GeneratedThemeDian } from './types/generated';

export type MyCustomType = {
  dian: GeneratedThemeDian
}

const custom: CustomThemeType = {
  spacing: {
    xxxl: '100rem',
  },
  dian: {
    dian: '10%',
  }
}

export default custom;
