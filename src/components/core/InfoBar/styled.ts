import styled from 'styled-components';

export const Container = styled.div`
  padding: 2px ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.containers.background};
  border: 3px solid ${({ theme }) => theme.colors.containers.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.65rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[300]};
`;
