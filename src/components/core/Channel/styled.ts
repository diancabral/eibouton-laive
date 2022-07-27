import { lighten } from 'polished';
import styled from 'styled-components';

type ContainerProps = {
  $selected: boolean
}

export const Container = styled.div.attrs<ContainerProps>((props) => ({
  style: {
    background: props.$selected && 'rgba(255, 255, 255, 0.15)'
  },
}))<ContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  width: 100%;
  padding: 3px 4px;
  background: ${({ theme }) => theme.colors.purple[300]};
  font-weight: 500;
  color: black;
`;

export const ChannelRow = styled.div`
  height: 100%;
  display: flex;
  border-top: ${({ theme }) => `2px solid ${lighten(0.06, theme.colors.grey[900])}`};
`

export const MixerCol = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  &:first-of-type {
    padding-left: ${({ theme }) => theme.spacing.md};
  }
`
