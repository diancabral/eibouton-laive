import { FormSelect } from '../../components/ui/Form/Select/Select';
import { Wrapper } from '../../components/ui/Wrapper/Wrapper';

import * as Styled from './styled';

export const MerusInterface = () => {
  return (
    <Styled.Container>
      <Wrapper theme="black" direction="column">
        <Styled.BlockHeader>
          <FormSelect theme='black' label="Wave" />
        </Styled.BlockHeader>
        <Wrapper theme="black">
          Amp Envelope
          <div style={{
          width: '250px'
        }}></div>
        </Wrapper>
      </Wrapper>
    </Styled.Container>
  )
};
