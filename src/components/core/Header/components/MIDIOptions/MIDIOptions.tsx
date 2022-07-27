import { useGetMIDIGlobal } from '../../../../../store/midi/hooks/useGetMIDIGlobal';
import { Button } from '../../../../ui/Button/Button';
import * as Styled from './styled'

const MIDIInIndicator = () => {
  const { getMIDIReceived } = useGetMIDIGlobal();
  return <Styled.Indicator key={getMIDIReceived} />
}

const MIDIOutIndicator = () => <Styled.Indicator />

export const MIDIOptions = () => {
  return (
    <Styled.Container>
      {/* <li>
        <Button icon="piano" toggle active>Keyboard</Button>
      </li> */}
      <li>
        <Button toggle>MIDI</Button>
      </li>
      <li>
        <MIDIInIndicator />
        <MIDIOutIndicator />
      </li>
    </Styled.Container>
  )
};
