import { ADSR } from '../../components/ui/ADSR/ADSR';
import { FormLabel } from '../../components/ui/Form/Label/Label';
import { FormSelect } from '../../components/ui/Form/Select/Select';
import { Value } from '../../components/ui/Form/Select/styled';
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

  const updateDeviceConfig = (value: number | string, stage: string) => {
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

  const formatDB = (value: number) => {
    return `${value === -100 ? '-Inf' : value} db`;
  };

  return (
    <Styled.Container>
      <Wrapper theme="dark">
        <FormLabel>Amp Envelope</FormLabel>
        <Styled.EnvelopeContainer>
          <Wrapper theme="black">
            <ADSR width={250} height={95} attack={device.config.attack} decay={device.config.decay} sustain={device.config.sustain} release={device.config.release} midi={midi} />
            <Styled.Container
              style={{
                marginTop: '10px',
              }}
            >
              <div>
                <FormLabel>Attack</FormLabel>
                <Knob
                  knob={false}
                  theme="light"
                  min={0}
                  max={32000}
                  value={device.config.attack}
                  onChange={(e) => updateDeviceConfig(e, 'attack')}
                  step={milisecondsKnobStep}
                  format={formatMiliseconds}
                />
              </div>
              <div>
                <FormLabel>Decay</FormLabel>
                <Knob
                  knob={false}
                  theme="light"
                  min={0}
                  max={32000}
                  value={device.config.decay}
                  onChange={(e) => updateDeviceConfig(e, 'decay')}
                  step={milisecondsKnobStep}
                  format={formatMiliseconds}
                />
              </div>
              <div>
                <FormLabel>Sustain</FormLabel>
                <Knob knob={false} theme="light" min={0} max={100} step={(e) => 1} format={(e) => e.toFixed(1)} value={device.config.sustain} onChange={(e) => updateDeviceConfig(e, 'sustain')} />
              </div>
              <div>
                <FormLabel>Release</FormLabel>
                <Knob
                  knob={false}
                  theme="light"
                  min={0}
                  max={32000}
                  value={device.config.release}
                  onChange={(e) => updateDeviceConfig(e, 'release')}
                  step={milisecondsKnobStep}
                  format={formatMiliseconds}
                />
              </div>
            </Styled.Container>
          </Wrapper>
          <Styled.EnvelopeContainer>
            <div>
              <div>
                <FormLabel>Wave</FormLabel>
                <FormSelect
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
                  onSelect={(e) => updateDeviceConfig(e, 'wave')}
                  mb={1}
                />
              </div>
              <Styled.EnvelopeContainer>
                <div>
                  <FormLabel>Octave</FormLabel>
                  <Knob knob={false} theme="light" min={-3} max={3} onChange={(e) => updateDeviceConfig(e, 'octave')} />
                </div>
                <div>
                  <FormLabel>Fine</FormLabel>
                  <Knob knob={false} theme="light" min={-100} max={100} onChange={(e) => updateDeviceConfig(e, 'fine')} />
                </div>
              </Styled.EnvelopeContainer>
              <div>
                <FormLabel>Glide</FormLabel>
                <Knob knob={false} theme="light" min={0} max={100} onChange={(e) => updateDeviceConfig(e, 'portamento')} />
              </div>
              <div>
                <FormLabel>Volume</FormLabel>
                <Knob knob={false} theme="light" min={-100} max={0} onChange={(e) => updateDeviceConfig(e, 'fine')} format={formatDB} />
              </div>
            </div>
          </Styled.EnvelopeContainer>
        </Styled.EnvelopeContainer>
      </Wrapper>
      <Wrapper theme="mid-dark" direction="column">
        <FormLabel>Output</FormLabel>
        <Knob theme="black" min={-100} max={0} onChange={(e) => updateDeviceConfig(e, 'fine')} format={formatDB} />
      </Wrapper>
    </Styled.Container>
  );
};
