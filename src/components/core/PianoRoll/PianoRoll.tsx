import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MIDI_NOTES_NAMES, MIDI_NOTES_OCTAVES } from '../../../providers/MIDIProvider/consts';
import { useGetMIDIGlobal } from '../../../store/midi/hooks/useGetMIDIGlobal';
import { useUpdateMIDIGlobal } from '../../../store/midi/hooks/useUpdateMIDIGlobal';
import { theme } from '../../../styled/theme';
import { Canvas } from '../../../utils/canvas';
import { Wrapper } from '../../ui/Wrapper/Wrapper';

import * as Styled from './styled';

type Axis = { x: number; y: number };

export const PianoRoll = () => {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [getWidth, setWidth] = useState(0);
  const [getHeight, setHeight] = useState(0);
  const [mousePosition, setMousePosition] = useState<Axis>({} as Axis);
  const [mouseClick, setMouseClick] = useState(false);
  const [mouseActive, setMouseActive] = useState(false);

  // const [yScale, setYScale] = useState(1);
  // const [xScale, setXScale] = useState(1);

  const keysContainerWidth = 80;
  const keyWidth = 20;

  const { updateMIDIGlobalKey, removeAllMIDIMessages } = useUpdateMIDIGlobal();
  const { getMIDINotesOn } = useGetMIDIGlobal();

  const activeNote = useMemo(() => (getMIDINotesOn.slice(-1)[0] || []).key, [getMIDINotesOn]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new Canvas({ element: canvasRef.current, scale: 2, width: getWidth, height: getHeight, pointerAxis: mousePosition, mouseClick, mouseActive });

      for (let i = 0; i < MIDI_NOTES_OCTAVES; i++) {
        const octave = MIDI_NOTES_NAMES.length * (keyWidth + 1) * i;
        for (let x = 0; x < MIDI_NOTES_NAMES.length; x++) {
          const key = MIDI_NOTES_NAMES.length * MIDI_NOTES_OCTAVES - (MIDI_NOTES_NAMES.length * i + x) - 1;
          const note = MIDI_NOTES_NAMES[MIDI_NOTES_NAMES.length - 1 - x];
          const height = keyWidth + 1;
          canvas.drawBox({
            x: keysContainerWidth - keyWidth,
            y: octave + height * x,
            background: activeNote === key ? theme.colors.red[500] : !note.includes('#') ? 'white' : 'black',
            width: keyWidth,
            height: keyWidth,
            onActive: {
              background: theme.colors.red[500],
              return() {
                updateMIDIGlobalKey(key);
              },
            },
          });
          canvas.drawLine({
            x: keysContainerWidth - keyWidth,
            y: octave + height * x - 1,
            width: keyWidth,
            fill: 'black',
            strokeWidth: 1,
          });
        }
        if (i > 0) {
          canvas.drawLine({
            x: 0,
            y: octave - 1,
            width: keysContainerWidth - keyWidth - 1,
            fill: 'black',
            strokeWidth: 1,
          });
        }
      }
      canvas.drawLine({
        x: keysContainerWidth - keyWidth,
        y: 0,
        height: getHeight,
        fill: 'black',
        strokeWidth: 1,
      });
      canvas.drawLine({
        x: keysContainerWidth,
        y: 0,
        height: getHeight,
        fill: 'black',
        strokeWidth: 1,
      });
    }
  }, [getHeight, getWidth, mouseActive, mouseClick, mousePosition, activeNote]);

  const getMousePosition = (e: MouseEvent) => {
    if (canvasRef.current) {
      const { left, top } = canvasRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - left,
        y: e.clientY - top,
      });
    }
  };

  const getMouseClick = (e: MouseEvent) => {
    setMouseActive(true);
    setMouseClick(true);
  };

  const resetMouseActive = useCallback(() => {
    removeAllMIDIMessages();
    setMouseActive(false);
  }, [removeAllMIDIMessages]);

  useEffect(() => {
    if (mouseClick) setMouseClick(false);
  }, [mouseClick]);

  useEffect(() => {
    document.body.addEventListener('mousemove', getMousePosition);
    return () => document.body.removeEventListener('mousemove', getMousePosition);
  }, []);

  useEffect(() => {
    document.body.addEventListener('mousedown', getMouseClick);
    return () => document.body.removeEventListener('mousedown', getMouseClick);
  }, []);

  useEffect(() => {
    document.body.addEventListener('mouseup', resetMouseActive);
    return () => document.body.removeEventListener('mouseup', resetMouseActive);
  }, [resetMouseActive]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (container.current) {
        const { width, height } = container.current.getBoundingClientRect();
        setWidth(width);
        setHeight(height);
      }
    });
    resizeObserver.observe(document.body);
    return () => resizeObserver.unobserve(document.body);
  }, []);

  return (
    <Wrapper>
      <Styled.Container ref={container}>
        <canvas ref={canvasRef}></canvas>
      </Styled.Container>
    </Wrapper>
  );
};
