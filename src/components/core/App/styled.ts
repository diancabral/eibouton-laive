import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.dian};
  background-color: ${({ theme }) => theme.colors.amber[500]};
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  height: 100%;
`;
