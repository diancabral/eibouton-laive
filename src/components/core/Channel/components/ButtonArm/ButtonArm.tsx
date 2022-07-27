import React from 'react'
import { Icon } from '../../../../ui/Icon/Icon'

import * as Styled from './styled';

type ButtonArmProps = {
  active?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const ButtonArm = ({ active, onClick }: ButtonArmProps) => {
  return (
    <Styled.ButtonArmed $active={active} onClick={onClick}>
      <div><Icon name="music_note" /></div>
    </Styled.ButtonArmed>
  )
}
