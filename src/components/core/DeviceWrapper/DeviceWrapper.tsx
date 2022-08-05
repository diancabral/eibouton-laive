import { ReactElement, ReactNode } from 'react';
import * as Styled from './styled';

type DeviceWrapperProps = {
  title: string;
  children: ReactElement | ReactNode;
};

export const DeviceWrapper = ({ title, children }: DeviceWrapperProps) => {
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.State />
        {title}
      </Styled.Header>
      <Styled.Children>{children}</Styled.Children>
    </Styled.Container>
  );
};
