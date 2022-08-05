import { useCallback, useMemo, useState } from 'react';
import { ADSR } from '../../components/ui/ADSR/ADSR';
import { FormLabel } from '../../components/ui/Form/Label/Label';
import { FormSelect } from '../../components/ui/Form/Select/Select';
import { Knob } from '../../components/ui/Knob/Knob';
import { Wrapper } from '../../components/ui/Wrapper/Wrapper';
import { useGetDeviceConfig } from '../../store/channels/hooks/useGetChannelDevice';
import { useUpdateChannelData } from '../../store/channels/hooks/useUpdateChannelData';
import { useGetMIDIMessages } from '../../store/midi/hooks/useGetMIDIMessages';
import { ChannelType } from '../../types';

import * as Styled from './styled';

type MerusInterfaceProps = {
  data: ChannelType;
};

export const MerusInterface = ({ data }: MerusInterfaceProps) => {
  const midi = useGetMIDIMessages(data);
  const config = useGetDeviceConfig(data);

  const { updateChannelDeviceConfig } = useUpdateChannelData(data);

  const updateDeviceConfig = (param: string, value: number | string) => {
    updateChannelDeviceConfig({
      [param]: value,
    });
  };

  type Oscilattors = 'osc1' | 'osc2';

  const [currentOscillator, setCurrentOscillator] = useState<Oscilattors>('osc1');
  const [currentTab, setCurrentTab] = useState('osc1');

  const handleTabSelect = (tab: string) => {
    if (['osc1', 'osc2'].includes(tab)) setCurrentOscillator(tab as Oscilattors);
    setCurrentTab(tab);
  };

  const oscilattorConfig = useMemo(() => config[currentOscillator] || {}, [config, currentOscillator]);

  const updateDeviceOscillatorConfig = useCallback(
    (value: number | string, param: string) => {
      updateChannelDeviceConfig({
        [currentOscillator]: {
          [param]: value,
        },
      });
    },
    [currentOscillator, updateChannelDeviceConfig]
  );

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
        <Styled.TabsRow>
          <Styled.Tab $active={currentTab === 'osc1'} onClick={() => handleTabSelect('osc1')}>
            Osc 1
          </Styled.Tab>
          <Styled.Tab $active={currentTab === 'osc2'} onClick={() => handleTabSelect('osc2')}>
            Osc 2
          </Styled.Tab>
          <Styled.Tab $active={currentTab === 'env1'} onClick={() => handleTabSelect('env1')}>
            Env 1
          </Styled.Tab>
          <Styled.Tab $active={currentTab === 'env2'} onClick={() => handleTabSelect('env2')}>
            Env 2
          </Styled.Tab>
          <Styled.Tab $active={currentTab === 'matrix'} onClick={() => handleTabSelect('matrix')}>
            Matrix
          </Styled.Tab>
          <Styled.Tab $active={currentTab === 'filter'} onClick={() => handleTabSelect('filter')}>
            Filter
          </Styled.Tab>
        </Styled.TabsRow>
        <FormLabel>Amp Envelope</FormLabel>
        <Styled.EnvelopeContainer>
          <Wrapper theme="black">
            <ADSR width={300} height={95} attack={oscilattorConfig.attack} decay={oscilattorConfig.decay} sustain={oscilattorConfig.sustain} release={oscilattorConfig.release} midi={midi} />
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
                  value={oscilattorConfig.attack}
                  onChange={(e) => updateDeviceOscillatorConfig(e, 'attack')}
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
                  value={oscilattorConfig.decay}
                  onChange={(e) => updateDeviceOscillatorConfig(e, 'decay')}
                  step={milisecondsKnobStep}
                  format={formatMiliseconds}
                />
              </div>
              <div>
                <FormLabel>Sustain</FormLabel>
                <Knob knob={false} theme="light" min={-100} max={0} step={(e) => 1} format={formatDB} value={oscilattorConfig.sustain} onChange={(e) => updateDeviceOscillatorConfig(e, 'sustain')} />
              </div>
              <div>
                <FormLabel>Release</FormLabel>
                <Knob
                  knob={false}
                  theme="light"
                  min={0}
                  max={32000}
                  value={oscilattorConfig.release}
                  onChange={(e) => updateDeviceOscillatorConfig(e, 'release')}
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
                  value={oscilattorConfig.wave || 'sawtooth'}
                  onSelect={(e) => updateDeviceOscillatorConfig(e, 'wave')}
                  mb={1}
                />
              </div>
              <Styled.EnvelopeContainer>
                <div>
                  <FormLabel>Octave</FormLabel>
                  <Knob knob={false} theme="light" min={-3} max={3} value={oscilattorConfig.octave} onChange={(e) => updateDeviceOscillatorConfig(e, 'octave')} />
                </div>
                <div>
                  <FormLabel>Fine</FormLabel>
                  <Knob knob={false} theme="light" min={-100} max={100} value={oscilattorConfig.fine} onChange={(e) => updateDeviceOscillatorConfig(e, 'fine')} />
                </div>
              </Styled.EnvelopeContainer>
              <div>
                <FormLabel>Vol &gt; Output</FormLabel>
                <Knob knob={false} theme="light" min={-100} max={0} value={oscilattorConfig.volume} onChange={(e) => updateDeviceOscillatorConfig(e, 'volume')} format={formatDB} />
              </div>
            </div>
          </Styled.EnvelopeContainer>
        </Styled.EnvelopeContainer>
      </Wrapper>
      <Wrapper theme="mid-dark" direction="column">
        <FormLabel>Glide</FormLabel>
        <Knob theme="black" min={0} max={100} value={config.portamento} onChange={updateDeviceConfig.bind(this, 'portamento')} format={formatMiliseconds} />
        <FormLabel>Output</FormLabel>
        <Knob theme="black" min={-100} max={0} value={config.volume} onChange={updateDeviceConfig.bind(this, 'volume')} format={formatDB} />
      </Wrapper>
    </Styled.Container>
  );
};
