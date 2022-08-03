import styled, { css } from 'styled-components';

export type WrapperThemeType = 'black' | 'mid-dark' | 'dark' | 'light' | 'transparent';

export const Wrapper = styled.div<{
  $theme?: WrapperThemeType;
  $direction?: 'column' | 'row';
}>`
  ${({ theme, $theme, $direction = 'column' }) => css`
    width: 100%;
    height: 100%;
    background: ${$theme === 'dark'
      ? theme.colors.containers.borderLight
      : $theme === 'black'
      ? theme.colors.black
      : $theme === 'mid-dark'
      ? theme.colors.grey[800]
      : $theme === 'light'
      ? theme.colors.grey[600]
      : $theme === 'transparent'
      ? 'transparent'
      : theme.colors.containers.background};
    border: 4px solid
      ${$theme === 'light'
        ? theme.colors.grey[600]
        : $theme === 'mid-dark'
        ? theme.colors.grey[800]
        : $theme === 'black'
        ? theme.colors.black
        : $theme === 'transparent'
        ? 'transparent'
        : theme.colors.containers.borderLight};
    border-radius: ${theme.borderRadius.sm};
    display: flex;
    flex-direction: ${$direction};
    > * {
      width: 100%;
    }
  `}
`;
