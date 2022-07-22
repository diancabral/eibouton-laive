import { useContext } from 'react';
import { MIDIContext } from '../../../../../contexts/MIDIContext/MIDIContext';

import * as Styled from './styled'

const MIDIInIndicator = () => {
  const midi = useContext(MIDIContext);
  return <Styled.Indicator key={midi.received} />
}

const MIDIOutIndicator = () => <Styled.Indicator />

export const MIDIOptions = () => {
  return (
    <Styled.Container>
      <ul>
        <li>
          <MIDIInIndicator />
          <MIDIOutIndicator />
        </li>
      </ul>
    </Styled.Container>
  )
};
