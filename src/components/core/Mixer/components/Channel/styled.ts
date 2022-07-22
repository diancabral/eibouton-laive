import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  width: 100%;
  padding: 3px 4px;
  background: ${({ theme }) => theme.colors.purple[300]};
  font-weight: 500;
  color: black;
`;
