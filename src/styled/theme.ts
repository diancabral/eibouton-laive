import colors from 'material-colors';
import { DefaultTheme } from 'styled-components';
import { GeneratedThemeColors, GeneratedThemeSpacing } from './types/generated';

import { THEME_SPACER } from './variables';
import { writeInRem } from './utils';
import custom from './custom';

//

export const spacing = {
  xs: writeInRem(THEME_SPACER * .25),
  sm: writeInRem(THEME_SPACER * .5),
  md: writeInRem(THEME_SPACER),
  lg: writeInRem(THEME_SPACER * 1.5),
  xl: writeInRem(THEME_SPACER * 3),
  xxl: writeInRem(THEME_SPACER * 5),
};

export { colors }

const { spacing: s, colors: c, ...rest } = custom;

const themeMerged = {
  spacing: spacing as GeneratedThemeSpacing,
  colors: colors as GeneratedThemeColors,
  ...rest as typeof rest
} as const;

export const theme: DefaultTheme = themeMerged;
export type ThemeTypes = typeof themeMerged;
