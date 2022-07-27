import React from 'react'

import * as Styled from './styled';

type ButtonSoloProps = {
  active?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const ButtonSolo = ({ active, onClick }: ButtonSoloProps) => {
  return (
    <Styled.ButtonSolo $active={active} onClick={onClick}>S</Styled.ButtonSolo>
  )
}
