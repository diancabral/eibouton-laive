import React, { ReactElement, ReactNode } from 'react';
import { GeneratedIcons } from '../../../styled/types/generated';
import { Icon } from '../Icon/Icon';

import * as Styled from './styled';

type ButtonProps = {
  label?: string;
  children?: ReactElement | ReactNode;
  toggle?: boolean;
  active?: boolean;
  icon?: GeneratedIcons;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ label, icon, toggle, active, children, onClick }: ButtonProps) => {
  return (
    <Styled.Button onClick={onClick} $toggle={toggle} $active={active}>
      {icon ? <Icon name={icon} /> : children ?? label }
    </Styled.Button>
  )
};
