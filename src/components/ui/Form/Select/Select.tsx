import { Icon } from '../../Icon/Icon';
import * as Styled from './styled';

type FormSelectProps = {
  label?: string;
  theme?: Styled.FormSelectThemes;
}

export const FormSelect = ({ label, theme }: FormSelectProps) => {
  return (
    <Styled.Container>
      {label && <label>{label}</label>}
      <Styled.Value $theme={theme}>
        Sawtooth
        <Icon name="play_arrow" />
      </Styled.Value>
      {/* <Styled.Arrow />
      <Styled.Options></Styled.Options> */}
    </Styled.Container>
  );
};
