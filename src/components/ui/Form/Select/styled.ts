import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { Button } from '../../Button/styled';

export type FormSelectThemes = 'black';

type ValueProps = {
  $theme?: FormSelectThemes;
};

export const Wrapper = styled.div<SpaceProps>`
  position: relative;
  ${space}
`;

export const Value = styled(Button)<ValueProps>`
  ${({ theme, $theme }) => css`
    width: 70px;
    padding: 0 2px;
    background: ${$theme === 'black' && theme.colors.black};
    justify-content: space-between;
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

export const Row = styled.ul`
  ${({ theme }) => css`
    position: absolute;
    top: 100%;
    left: -1px;
    border: 1px solid white;
    background: ${theme.colors.black};
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 2;
  `}
`;

export const List = styled.li`
  padding: 2px 7px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
