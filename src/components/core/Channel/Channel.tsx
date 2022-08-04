import React, { memo } from 'react';
import { ChannelTrackType, ChannelType } from '../../../types';
import { TYPES_TITLES } from './consts';

import { useGetChannelData } from '../../../store/channels/hooks/useGetChannelData';
import { useUpdateChannelData } from '../../../store/channels/hooks/useUpdateChannelData';
import { MIDIIndicator } from '../../ui/MIDIIndicator/MIDIIndicator';

import { Merus } from '../../../devices/Merus/Merus';
import { ButtonArm } from './components/ButtonArm/ButtonArm';
import { ButtonSolo } from './components/ButtonSolo/ButtonSolo';

import * as Styled from './styled';

//

type ChannelTitleProps = {
  isMaster: boolean;
  type: ChannelTrackType;
  title?: string;
  index?: number;
};

const ChannelTitle = ({ isMaster, type, title, index = 0 }: ChannelTitleProps) => {
  return isMaster ? <Styled.Title>{TYPES_TITLES['master']}</Styled.Title> : <Styled.Title>{`${!title ? index + 1 : ''} ${title || TYPES_TITLES[type]}`}</Styled.Title>;
};

//

export const InputIndicator = ({ midi }: any) => {
  return <MIDIIndicator data={midi} />;
};

type ChannelProps = {
  index?: number;
  data: ChannelType;
};

export const Channel = memo(({ index = 0, data }: ChannelProps) => {
  const { selected, metadata, mixer, midi, isMaster } = useGetChannelData(data);

  const { updateChannelTitle, updateChannelDevice, activateChannelArm, deactivateChannelArm, activateSoloChannel, updateChannelSelected } = useUpdateChannelData(data);

  //

  const addDevice = () => {
    updateChannelTitle(!index ? 'sawtooth' : index === 1 ? 'square' : index === 2 ? 'triangle' : 'sine');
    updateChannelDevice(<Merus data={data} />, {
      wave: 'sawtooth',
      attack: 0.5,
      decay: 250,
      sustain: 0,
      release: 0.15,
    });
  };

  const toggleMIDIArm = async () => {
    if (!mixer.arm) {
      activateChannelArm();
    } else {
      deactivateChannelArm();
    }
  };

  const soloChannel = async () => {
    if (!mixer.solo) activateSoloChannel();
  };

  const selectChannel = async () => {
    if (!selected) updateChannelSelected();
  };

  return (
    <Styled.Container $selected={selected}>
      <div onMouseDown={selectChannel}>
        <ChannelTitle isMaster={isMaster} type={metadata.type} index={index} title={metadata.title} />
      </div>
      {!isMaster && (
        <>
          <Styled.ChannelRow>{/* { !device.component ? <button onClick={addDevice}>add device</button> : 'device connected' } */}</Styled.ChannelRow>
          <Styled.ChannelRow
            style={{
              height: 'fit-content',
            }}
          >
            <Styled.MixerCol>
              <ButtonSolo onClick={soloChannel} active={mixer.solo} />
              <ButtonArm onClick={toggleMIDIArm} active={mixer.arm} />
            </Styled.MixerCol>
            <Styled.MixerCol>
              <InputIndicator midi={midi} />
            </Styled.MixerCol>
          </Styled.ChannelRow>
        </>
      )}
    </Styled.Container>
  );
});

Channel.displayName = 'Channel';
