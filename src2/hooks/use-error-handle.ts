import { useCallback } from 'react';
import { ApolloError } from '@apollo/client';

import { useOverlay } from '../contexts/overlay-content';
import { extractGraphQLErrorMessage } from '../helpers';

export const useErrorHandler = () => {
  const { showDialog } = useOverlay();

  const showErrorDialog = useCallback(
    (timeout = 1000) =>
      (errors: ApolloError) => {
        const message = extractGraphQLErrorMessage(errors);

        if (message != null) {
          setTimeout(() => {
            showDialog({
              type: 'ALERT',
              message: message,
              title: 'Có lỗi xảy ra!',
            });
          }, timeout);
        }
      },
    [showDialog],
  );

  return {
    showErrorDialog,
  };
};
