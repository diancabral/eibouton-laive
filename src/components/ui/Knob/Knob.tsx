import React, { useCallback, useEffect, useMemo, useState } from 'react';

import * as Styled from './styled';

interface KnobProps {
  min?: number;
  max?: number;
  value?: number;
  mode?: string;
  suffix?: string;
  step?: number;
}

export const Knob: React.FC<KnobProps> = ({ min = 0, max = 100, value = 0, mode = 'default', suffix, step = 1 }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const rotate = useMemo(() => {
    const total = max - min;
    const percentage = ((currentValue - min) / total) * 100;
    return (percentage * 270) / 100;
  }, [currentValue, max, min]);

  /* */

  const [mouseActive, setMouseActive] = useState(false);
  const [clientYStart, setClientYStart] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMouseActive(true);
    setClientYStart(e.clientY);
  };

  const handleMouseUp = useCallback(() => {
    if (mouseActive) {
      setMouseActive(false);
      setClientYStart(0);
    }
  }, [mouseActive]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (mouseActive) {
        e.preventDefault();
        const distance = (clientYStart - e.clientY) * step;
        setCurrentValue(Math.min(Math.max(currentValue + distance, min), max));
      }
    },
    [clientYStart, max, min, mouseActive]
  );

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [clientYStart, max, min, mouseActive]);

  return (
    <Styled.Container>
      <Styled.Circle $rotate={rotate} $mode={mode} onMouseDown={(e) => handleMouseDown(e)} />
      <Styled.Output>{currentValue}</Styled.Output>
    </Styled.Container>
  );
};
