import styled, { css } from 'styled-components';
import { Button } from '../../../../ui/Button/styled';

type ButtonSoloProps = {
  $active?: boolean
}

export const ButtonSolo = styled(Button).attrs<ButtonSoloProps>(({ theme, $active }) => ({
  style: {
    background: $active && theme.colors.blue[400]
  },
}))<ButtonSoloProps>`
  ${({ theme, $active }) => css`
    padding: 0 ${theme.spacing.sm};
    background: ${theme.colors.grey[800]};
    color: ${$active ? 'black' : 'white'};
    line-height: 12px;
    &:not(:last-of-type) {
      margin-bottom: 5px;
    }
  `}
`;
