import React, { memo, useEffect, useMemo, useState } from 'react';
import { useMouseMoveHandler } from './hooks/useMouseMoveHandler';

import * as Styled from './styled';

type KnobProps = {
  min?: number;
  max?: number;
  value?: number;
  knob?: boolean;
  theme?: Styled.KnobThemeType;
  format?: (value: number) => string;
  step?: (value: number) => number;
  onChange: (value: number) => unknown;
};

export const Knob = memo(({ min = 0, max = 100, value = 0, knob = true, step = () => 1, format, theme, onChange }: KnobProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const rotate = useMemo(() => {
    const total = max - min;
    const percentage = ((currentValue - min) / total) * 100;
    return (percentage * 270) / 100;
  }, [currentValue, max, min]);

  /* */

  const [mouseActive, setMouseActive] = useState(false);
  const [clientYStart, setClientYStart] = useState(0);
  const [clientYOld, setClientYOld] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement | HTMLOutputElement>) => {
    setMouseActive(true);
    setClientYStart(e.clientY);
  };

  const handleMouseUp = () => {
    if (mouseActive) {
      setMouseActive(false);
      setClientYStart(0);
    }
  };

  useMouseMoveHandler((e: MouseEvent) => {
    if (mouseActive) {
      e.preventDefault();
      let isSum = false;
      if (clientYOld !== e.clientY) {
        if (clientYOld > e.clientY) isSum = true;
        let distanceY = currentValue + (clientYStart - e.clientY);
        const stepValue = step(distanceY);
        setCurrentValue(Math.min(Math.max(isSum ? currentValue + stepValue : currentValue - stepValue, min), max));
      }
      setClientYOld(e.clientY);
    }
  }, mouseActive);

  useEffect(() => {
    onChange(currentValue);
  }, [currentValue]);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseActive]);

  return (
    <Styled.Container>
      {knob && <Styled.Circle $rotate={rotate} onMouseDown={(e) => handleMouseDown(e)} $theme={theme} />}
      <Styled.Output $handler={!knob} onMouseDown={(e) => handleMouseDown(e)}>
        {format?.(currentValue) ?? currentValue}
      </Styled.Output>
    </Styled.Container>
  );
});

Knob.displayName = 'Knob';
