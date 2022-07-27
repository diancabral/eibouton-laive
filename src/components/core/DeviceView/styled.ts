import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 190px;
  display: flex;
`;

export const InputIndicator = styled.div`
  width: 15px;
  padding-right: 5px;
  height: 100%;
  background: ${({ theme }) => theme.colors.containers.borderLight};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

export const Row = styled.div`
  display: flex;
`;

export const Message = styled.div`
  width: 100%;
  color: white;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.containers.background};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`;

