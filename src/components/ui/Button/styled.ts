import styled, { css } from "styled-components";

type ButtonProps = {
  $toggle?: boolean;
  $active?: boolean;
}

export const Button = styled.button.attrs<ButtonProps>(({ theme, $active }) => ({
  style: {
    background: $active && theme.colors.orange[500],
    color: $active && 'black',
  }
}))<ButtonProps>`
  ${({ theme, $toggle, $active }) => css`
    height: 15px;
    min-width: 26px;
    padding: 0 3px;
    border: 1px solid black;
    background: ${theme.colors.grey[900]};
    text-align: center;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    ${!$toggle && css`
      &:focus {
        box-shadow: 0 0 0 1px white;
      }
    `}
    &:hover {
      background: ${theme.colors.grey[800]};
    }
    svg {
      width: 17px;
      height: 17px;
      ${$active && css`
        fill: black;
      `}
    }
  `}
`;
