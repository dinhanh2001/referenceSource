import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerNotificationsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isSeen?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  type: Types.NotificationTypeEnum;
}>;

export type PartnerNotificationsQueryResponse = { __typename?: 'Query' } & {
  partnerNotifications: { __typename?: 'NotificationConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'NotificationEntity' } & Pick<
          Types.NotificationEntity,
          | 'body'
          | 'createdAt'
          | 'deletedAt'
          | 'executeTime'
          | 'id'
          | 'isActive'
          | 'objectId'
          | 'objectType'
          | 'seen'
          | 'sourceId'
          | 'sourceType'
          | 'targetId'
          | 'targetType'
          | 'title'
          | 'updatedAt'
        >
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const PartnerNotificationsDocument = gql`
  query partnerNotifications(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $isSeen: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $type: NotificationTypeEnum!
  ) {
    partnerNotifications(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      isSeen: $isSeen
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      type: $type
    ) {
      items {
        body
        createdAt
        deletedAt
        executeTime
        id
        isActive
        objectId
        objectType
        seen
        sourceId
        sourceType
        targetId
        targetType
        title
        updatedAt
      }
      meta {
        currentPage
        itemCount
        itemsPerPage
        totalItems
        totalPages
      }
    }
  }
`;
export function usePartnerNotificationsQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerNotificationsQueryResponse, PartnerNotificationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerNotificationsQueryResponse, PartnerNotificationsQueryVariables>(
    PartnerNotificationsDocument,
    options,
  );
}
export function usePartnerNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerNotificationsQueryResponse, PartnerNotificationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerNotificationsQueryResponse, PartnerNotificationsQueryVariables>(
    PartnerNotificationsDocument,
    options,
  );
}
export type PartnerNotificationsQueryHookResult = ReturnType<typeof usePartnerNotificationsQuery>;
export type PartnerNotificationsLazyQueryHookResult = ReturnType<typeof usePartnerNotificationsLazyQuery>;
export type PartnerNotificationsQueryResult = Apollo.QueryResult<
  PartnerNotificationsQueryResponse,
  PartnerNotificationsQueryVariables
>;
