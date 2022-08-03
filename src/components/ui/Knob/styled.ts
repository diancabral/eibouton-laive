import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: fit-content;
  padding-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export type KnobThemeType = 'white' | 'black' | 'mid-dark' | 'dark' | 'light';

type CircleProps = {
  $theme?: KnobThemeType;
  $rotate?: number;
  $size?: number;
};

export const Circle = styled.div.attrs<CircleProps>((props) => ({
  style: {
    transform: `rotate(${-135 + (props.$rotate || 0)}deg)`,
  },
}))<CircleProps>`
  ${({ theme, $theme, $size = 24 }) => css`
    position: relative;
    width: ${$size}px;
    height: ${$size}px;
    border-radius: ${$size}px;
    display: flex;
    justify-content: center;
    cursor: ns-resize;
    border: 2px solid
      ${$theme === 'dark'
        ? theme.colors.containers.borderLight
        : $theme === 'black'
        ? theme.colors.black
        : $theme === 'white'
        ? theme.colors.white
        : $theme === 'mid-dark'
        ? theme.colors.grey[800]
        : $theme === 'light'
        ? theme.colors.grey[600]
        : theme.colors.containers.background};
    &::before {
      content: '';
      width: 3px;
      height: ${$size / 2}px;
      background: ${$theme === 'dark'
        ? theme.colors.containers.borderLight
        : $theme === 'black'
        ? theme.colors.black
        : $theme === 'white'
        ? theme.colors.white
        : $theme === 'mid-dark'
        ? theme.colors.grey[800]
        : $theme === 'light'
        ? theme.colors.grey[600]
        : theme.colors.containers.background};
      border-radius: 3px;
      transform: translateY(-2px);
    }
  `};
`;
export const Output = styled.output`
  position: absolute;
  bottom: 0;
  text-align: center;
  color: white;
`;
