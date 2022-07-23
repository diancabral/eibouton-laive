import { useAtom } from 'jotai';
import { MIDIReceived } from '../../../../../store/midi';

import * as Styled from './styled'

const MIDIInIndicator = () => {
  const [received] = useAtom(MIDIReceived);
  return <Styled.Indicator key={received} />
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
