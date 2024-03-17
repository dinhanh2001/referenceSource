import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserNotificationsQueryVariables = Types.Exact<{
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

export type UserNotificationsQueryResponse = { __typename?: 'Query' } & {
  userNotifications: { __typename?: 'NotificationConnection' } & {
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

export const UserNotificationsDocument = gql`
  query userNotifications(
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
    userNotifications(
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
export function useUserNotificationsQuery(
  baseOptions: Apollo.QueryHookOptions<UserNotificationsQueryResponse, UserNotificationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserNotificationsQueryResponse, UserNotificationsQueryVariables>(
    UserNotificationsDocument,
    options,
  );
}
export function useUserNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserNotificationsQueryResponse, UserNotificationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserNotificationsQueryResponse, UserNotificationsQueryVariables>(
    UserNotificationsDocument,
    options,
  );
}
export type UserNotificationsQueryHookResult = ReturnType<typeof useUserNotificationsQuery>;
export type UserNotificationsLazyQueryHookResult = ReturnType<typeof useUserNotificationsLazyQuery>;
export type UserNotificationsQueryResult = Apollo.QueryResult<
  UserNotificationsQueryResponse,
  UserNotificationsQueryVariables
>;
