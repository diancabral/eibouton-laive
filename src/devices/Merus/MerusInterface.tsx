import { useState } from 'react';
import { ADSR } from '../../components/ui/ADSR/ADSR';
import { FormLabel } from '../../components/ui/Form/Label/Label';
import { FormSelect } from '../../components/ui/Form/Select/Select';
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

  const [attack, setAttack] = useState(1000);
  const [decay, setDecay] = useState(1000);

  return (
    <Styled.Container>
      <Wrapper theme="mid-dark" direction="column">
        <Styled.BlockHeader>
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
        </Styled.BlockHeader>
        <Wrapper theme="black">
          <FormLabel>Env 1</FormLabel>
          <ADSR width={250} height={100} attack={attack} decay={decay} sustain={-15} release={100} midi={midi} />
          {/* <input type="number" value={attack} onChange={(e) => setAttack(parseFloat(e.target.value))} />
          <input type="number" value={decay} onChange={(e) => setDecay(parseFloat(e.target.value))} /> */}
        </Wrapper>
      </Wrapper>
    </Styled.Container>
  );
};
