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

  const updateDeviceConfig = (value: number, stage: string) => {
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
        <Wrapper theme="black">
          <FormLabel>Amp Envelope</FormLabel>
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
              <Knob knob={false} theme="light" min={0} max={32000} value={device.config.decay} onChange={(e) => updateDeviceConfig(e, 'decay')} step={milisecondsKnobStep} format={formatMiliseconds} />
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
        {/* <Wrapper theme="black">
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
            onSelect={(e) => handleSelectedWave(e)}
          />
        </Wrapper> */}
        <Wrapper theme="mid-dark" direction="column">
          <FormLabel>Octave</FormLabel>
          <Knob theme="black" min={-3} max={3} onChange={(e) => updateDeviceConfig(e, 'octave')} />
          <FormLabel>Fine</FormLabel>
          <Knob theme="black" min={-100} max={100} onChange={(e) => updateDeviceConfig(e, 'fine')} />
          <FormLabel>Glide</FormLabel>
          <Knob theme="black" min={0} max={1000} onChange={(e) => updateDeviceConfig(e, 'portamento')} />
        </Wrapper>
        <Wrapper theme="mid-dark" direction="column">
          <FormLabel>Volume</FormLabel>
          <Knob theme="black" min={-100} max={0} onChange={(e) => updateDeviceConfig(e, 'fine')} />
        </Wrapper>
      </Styled.Container>
    </Wrapper>
  );
};
