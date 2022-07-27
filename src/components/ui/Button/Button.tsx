import React, { ReactElement, ReactNode } from 'react';

import * as Styled from './styled';

type ButtonProps = {
  label?: string;
  children?: ReactElement | ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ label, children, onClick }: ButtonProps) => {
  return (
    <Styled.Button onClick={onClick}>
      {children ?? label}
    </Styled.Button>
  )
};
