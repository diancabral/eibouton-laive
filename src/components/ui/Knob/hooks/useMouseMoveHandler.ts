import { useEffect, useRef } from 'react';

export const useMouseMoveHandler = (callback: any, active: boolean) => {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (active) {
      window.addEventListener('mousemove', (e) => savedCallback.current(e));
    } else {
      window.removeEventListener('mousemove', (e) => savedCallback.current(e));
    }
  }, [active]);
};
