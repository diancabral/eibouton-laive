import { useGetMIDIGlobal } from '../../../../../store/midi/hooks/useGetMIDIGlobal';
import * as Styled from './styled'

const MIDIInIndicator = () => {
  const { getMIDIReceived } = useGetMIDIGlobal();
  return <Styled.Indicator key={getMIDIReceived} />
}

const MIDIOutIndicator = () => <Styled.Indicator />

export const MIDIOptions = () => {
  return (
    <Styled.Container>
      <li>
        <MIDIInIndicator />
        <MIDIOutIndicator />
      </li>
    </Styled.Container>
  )
};
