import { QueryClient } from 'react-query';

export function initReactQuery() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        structuralSharing: false,
        retry: false,
      },
    },
  });
}
