import { ADSR } from '../../components/ui/ADSR/ADSR';
import { FormLabel } from '../../components/ui/Form/Label/Label';
import { FormSelect } from '../../components/ui/Form/Select/Select';
import { Knob } from '../../components/ui/Knob/Knob';
import { Wrapper } from '../../components/ui/Wrapper/Wrapper';
import { useGetChannelData } from '../../store/channels/hooks/useGetChannelData';
import { useUpdateChannelData } from '../../store/channels/hooks/useUpdateChannelData';
import { ChannelType } from '../../types';

import * as Styled from './styled';

type MerusInterfaceProps = {
  data: ChannelType;
};

export const MerusInterface = ({ data }: MerusInterfaceProps) => {
  const { device, midi } = useGetChannelData(data);
  const { updateChannelDeviceConfig } = useUpdateChannelData(data);

  const handleSelectedWave = (e: string) => {
    updateChannelDeviceConfig({
      ...device.config,
      wave: e,
    });
  };

  const handleADSR = (value: number, stage: string) => {
    updateChannelDeviceConfig({
      ...device.config,
      [stage]: value,
    });
  };

  const milisecondsKnobStep = (value: number) => {
    if (value < 1000) return 10;
    if (value > 1000) return 100;
    return 1;
  };

  const formatMiliseconds = (value: number) => {
    // if (value < 10) return `${value.toFixed(0)}ms`;
    if (value < 1000) return `${value.toFixed(0)}ms`;
    return `${(value / 1000).toFixed(1)}s`;
  };

  return (
    <Wrapper theme="dark" direction="row">
      <Styled.Container>
        <Wrapper theme="mid-dark" direction="column">
          <FormSelect
            label="Wave"
            options={[
              {
                label: 'Sawtooth',
                value: 'sawtooth',
              },
              {
                label: 'Square',
                value: 'square',
              },
              {
                label: 'Sine',
                value: 'sine',
              },
              {
                label: 'Triangle',
                value: 'triangle',
              },
            ]}
            value={device.config.wave || 'sawtooth'}
            onSelect={(e) => handleSelectedWave(e)}
          />
          <FormLabel>Octave</FormLabel>
          <Knob theme="light" min={-4} max={4} onChange={(e) => false} />
          <FormLabel>Fine</FormLabel>
          <Knob theme="light" min={-100} max={100} onChange={(e) => false} />
        </Wrapper>
        <Wrapper theme="black">
          <FormLabel>Amp Envelope</FormLabel>
          <ADSR width={250} height={90} attack={device.config.attack} decay={device.config.decay} sustain={device.config.sustain} release={device.config.release} midi={midi} />
          {/* <input type="number" value={attack} onChange={(e) => setAttack(parseFloat(e.target.value))} />
        <input type="number" value={decay} onChange={(e) => setDecay(parseFloat(e.target.value))} /> */}
          <Styled.Container
            style={{
              marginTop: '10px',
            }}
          >
            <FormLabel>Attack</FormLabel>
            <Knob theme="light" min={0} max={32000} value={device.config.attack} onChange={(e) => handleADSR(e, 'attack')} step={milisecondsKnobStep} format={formatMiliseconds} />
            <FormLabel>Decay</FormLabel>
            <Knob theme="light" min={0} max={32000} value={device.config.decay} onChange={(e) => handleADSR(e, 'decay')} step={milisecondsKnobStep} format={formatMiliseconds} />
            <FormLabel>Sustain</FormLabel>
            <Knob theme="light" min={0} max={100} step={(e) => 1} format={(e) => e.toFixed(1)} value={device.config.sustain} onChange={(e) => handleADSR(e, 'sustain')} />
            <FormLabel>Release</FormLabel>
            <Knob theme="light" min={0} max={32000} value={device.config.release} onChange={(e) => handleADSR(e, 'release')} step={milisecondsKnobStep} format={formatMiliseconds} />
          </Styled.Container>
        </Wrapper>
      </Styled.Container>
    </Wrapper>
  );
};
