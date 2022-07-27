import styled from 'styled-components';

export const Container = styled.div`
  height: 190px;
  background: ${({ theme }) => theme.colors.containers.background};
  border: 4px solid ${({ theme }) => theme.colors.containers.borderLight};
  border-left: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.65rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[300]};
  display: flex;
`;

export const InputIndicator = styled.div`
  width: 15px;
  height: 100%;
  background: ${({ theme }) => theme.colors.containers.borderLight};
  display: flex;
  align-items: center;
  justify-content: center;
`
