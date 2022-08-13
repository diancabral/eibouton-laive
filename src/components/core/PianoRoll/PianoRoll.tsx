import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MIDI_NOTES_NAMES, MIDI_NOTES_OCTAVES } from '../../../providers/MIDIProvider/consts';
import { useGetMIDIGlobal } from '../../../store/midi/hooks/useGetMIDIGlobal';
import { useUpdateMIDIGlobal } from '../../../store/midi/hooks/useUpdateMIDIGlobal';
import { theme } from '../../../styled/theme';
import { Canvas, CanvasWriteTextParams } from '../../../utils/canvas';
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
  const [scrollY, setScrollY] = useState(0);
  const [noteHeight, setNoteHeight] = useState(20);

  const maxScroll = useMemo(() => MIDI_NOTES_OCTAVES * ((noteHeight + 1) * 12) - getHeight, [getHeight, noteHeight]);

  const keysContainerWidth = 80;
  const noteWidth = 20;

  const { updateMIDIGlobalKey, removeAllMIDIMessages } = useUpdateMIDIGlobal();
  const { getMIDINotesOn } = useGetMIDIGlobal();

  const activeNote = useMemo(() => (getMIDINotesOn.slice(-1)[0] || []).key, [getMIDINotesOn]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new Canvas({ element: canvasRef.current, scale: 2, width: getWidth, height: getHeight, pointerAxis: mousePosition, mouseClick, mouseActive, scrollY });

      for (let i = 0; i < MIDI_NOTES_OCTAVES; i++) {
        const octave = MIDI_NOTES_NAMES.length * (noteHeight + 1) * i;
        const height = noteHeight + 1;

        for (let x = 0; x < MIDI_NOTES_NAMES.length; x++) {
          const key = MIDI_NOTES_NAMES.length * MIDI_NOTES_OCTAVES - (MIDI_NOTES_NAMES.length * i + x) - 1;
          const note = MIDI_NOTES_NAMES[MIDI_NOTES_NAMES.length - 1 - x];

          const notePianoKey = {
            x: keysContainerWidth - noteWidth,
            y: octave + height * x,
            background: activeNote === key ? theme.colors.red[500] : !note.includes('#') ? 'white' : 'black',
            width: noteWidth,
            height: noteHeight,
            onActive: {
              background: theme.colors.red[500],
              return() {
                updateMIDIGlobalKey(key);
              },
            },
          };

          const notePianoKeyBorderBottom = {
            x: keysContainerWidth - noteWidth,
            y: octave + height * x - 1,
            width: noteHeight,
            fill: 'black',
            strokeWidth: 1,
          };

          canvas.drawBox(notePianoKey);
          canvas.drawLine(notePianoKeyBorderBottom);

          //

          const noteAreaStart = octave + height * x + scrollY;
          const noteAreaEnd = octave + height + (noteHeight + 1) * x - 1 + scrollY;

          if (note === 'C' || (mousePosition.y >= noteAreaStart && mousePosition.y <= noteAreaEnd)) {
            const noteName = {
              x: 5,
              y: octave + height + (noteHeight + 1) * x - 4,
              align: 'left',
              color: 'white',
              value: `${note}${MIDI_NOTES_OCTAVES - i - 2}`,
            };

            const octaveDivisorLine = {
              x: 0,
              y: octave + height + (noteHeight + 1) * x - 1,
              width: keysContainerWidth - noteHeight,
              fill: 'black',
              strokeWidth: 1,
            };

            canvas.writeText(noteName as CanvasWriteTextParams);
            canvas.drawLine(octaveDivisorLine);
          }
        }
      }

      // draw vertical left and right divisors line among keyboard and piano roll
      const verticalDivisor = {
        x: keysContainerWidth - noteWidth,
        y: 0,
        height: getHeight - scrollY,
        fill: 'black',
        strokeWidth: 1,
      };

      const rightVerticalDivisor = {
        ...verticalDivisor,
        x: keysContainerWidth,
      };

      canvas.drawLine(verticalDivisor);
      canvas.drawLine(rightVerticalDivisor);
    }
  }, [getHeight, getWidth, mouseActive, mouseClick, mousePosition, activeNote, scrollY, noteHeight, updateMIDIGlobalKey]);

  useEffect(() => {
    if (mouseClick) setMouseClick(false);
  }, [mouseClick]);

  useEffect(() => {
    const getMousePosition = (e: MouseEvent) => {
      if (canvasRef.current) {
        const { left, top } = canvasRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - left,
          y: e.clientY - top,
        });
      }
    };
    const element = canvasRef.current;
    element?.addEventListener('mousemove', getMousePosition);
    return () => element?.removeEventListener('mousemove', getMousePosition);
  }, []);

  useEffect(() => {
    const getMouseClick = (e: MouseEvent) => {
      setMouseActive(true);
      setMouseClick(true);
    };
    const element = canvasRef.current;
    element?.addEventListener('mousedown', getMouseClick);
    return () => element?.removeEventListener('mousedown', getMouseClick);
  }, []);

  useEffect(() => {
    const getMouseWheel = (e: WheelEvent) => {
      setScrollY((current) => Math.min(Math.max(current - Math.round(e.deltaY / 3), -maxScroll), 0));
    };
    const element = canvasRef.current;
    element?.addEventListener('wheel', getMouseWheel);
    return () => element?.removeEventListener('wheel', getMouseWheel);
  }, [maxScroll]);

  useEffect(() => {
    const resetMouseActive = () => {
      removeAllMIDIMessages();
      setMouseActive(false);
    };
    document.body.addEventListener('mouseup', resetMouseActive);
    return () => document.body.removeEventListener('mouseup', resetMouseActive);
  }, [removeAllMIDIMessages]);

  useEffect(() => {
    const element = container.current;
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setWidth(width);
      setHeight(height);
    });
    resizeObserver.observe(element as Element);
    return () => resizeObserver.unobserve(element as Element);
  }, []);

  return (
    <Wrapper>
      <Styled.Container ref={container}>
        <canvas ref={canvasRef}></canvas>
      </Styled.Container>
    </Wrapper>
  );
};
