import styled, { css } from 'styled-components';
import { Button } from '../../../../ui/Button/styled';

type ButtonArmedProps = {
  $active?: boolean
}

export const ButtonArmed = styled(Button).attrs<ButtonArmedProps>(({ theme, $active }) => ({
  style: {
    background: $active && theme.colors.red[400]
  },
}))<ButtonArmedProps>`
  ${({ theme, $active }) => css`
    padding: 2px ${theme.spacing.sm};
    background: ${theme.colors.grey[800]};
    > div {
      background: ${$active ? 'black' : 'white'};
      border-radius: 100%;
      display: flex;
      svg {
        width: 8px;
        height: 8px;
        fill: ${$active ? theme.colors.red[400] : theme.colors.grey[800]};
      }
    }
  `}
`;
