import styled from 'styled-components';
import { Wrapper } from '../../ui/Wrapper/styled';

export const Container = styled(Wrapper)`
  height: 23px;
  padding: 2px ${({ theme }) => theme.spacing.xs};;
  color: ${({ theme }) => theme.colors.grey[300]};
  border-width: 3px;
`;
