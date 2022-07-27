import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding-right: 4px;
    display: flex;
    flex-direction: column;
  `};
`;

export const Children = styled.div`
  ${({ theme }) => css`
    height: 100%;
    padding: 4px;
    background: ${theme.colors.containers.background};
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    overflow: hidden;
  `};
`;

export const Header = styled.div`
  ${({ theme }) => css`
    padding: 4px 4px 0;
    background: ${theme.colors.containers.background};
    color: white;
    white-space: nowrap;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  `};
`;
