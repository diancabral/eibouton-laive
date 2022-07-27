import styled, { css } from 'styled-components';

export const Container = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

type DotsType = {
  $active: boolean
  $duration: number
  $small: boolean
}

export const Dots = styled.li.attrs<DotsType>((props) => ({
  style: {
    background: props.$active ? props.theme.colors.orange[500] : props.theme.colors.black,
    transitionDuration: `${props.$duration}s`
  },
}))<DotsType>`
  ${({ $small }) => $small ?
  css`
    width: 3px;
    height: 3px;
  ` :
  css`
    width: 6px;
    height: 6px;
  `}
  border-radius: 100%;
  transition-property: background;
  transition-timing-function: linear;
  &:not(:last-of-type) {
    margin-bottom: ${({ $small }) => $small ? '2px' : '3px'};
  }
`
