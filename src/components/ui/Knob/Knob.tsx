import React, { memo, useEffect, useMemo, useState } from 'react';

import * as Styled from './styled';

type KnobProps = {
  min?: number;
  max?: number;
  value?: number;
  mode?: string;
  step?: number;
  format?: (value: number) => string;
}

export const Knob = memo(({ min = 0, max = 100, value = 0, mode = 'default', step = 1, format }: KnobProps) => {
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

  const handleMouseUp = () => {
    if (mouseActive) {
      setMouseActive(false);
      setClientYStart(0);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (mouseActive) {
      e.preventDefault();
      const distanceY = (clientYStart - e.clientY) * step;
      setCurrentValue(Math.min(Math.max(currentValue + distanceY, min), max));
    }
  };

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
      <Styled.Circle $rotate={rotate} onMouseDown={(e) => handleMouseDown(e)} />
      <Styled.Output>{format?.(currentValue) ?? currentValue}</Styled.Output>
    </Styled.Container>
  );
});
