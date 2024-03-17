import { useEffect, useState } from 'react';

import { init, InitApp } from './init';

export function useInit() {
  const [initResult, setInitResult] = useState<InitApp>();

  useEffect(() => {
    init().then(setInitResult);
  }, []);

  return initResult;
}
