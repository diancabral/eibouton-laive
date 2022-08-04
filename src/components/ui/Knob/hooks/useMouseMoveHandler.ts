import { useEffect, useRef } from 'react';

export const useMouseMoveHandler = (callback: any, active: boolean) => {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const executeCallback = (e: MouseEvent) => {
    savedCallback.current(e);
  };

  useEffect(() => {
    if (active) window.addEventListener('mousemove', executeCallback);
    return () => window.removeEventListener('mousemove', executeCallback);
  }, [active]);
};
