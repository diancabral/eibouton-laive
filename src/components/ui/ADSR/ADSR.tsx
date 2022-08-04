import { rgba } from 'polished';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MIDIInputType } from '../../../store/midi/types';
import { theme } from '../../../styled/theme';
import { useInterval } from './hooks/useInterval';
import * as Styled from './styled';

type ADSRProps = {
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
  width: number;
  height: number;
  midi: MIDIInputType;
};

export const ADSR = ({ attack = 0, decay = 0, sustain = 0, release = 0, width, height, midi }: ADSRProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  //

  const totalSeconds = attack + decay + release;

  const milisecondsToPixel = (ms: number) => {
    return ms * (width / miliseconds);
  };

  const miliseconds = useMemo(() => {
    return Math.max(1000, totalSeconds + 500 * (totalSeconds / 2000));
  }, [totalSeconds]);

  const milisecondsDivisor = useMemo(() => {
    return miliseconds > 64000 ? 16 : miliseconds > 32000 ? 8 : miliseconds > 16000 ? 4 : miliseconds > 8000 ? 2 : miliseconds > 4000 ? 1 : miliseconds > 2000 ? 0.5 : 0.25;
  }, [miliseconds]);

  const padding = 10;
  const canvasHeight = height - 15;
  const fps = 1000 / 60;

  const pxAttack = padding + milisecondsToPixel(attack);
  const pxDecay = pxAttack + milisecondsToPixel(decay);
  const pxRelease = pxDecay + milisecondsToPixel(release);
  const pxSustain = padding + (-(canvasHeight - padding) * sustain) / 100;

  //

  const setCanvasScale = (element: HTMLCanvasElement, scale: number, width: number, height: number) => {
    element.style.width = width + 'px';
    element.style.height = height + 'px';
    element.width = width * scale;
    element.height = height * scale;
  };

  const clearCanvasScreen = (context: CanvasRenderingContext2D, scale: number, width: number, height: number) => {
    context.scale(scale, scale);
    context.fillStyle = 'transparent';
    context.fillRect(0, 0, width, height);
  };

  const startLineFrom = (context: CanvasRenderingContext2D, x: number, y: number) => {
    context.beginPath();
    context.moveTo(x + 0.5, y + 0.5);
  };

  const drawLineTo = (context: CanvasRenderingContext2D, x: number, y: number) => {
    context.lineTo(x, y);
  };

  const drawCircleNote = (context: CanvasRenderingContext2D, x: number, y: number) => {
    // draw outline
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.strokeStyle = rgba(theme.colors.orange[500], 0.5);
    context.lineWidth = 10;
    context.filter = 'blur(4px)';
    context.fill();
    context.stroke();

    // draw inner circle
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fillStyle = theme.colors.orange[500];
    context.strokeStyle = theme.colors.orange[500];
    context.lineWidth = 1;
    context.filter = 'blur(0)';
    context.fill();
    context.stroke();
  };

  //

  const [startTime, setStartTime] = useState(+new Date());

  const draw = () => {
    if (canvas.current) {
      const scale = 2;

      //

      const context = canvas.current.getContext('2d');
      setCanvasScale(canvas.current, scale, width, height);

      if (context) {
        clearCanvasScreen(context, scale, width, height);

        context.lineWidth = 1;
        context.lineCap = 'round';
        context.strokeStyle = rgba('white', 0.2);
        // draw seconds lines
        for (let i = 0; i < miliseconds / 1000; i += milisecondsDivisor) {
          if (i % milisecondsDivisor === 0) {
            const x = padding + milisecondsToPixel(i * 1000);
            startLineFrom(context, x, padding);
            drawLineTo(context, x, canvasHeight);
            context.stroke();
            context.font = '700 10px Albert Sans';
            context.fillStyle = rgba('white', 0.3);
            context.textAlign = 'center';
            if (i) {
              const format = i * (i < 1 ? 1000 : 1);
              context.fillText(`${format}${i < 1 ? 'ms' : 's'}`, x, height);
            } else {
              context.fillText('0', x, height);
            }
          }
        }

        // define line style
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = rgba(theme.colors.orange[500], 1);

        // draw lines
        startLineFrom(context, padding, canvasHeight);
        drawLineTo(context, pxAttack, padding);
        drawLineTo(context, pxDecay, pxSustain);
        drawLineTo(context, pxRelease, canvasHeight);

        context.stroke();

        // draw circle time
        const elapsedTime = +new Date() - startTime;

        let circleX = pxDecay;
        let circleY = pxSustain;

        if (midi?.notesOn.length) {
          if (elapsedTime < attack) {
            const multiplier = elapsedTime / attack;
            circleX = padding + milisecondsToPixel(attack) * multiplier;
            circleY = canvasHeight - (canvasHeight - padding) * multiplier;
          } else if (elapsedTime < attack + decay) {
            const multiplier = (elapsedTime - attack) / decay;
            circleX = padding + milisecondsToPixel(attack) + milisecondsToPixel(decay) * multiplier;
            circleY = padding + (pxSustain - padding) * multiplier;
          }
          drawCircleNote(context, circleX, circleY);
        }
      }
    }
  };

  useInterval(() => {
    draw();
  }, fps);

  const midiNewNote = useMemo(() => {
    return midi.notesOn.map((val) => val.key).slice(-1)[0] || 0;
  }, [midi.notesOn]);

  useEffect(() => {
    setStartTime(+new Date());
  }, [midiNewNote]);

  return (
    <Styled.Container>
      <canvas ref={canvas} width={width} height={height} />
    </Styled.Container>
  );
};
