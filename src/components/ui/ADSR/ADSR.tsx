import { rgba } from 'polished';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MIDIInputType } from '../../../store/midi/types';
import { theme } from '../../../styled/theme';
import * as Styled from './styled';

type ADSRProps = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  width: number;
  height: number;
  midi?: MIDIInputType;
};

export const ADSR = ({ attack = 0, decay = 0, sustain, release = 0, width, height, midi }: ADSRProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  //

  const totalSeconds = attack + decay + release;

  const milisecondsToPixel = (ms: number) => {
    return ms * (width / miliseconds);
  };

  const miliseconds = useMemo(() => {
    return Math.max(3500, totalSeconds + 500);
  }, [totalSeconds]);

  const milisecondsDivisor = useMemo(() => {
    return miliseconds > 32000 ? 8 : miliseconds > 16000 ? 4 : miliseconds > 8000 ? 2 : 1;
  }, [miliseconds]);

  const padding = 10;
  const canvasHeight = height - 15;
  const fps = 1000 / 60;

  const pxAttack = padding + milisecondsToPixel(attack);
  const pxDecay = pxAttack + milisecondsToPixel(decay);
  const pxRelease = pxDecay + milisecondsToPixel(release);

  //

  const setCanvasScale = (element: HTMLCanvasElement, scale: number, width: number, height: number) => {
    element.style.width = width + 'px';
    element.style.height = height + 'px';
    element.width = width * scale;
    element.height = height * scale;
  };

  const clearCanvasScreen = (context: CanvasRenderingContext2D, scale: number, width: number, height: number) => {
    context.scale(scale, scale);
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
    context.strokeStyle = rgba(theme.colors.blue[500], 0.5);
    context.lineWidth = 10;
    context.filter = 'blur(4px)';
    context.fill();
    context.stroke();

    // draw inner circle
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fillStyle = theme.colors.blue[500];
    context.strokeStyle = theme.colors.blue[500];
    context.lineWidth = 1;
    context.filter = 'blur(0)';
    context.fill();
    context.stroke();
  };

  //

  const startTime = +new Date();

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
        for (let i = 0; i < miliseconds / 1000; i++) {
          if (i % milisecondsDivisor === 0) {
            const x = padding + milisecondsToPixel(i * 1000);
            startLineFrom(context, x, padding);
            drawLineTo(context, x, canvasHeight);
            context.stroke();
            context.font = '10px Albert Sans';
            context.fillStyle = rgba('white', 0.5);
            context.textAlign = 'center';
            context.fillText(`${i}s`, x, height);
          }
        }

        // define line style
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = rgba(theme.colors.blue[500], 1);

        // draw lines
        startLineFrom(context, padding, canvasHeight);
        drawLineTo(context, pxAttack, padding);
        drawLineTo(context, pxDecay, padding + 50);
        drawLineTo(context, pxRelease, canvasHeight);

        context.stroke();

        // draw circle time
        const elapsedTime = +new Date() - startTime;

        let circleX = 0;
        let circleY = 0;

        if (midi?.notesOn.length) {
          if (elapsedTime < attack) {
            const multiplier = elapsedTime / attack;
            circleX = padding + milisecondsToPixel(attack) * multiplier;
            circleY = canvasHeight - (canvasHeight - padding) * multiplier;
          } else if (elapsedTime < attack + decay) {
            const multiplier = (elapsedTime - attack) / decay;
            circleX = padding + milisecondsToPixel(attack) + milisecondsToPixel(decay) * multiplier;
            circleY = padding + 50 * multiplier;
          }
          drawCircleNote(context, circleX, circleY);
        }
      }
    }
  };

  useEffect(() => {
    let drawInterval: ReturnType<typeof setInterval> | null = null;
    drawInterval = setInterval(() => draw(), fps);
    return () => {
      if (drawInterval) clearInterval(drawInterval);
    };
  }, [midi, attack, decay, sustain, release]);

  return (
    <Styled.Container>
      <canvas ref={canvas} width={width} height={height} />
    </Styled.Container>
  );
};
