import { useEffect, useRef } from 'react';

export function usePrevious<T = undefined>(value: T | undefined) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
