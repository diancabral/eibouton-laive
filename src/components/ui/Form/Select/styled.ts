import styled, { css } from 'styled-components';
import { Button } from '../../Button/styled';

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
    label {
      color: rgba(255, 255, 255, .5);
    }
  `}
`

export type FormSelectThemes = 'black';

type ValueProps = {
  $theme?: FormSelectThemes;
}

export const Value = styled(Button)<ValueProps>`
  ${({ theme, $theme }) => css`
    padding: 0 2px;
    background: ${$theme === 'black' && theme.colors.black };
    svg {
      margin-top: -2px;
      margin-left: 4px;
      width: 14px;
      height: 14px;
      transform: rotate(90deg);
    }
    &:hover {
      background: none;
    }
  `}
`;
