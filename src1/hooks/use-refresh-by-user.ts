import { useState } from 'react';

export function useRefreshByUser(refetch: () => void) {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);

  function refetchByUser() {
    setIsRefetchingByUser(true);
    try {
      refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  };
}
