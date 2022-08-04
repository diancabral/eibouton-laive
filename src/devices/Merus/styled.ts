import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    height: 100%;
    display: flex;
    color: white;
    white-space: nowrap;
    > * {
      width: 100%;
    }
    > *:not(:last-child) {
      margin-right: 4px;
    }
  `}
`;

export const BlockHeader = styled.div`
  ${({ theme }) => css`
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    > *:not(:last-child) {
      margin-right: ${theme.spacing.md};
    }
  `}
`;
