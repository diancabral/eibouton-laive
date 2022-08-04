import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

  const handleMouseUp = useCallback(() => {
    if (mouseActive) {
      setMouseActive(false);
      setClientYStart(0);
    }
  }, [mouseActive]);

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

  const editInput = useRef<HTMLInputElement>(null);
  const [editActive, setEditActive] = useState(false);
  const [editValue, setEditValue] = useState(0);

  const openEdit = () => {
    setEditValue(currentValue);
    setEditActive(true);
  };

  const handleEditEnter = useCallback(
    (e: KeyboardEvent) => {
      if (editActive && e.key === 'Enter') {
        setCurrentValue(editValue);
        setEditActive(false);
      }
    },
    [editValue, editActive]
  );

  const handleEditValueEdit = (value: string) => {
    setEditValue(Math.min(Math.max(parseFloat(value), min), max));
  };

  useEffect(() => {
    if (mouseActive) window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseActive, handleMouseUp]);

  useEffect(() => {
    if (editActive) editInput.current?.select();
  }, [editActive]);

  useEffect(() => {
    if (editActive) {
      window.addEventListener('keydown', handleEditEnter);
      window.addEventListener('mousedown', () => setEditActive(false));
    }
    return () => {
      window.removeEventListener('keydown', handleEditEnter);
      window.removeEventListener('mousedown', () => setEditActive(false));
    };
  }, [editActive, handleEditEnter]);

  return (
    <Styled.Container>
      {knob && <Styled.Circle $rotate={rotate} onMouseDown={(e) => handleMouseDown(e)} $theme={theme} />}
      {!editActive && (
        <Styled.Output $handler={!knob} onMouseDown={(e) => handleMouseDown(e)} onDoubleClick={() => openEdit()}>
          {format?.(currentValue) ?? currentValue}
        </Styled.Output>
      )}
      {editActive && (
        <Styled.Input
          ref={editInput}
          type="number"
          min={min}
          max={max}
          step={step(currentValue)}
          $handler={!knob}
          onDoubleClick={() => openEdit()}
          onMouseDown={(e) => e.stopPropagation()}
          value={!isNaN(editValue) ? editValue : ''}
          onChange={(e) => handleEditValueEdit(e.target.value)}
        />
      )}
    </Styled.Container>
  );
});

Knob.displayName = 'Knob';
