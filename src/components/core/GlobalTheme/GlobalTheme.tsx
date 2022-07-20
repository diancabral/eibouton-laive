import React, { ReactElement } from 'react';
import { mergeDeepRight } from 'ramda';
import { ThemeProvider } from 'styled-components';

import { theme as defaultTheme, ThemeTypes } from '../../../styled/theme';
import { CustomThemeType } from '../../../styled/types';
import { MyCustomType } from '../../../styled/types/generated';
import { PartialDeep } from 'type-fest';

type GlobalThemeProps = {
  theme?: CustomThemeType | PartialDeep<MyCustomType>;
  children?: ReactElement | ReactElement[],
}

export const GlobalTheme = ({ theme = {}, children }: GlobalThemeProps) => {
  const mergedTheme = mergeDeepRight(defaultTheme, theme) as ThemeTypes;
  return (
    <ThemeProvider theme={mergedTheme}>
      {children}
    </ThemeProvider>
  )
}
