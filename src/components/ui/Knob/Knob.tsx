import React, { memo, useEffect, useMemo, useState } from 'react';

import * as Styled from './styled';

type KnobProps = {
  min?: number;
  max?: number;
  value?: number;
  mode?: string;
  theme?: Styled.KnobThemeType;
  format?: (value: number) => string;
  step?: (value: number) => number;
  onChange: (value: number) => unknown;
};

export const Knob = memo(({ min = 0, max = 100, value = 0, mode = 'default', step = () => 1, format, theme, onChange }: KnobProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const rotate = useMemo(() => {
    const total = max - min;
    const percentage = ((currentValue - min) / total) * 100;
    return (percentage * 270) / 100;
  }, [currentValue, max, min]);

  /* */

  const [mouseActive, setMouseActive] = useState(false);
  const [clientYStart, setClientYStart] = useState(0);
  const [, setClientYOld] = useState(0);
  const [valueStart, setValueStart] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseActive(true);
    setClientYStart(e.clientY);
    setValueStart(currentValue);
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
      setClientYOld((current) => {
        let isSum = false;
        if (current !== e.clientY) {
          if (current > e.clientY) isSum = true;
          setCurrentValue((current) => {
            let distanceY = current + (clientYStart - e.clientY);
            const stepValue = step(distanceY);
            return Math.min(Math.max(isSum ? current + stepValue : current - stepValue, min), max);
          });
        }
        return e.clientY;
      });
    }
  };

  useEffect(() => {
    onChange(currentValue);
  }, [currentValue]);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

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
      <Styled.Circle $rotate={rotate} onMouseDown={(e) => handleMouseDown(e)} $theme={theme} />
      <Styled.Output>{format?.(currentValue) ?? currentValue}</Styled.Output>
    </Styled.Container>
  );
});
