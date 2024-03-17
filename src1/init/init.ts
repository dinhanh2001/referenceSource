import { QueryClient } from 'react-query';

import { i18nInit } from '../i18n';

import { initDeviceId } from './init-device-id';
import { initReactQuery } from './react-query';

export async function init() {
  const reactQuery = initReactQuery();
  await i18nInit();
  await initDeviceId();

  return { reactQuery };
}

export type InitApp = {
  reactQuery: QueryClient;
};
