import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
