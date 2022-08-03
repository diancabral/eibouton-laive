import { ReactElement, ReactNode } from 'react';

import * as Styled from './styled';

type FormLabelProps = {
  children: ReactElement | ReactNode;
};

export const FormLabel = ({ children }: FormLabelProps) => {
  return <Styled.Label>{children}</Styled.Label>;
};
