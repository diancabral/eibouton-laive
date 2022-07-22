import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    > li {
      padding: 0;
    }
  }
`;

export const Indicator = styled.div`
  width: 9px;
  height: 9px;
  border: 1px solid ${({ theme }) => theme.colors.grey[900]};
  animation: blink .1s linear forwards;
  @keyframes blink {
    from {
      background: ${({ theme }) => theme.colors.orange[500]};
    }
    to {
      background: ${({ theme }) => theme.colors.grey[900]};
    }
  }
  &:first-of-type {
    margin-bottom: 1px;
  }
`
