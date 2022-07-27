import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => darken(.05, theme.colors.grey[800])};
  padding: ${({ theme }) => `0 ${theme.spacing.sm} ${theme.spacing.sm}`};
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div<{
  $fitContent?: boolean
}>`
  margin-top: ${({ theme }) => theme.spacing.sm};
  height: ${({ $fitContent }) => !$fitContent ? '100%' : 'fit-content'};
`;
