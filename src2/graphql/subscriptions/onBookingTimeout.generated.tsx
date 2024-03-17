import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type OnBookingTimeoutSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type OnBookingTimeoutSubscriptionResponse = { __typename?: 'Subscription' } & {
  onBookingTimeout: { __typename?: 'BookingEntity' } & Pick<Types.BookingEntity, 'id'>;
};

export const OnBookingTimeoutDocument = gql`
  subscription onBookingTimeout {
    onBookingTimeout {
      id
    }
  }
`;
export function useOnBookingTimeoutSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    OnBookingTimeoutSubscriptionResponse,
    OnBookingTimeoutSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<OnBookingTimeoutSubscriptionResponse, OnBookingTimeoutSubscriptionVariables>(
    OnBookingTimeoutDocument,
    options,
  );
}
export type OnBookingTimeoutSubscriptionHookResult = ReturnType<typeof useOnBookingTimeoutSubscription>;
export type OnBookingTimeoutSubscriptionResult = Apollo.SubscriptionResult<OnBookingTimeoutSubscriptionResponse>;
