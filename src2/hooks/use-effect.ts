import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

// type EffectCallback = () => (void | Destructor);

export const useEffectAfterMount = (cb: EffectCallback, dependencies?: DependencyList) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return cb();
    }
    mounted.current = true;
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useEffectOnce = (cb: EffectCallback) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      cb();
    }
    mounted.current = true;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
