import { lighten } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.containers.background};
  border: 4px solid ${({ theme }) => theme.colors.grey[900]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.65rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[300]};
  transform: translate3d(0,0,0);
  display: flex;
`;


export const Row = styled.ul<{
  $fixed?: boolean
}>`
  width: ${({ $fixed }) => !$fixed ? '100%' : 'fit-content'};
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  overflow-x: ${({ $fixed }) => !$fixed ? 'auto' : 'hidden'};
  ${({ $fixed }) => $fixed ? css`
    flex-shrink: 0;
  ` : null}
`;

export const Column = styled.li<{
  $fixed?: boolean
}>`
  ${({ $fixed }) => $fixed ? css`
    border-left: 2px solid ${({ theme }) => lighten(0.06, theme.colors.grey[900])};
  ` : null}
  width: 100px;
  height: 100%;
  padding: 0;
  border-right: ${({ $fixed, theme }) => !$fixed ? `2px solid ${lighten(0.06, theme.colors.grey[900])}` : `none`};
  flex-shrink: 0;
`;
