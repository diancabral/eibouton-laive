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

export const EnvelopeContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    > *:not(:last-child) {
      margin-right: 5px;
    }
  `}
`;

export const TabsRow = styled.ul`
  position: absolute;
  top: 0;
  left: 130px;
  padding: 0;
  margin: 0;
  transform: translateY(calc(-100% - 4px));
  z-index: 1;
  list-style: none;
  display: flex;
`;

export const Tab = styled.li<{
  $active?: boolean;
}>`
  ${({ theme, $active }) => css`
    padding: 2px 5px;
    background: ${$active ? theme.colors.grey[900] : theme.colors.grey[800]};
    font-size: 0.9rem;
    font-weight: 600;
    color: 'white';
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    cursor: pointer;
    &:not(:last-of-type) {
      margin-right: 1px;
    }
  `}
`;
