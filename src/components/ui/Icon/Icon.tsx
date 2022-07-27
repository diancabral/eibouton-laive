import { GeneratedIcons } from '../../../styled/types/generated';
import * as Styled from './styled';

type IconProps = {
  name: GeneratedIcons;
}

export const Icon = ({ name }: IconProps) => {
  return (
    <Styled.SVG>
      <use xlinkHref={`#${name}`}></use>
    </Styled.SVG>
  )
}
