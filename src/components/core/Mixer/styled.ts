import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
`;

const afterLine = css`
&::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: inherit;
  height: 4px;
  background: ${({ theme }) => theme.colors.grey[900]};
}
`

export const Row = styled.ul<{
  $fixed?: boolean
}>`
  position: relative;
  width: ${({ $fixed }) => !$fixed ? '100%' : 'fit-content'};
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  ${({ $fixed }) => $fixed && css`flex-shrink: 0;`}
  overflow-x: scroll;
  overflow-y: hidden;

  ${afterLine}

  ::-webkit-scrollbar {
    width: 4px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grey[900]};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.grey[600]};
    border-radius: 5px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.grey[500]};
    }
  }
`;

export const Column = styled.li<{
  $fixed?: boolean
}>`
  ${({ $fixed }) => $fixed ? css`
    border-left: 3px solid ${({ theme }) => theme.colors.grey[900]};
  ` : null}
  width: 100px;
  height: 100%;
  padding: 0;
  border-bottom: 4px solid ${({ theme }) => theme.colors.grey[900]};
  flex-shrink: 0;
  border-right: ${({ $fixed, theme }) => !$fixed ? `2px solid ${theme.colors.grey[900]}` : `none`};
`;

export const Message = styled.div`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: white;
  white-space: nowrap;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${afterLine}
`;
