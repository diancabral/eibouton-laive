import { rgba } from 'polished';
import { useEffect, useRef, useState } from 'react';
import { Canvas, clearCanvasScreen, drawLineTo, setCanvasScale, startLineFrom } from '../../../utils/canvas';
import { useInterval } from '../../ui/ADSR/hooks/useInterval';
import { Wrapper } from '../../ui/Wrapper/Wrapper';

import * as Styled from './styled';

export const PianoRoll = () => {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [getWidth, setWidth] = useState(0);
  const [getHeight, setHeight] = useState(0);

  const [yScale, setYScale] = useState(1);
  const [xScale, setXScale] = useState(1);

  const keysContainerWidth = 100;
  const keyWidth = 20;

  const draw = () => {
    if (canvasRef.current) {
      const canvas = new Canvas({
        element: canvasRef.current,
        scale: 2,
        width: getWidth,
        height: getHeight,
      });

      canvas.drawLine(({ context, from, to }) => {
        context.lineWidth = 1;
        context.strokeStyle = rgba('black', 0.2);
        from(keysContainerWidth, 0);
        to(keysContainerWidth, getHeight);
      });
    }
  };

  useInterval(() => {
    draw();
  }, 1000 / 60);

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
