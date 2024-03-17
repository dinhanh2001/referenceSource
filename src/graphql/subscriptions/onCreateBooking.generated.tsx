import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type OnCreateBookingSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type OnCreateBookingSubscriptionResponse = { __typename?: 'Subscription' } & {
  onCreateBooking: { __typename?: 'BookingEntity' } & Pick<Types.BookingEntity, 'id'>;
};

export const OnCreateBookingDocument = gql`
  subscription onCreateBooking {
    onCreateBooking {
      id
    }
  }
`;
export function useOnCreateBookingSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    OnCreateBookingSubscriptionResponse,
    OnCreateBookingSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<OnCreateBookingSubscriptionResponse, OnCreateBookingSubscriptionVariables>(
    OnCreateBookingDocument,
    options,
  );
}
export type OnCreateBookingSubscriptionHookResult = ReturnType<typeof useOnCreateBookingSubscription>;
export type OnCreateBookingSubscriptionResult = Apollo.SubscriptionResult<OnCreateBookingSubscriptionResponse>;
