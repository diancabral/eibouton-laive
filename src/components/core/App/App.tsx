import React from 'react';
import { Knob } from '../../ui/Knob/Knob';

export const App = () => {
  const formatPanorama = (value: number) => {
    return value === 0 ? 'C' : value < 0 ? `${Math.abs(value)}L` : value > 0 ? `${value}R` : String(value);
  }

  return (
    <>
      <Knob value={20} min={20} max={200} />
      Normal
      <Knob value={0} min={-50} max={50} mode="center" format={formatPanorama} />
      Center
    </>
  );
};
