import styled from 'styled-components';

const CONTAINER_SIZE = 36;

export const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

interface CircleProps {
  $rotate?: number;
}

export const Circle = styled.div.attrs<CircleProps>((props) => ({
  style: {
    transform: `rotate(${-135 + (props.$rotate || 0)}deg)`,
  },
}))<CircleProps>`
  position: relative;
  width: ${CONTAINER_SIZE}px;
  height: ${CONTAINER_SIZE}px;
  border-radius: ${CONTAINER_SIZE}px;
  display: flex;
  justify-content: center;
  border: 3px solid black;
  &::before {
    content: '';
    width: 3px;
    height: ${CONTAINER_SIZE / 2}px;
    background: black;
    border-radius: 3px;
    transform: translateY(-3px);
  }
`;
export const Output = styled.output`
  text-align: center;
  font-family: sans-serif;
  font-size: 12px;
  color: black;
`;
