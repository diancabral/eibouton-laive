import React from 'react';
import { Knob } from '../../ui/Knob/Knob';

export const App: React.FC = () => {
  return (
    <>
      <Knob value={20} min={20} max={20000} suffix="hz" step={10} />
      Normal
      <Knob value={0} min={-50} max={50} mode="center" />
      Center
    </>
  );
};
