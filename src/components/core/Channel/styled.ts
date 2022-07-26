import styled from 'styled-components';

// export const Circle = styled.div.attrs<CircleProps>((props) => ({
//   style: {
//     transform: `rotate(${-135 + (props.$rotate || 0)}deg)`,
//   },
// }))<CircleProps>`

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
