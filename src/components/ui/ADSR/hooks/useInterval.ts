import { useEffect, useRef } from 'react';

export const useInterval = (callback: any, delay: number = 1000) => {
  const savedCallback = useRef<() => any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let interval = setInterval(() => savedCallback.current?.(), delay);
    return () => clearInterval(interval);
  }, [delay]);
};
