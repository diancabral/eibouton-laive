import styled, { css } from "styled-components";

export const Button = styled.button`
  ${({ theme }) => css`
    min-width: 26px;
    padding: 3px ${theme.spacing.sm};
    border: 1px solid black;
    background: ${theme.colors.grey[900]};
    display: flex;
    justify-content: center;
    cursor: pointer;
    font-size: 10px;
    font-weight: 600;
    text-align: center;
    color: white;
    &:focus {
      box-shadow: 0 0 0 1px white;
    }
  `}
`;
