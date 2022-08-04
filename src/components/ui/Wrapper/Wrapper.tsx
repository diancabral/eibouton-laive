import { ReactElement, ReactNode } from 'react';

import * as Styled from './styled';

type WrapperProps = {
  theme?: Styled.WrapperThemeType;
  direction?: 'column' | 'row';
  children: ReactElement | ReactNode;
};

export const Wrapper = ({ theme, direction, children }: WrapperProps) => {
  return (
    <Styled.Wrapper $theme={theme} $direction={direction}>
      {children}
    </Styled.Wrapper>
  );
};
