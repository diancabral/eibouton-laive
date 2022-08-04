import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding-bottom: 3px;
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

export const Output = styled.output<{ $handler: boolean }>`
  ${({ theme, $handler }) => css`
    width: 100%;
    color: ${$handler ? theme.colors.orange[500] : 'white'};
    text-align: ${!$handler && 'center'};
    cursor: ns-resize;
  `}
`;

export const Input = styled.input<{ $handler: boolean }>`
  ${({ theme, $handler }) => css`
    width: 100%;
    height: 12px;
    color: ${$handler ? theme.colors.orange[500] : 'white'};
    box-shadow: 0 0 0 1px white;
    background: none;
    outline: none;
    border: none;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `}
`;
