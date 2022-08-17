import { darken } from 'polished';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MIDI_NOTES_NAMES, MIDI_NOTES_OCTAVES } from '../../../providers/MIDIProvider/consts';
import { useGetMIDIGlobal } from '../../../store/midi/hooks/useGetMIDIGlobal';
import { useUpdateMIDIGlobal } from '../../../store/midi/hooks/useUpdateMIDIGlobal';
import { theme } from '../../../styled/theme';
import { Canvas, CanvasDrawBoxParams, CanvasDrawLineParams, CanvasWriteTextParams } from '../../../utils/canvas';
import { Wrapper } from '../../ui/Wrapper/Wrapper';

import * as Styled from './styled';

type Axis = { x: number; y: number };

const keysContainerWidth = 80;
const noteWidth = 20;
const headerHeight = 50;
const background = darken(0.05, theme.colors.grey[700]);
const clipLength = {
  bar: 1,
  beats: 0,
  sixteents: 0,
};

export const PianoRoll = () => {
  const { updateMIDIGlobalKey, removeAllMIDIMessages } = useUpdateMIDIGlobal();
  const { getMIDINotesOn } = useGetMIDIGlobal();

  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [getWidth, setWidth] = useState(0);
  const [getHeight, setHeight] = useState(0);
  const [noteHeight, setNoteHeight] = useState(10);
  const [currentNoteHeight, setCurrentNoteHeight] = useState(noteHeight);

  const [mousePosition, setMousePosition] = useState<Axis>({} as Axis);
  const [mouseClickPosition, setMouseStartPosition] = useState<Axis>({} as Axis);
  const [mouseClick, setMouseClick] = useState(false);
  const [mouseActive, setMouseActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [resizeYActive, setResizeYActive] = useState(false);
  const [noteActive, setNoteActive] = useState(false);

  const maxScroll = useMemo(() => headerHeight + MIDI_NOTES_OCTAVES * ((noteHeight + 1) * 12) - getHeight, [getHeight, noteHeight]);
  const activeNote = useMemo(() => (getMIDINotesOn.slice(-1)[0] || []).key, [getMIDINotesOn]);

  useEffect(() => {
    const playNote = (key: number) => {
      updateMIDIGlobalKey(key);
      if (!noteActive) setNoteActive(true);
    };

    if (canvasRef.current) {
      const canvas = new Canvas({ element: canvasRef.current, scale: 2, width: getWidth, height: getHeight, pointerAxis: mousePosition, mouseClick, mouseActive, scrollY });

      //

      const headerArea: CanvasDrawBoxParams = {
        width: getWidth,
        height: headerHeight,
        background: 'transparent',
        y: 0 - scrollY,
        onActive: {
          stopPropagation: true,
        },
      };

      canvas.drawBox(headerArea);

      for (let i = 0; i < MIDI_NOTES_OCTAVES; i++) {
        const octave = MIDI_NOTES_NAMES.length * (noteHeight + 1) * i;
        const height = noteHeight + 1;

        for (let x = 0; x < MIDI_NOTES_NAMES.length; x++) {
          const key = MIDI_NOTES_NAMES.length * MIDI_NOTES_OCTAVES - (MIDI_NOTES_NAMES.length * i + x) - 1;
          const note = MIDI_NOTES_NAMES[MIDI_NOTES_NAMES.length - 1 - x];

          const notePianoKey = {
            x: keysContainerWidth - noteWidth,
            y: headerHeight + octave + height * x,
            background: activeNote === key ? theme.colors.red[500] : !note.includes('#') ? 'white' : 'black',
            width: noteWidth,
            height: noteHeight,
            ...(!resizeYActive && {
              onActive: {
                background: theme.colors.red[500],
                return() {
                  playNote(key);
                },
              },
            }),
          };

          const notePianoKeyActiveHandler: CanvasDrawBoxParams = {
            ...notePianoKey,
            x: 0,
            width: getWidth,
            background: 'transparent',
            onHover: {},
            ...(!noteActive
              ? {
                  onActive: {},
                }
              : {
                  onActive: {
                    ...notePianoKey.onActive,
                    background: 'transparent',
                    cursor: 'pointer',
                  },
                }),
          };

          const notePianoKeyGhost: CanvasDrawBoxParams = {
            ...notePianoKey,
            x: keysContainerWidth,
            width: getWidth,
            background: !note.includes('#') ? background : darken(0.1, theme.colors.grey[700]),
            onHover: {},
            onActive: {},
          };

          canvas.drawBox(notePianoKeyGhost);
          canvas.drawBox(notePianoKey);
          canvas.drawBox(notePianoKeyActiveHandler);

          const notePianoKeyBorderBottom: CanvasDrawLineParams = {
            x: keysContainerWidth - noteWidth,
            y: headerHeight + octave + height * x - 1,
            width: noteWidth,
            fill: 'black',
            strokeWidth: 1,
          };

          canvas.drawLine(notePianoKeyBorderBottom);

          //

          const noteAreaStart = headerHeight + octave + height * x + scrollY;
          const noteAreaEnd = headerHeight + octave + height + (noteHeight + 1) * x - 1 + scrollY;

          if (note === 'C' || (mousePosition.y >= noteAreaStart && mousePosition.y <= noteAreaEnd)) {
            const noteName: CanvasWriteTextParams = {
              x: 5,
              y: headerHeight + octave + height + (noteHeight + 1) * x - 4,
              align: 'left',
              color: 'white',
              value: `${note}${MIDI_NOTES_OCTAVES - i - 2}`,
            };

            const octaveDivisorLine: CanvasDrawLineParams = {
              x: 0,
              y: headerHeight + octave + height + (noteHeight + 1) * x - 1,
              width: keysContainerWidth - noteWidth,
              fill: 'black',
              strokeWidth: 1,
            };

            canvas.writeText(noteName);
            canvas.drawLine(octaveDivisorLine);
          }
        }
      }

      //

      const verticalDivisor: CanvasDrawLineParams = {
        x: keysContainerWidth - noteWidth,
        y: headerHeight - scrollY,
        height: getHeight,
        fill: 'black',
        strokeWidth: 1,
      };

      const rightVerticalDivisor = {
        ...verticalDivisor,
        x: keysContainerWidth,
      };

      canvas.drawLine(verticalDivisor);
      canvas.drawLine(rightVerticalDivisor);

      //

      const resizeYBar: CanvasDrawBoxParams = {
        width: keysContainerWidth - noteWidth,
        height: getHeight,
        background: 'transparent',
        y: headerHeight - scrollY,
        ...(!noteActive && {
          onHover: {
            cursor: 'ew-resize',
          },
          onActive() {
            if (!currentNoteHeight) setCurrentNoteHeight(noteHeight);
            if (!resizeYActive) setResizeYActive(true);
          },
        }),
      };

      canvas.drawBox(resizeYBar);

      //

      const header: CanvasDrawBoxParams = {
        ...headerArea,
        background,
        onActive: {},
      };

      canvas.drawBox(header);
    }
  }, [getHeight, getWidth, mouseActive, mouseClick, mousePosition, activeNote, scrollY, noteHeight, updateMIDIGlobalKey, noteActive, resizeYActive, currentNoteHeight]);

  useEffect(() => {
    if (mouseClick) setMouseClick(false);
  }, [mouseClick]);

  useEffect(() => {
    const getMousePosition = (e: MouseEvent) => {
      if (canvasRef.current) {
        const { left, top } = canvasRef.current.getBoundingClientRect();

        const x = e.clientX - left;
        const y = e.clientY - top;

        setMousePosition({ x, y });

        if (resizeYActive) {
          const distance = Math.ceil((e.clientX - mouseClickPosition.x) / 5);
          setNoteHeight(Math.min(Math.max(currentNoteHeight + distance, 8), 40));
        }
      }
    };
    const element = canvasRef.current;
    element?.addEventListener('mousemove', getMousePosition);
    return () => element?.removeEventListener('mousemove', getMousePosition);
  }, [currentNoteHeight, mouseClickPosition.x, resizeYActive]);

  useEffect(() => {
    const getMouseClick = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setMouseActive(true);
      setMouseClick(true);
      setMouseStartPosition({ x, y });
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
      setResizeYActive(false);
      setNoteActive(false);
      setCurrentNoteHeight(0);
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
