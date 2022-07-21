import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.grey[400]};
  border-radius: 4px;
  border: 3px solid ${({ theme }) => theme.colors.grey[700]};
  font-size: 0.7rem
`;
