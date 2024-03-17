import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerNotificationTypeUnSeenCountQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PartnerNotificationTypeUnSeenCountQueryResponse = { __typename?: 'Query' } & {
  partnerNotificationTypeUnSeenCount: Array<
    { __typename?: 'NotificationTypeUnSeenCount' } & Pick<Types.NotificationTypeUnSeenCount, 'count' | 'type'>
  >;
};

export const PartnerNotificationTypeUnSeenCountDocument = gql`
  query partnerNotificationTypeUnSeenCount {
    partnerNotificationTypeUnSeenCount {
      count
      type
    }
  }
`;
export function usePartnerNotificationTypeUnSeenCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PartnerNotificationTypeUnSeenCountQueryResponse,
    PartnerNotificationTypeUnSeenCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PartnerNotificationTypeUnSeenCountQueryResponse,
    PartnerNotificationTypeUnSeenCountQueryVariables
  >(PartnerNotificationTypeUnSeenCountDocument, options);
}
export function usePartnerNotificationTypeUnSeenCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerNotificationTypeUnSeenCountQueryResponse,
    PartnerNotificationTypeUnSeenCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PartnerNotificationTypeUnSeenCountQueryResponse,
    PartnerNotificationTypeUnSeenCountQueryVariables
  >(PartnerNotificationTypeUnSeenCountDocument, options);
}
export type PartnerNotificationTypeUnSeenCountQueryHookResult = ReturnType<
  typeof usePartnerNotificationTypeUnSeenCountQuery
>;
export type PartnerNotificationTypeUnSeenCountLazyQueryHookResult = ReturnType<
  typeof usePartnerNotificationTypeUnSeenCountLazyQuery
>;
export type PartnerNotificationTypeUnSeenCountQueryResult = Apollo.QueryResult<
  PartnerNotificationTypeUnSeenCountQueryResponse,
  PartnerNotificationTypeUnSeenCountQueryVariables
>;
