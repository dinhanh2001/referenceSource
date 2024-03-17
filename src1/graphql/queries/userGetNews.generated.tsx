import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetNewsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type UserGetNewsQueryResponse = { __typename?: 'Query' } & {
  userGetNews: { __typename?: 'NewsConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'NewsEntity' } & Pick<
          Types.NewsEntity,
          'createdAt' | 'id' | 'description' | 'isActive' | 'mediaId' | 'title'
        > & { media: { __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'> }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const UserGetNewsDocument = gql`
  query userGetNews(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    userGetNews(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
    ) {
      items {
        createdAt
        id
        description
        isActive
        media {
          fullOriginalUrl
          fullThumbUrl
          id
        }
        mediaId
        title
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
export function useUserGetNewsQuery(
  baseOptions?: Apollo.QueryHookOptions<UserGetNewsQueryResponse, UserGetNewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetNewsQueryResponse, UserGetNewsQueryVariables>(UserGetNewsDocument, options);
}
export function useUserGetNewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserGetNewsQueryResponse, UserGetNewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetNewsQueryResponse, UserGetNewsQueryVariables>(UserGetNewsDocument, options);
}
export type UserGetNewsQueryHookResult = ReturnType<typeof useUserGetNewsQuery>;
export type UserGetNewsLazyQueryHookResult = ReturnType<typeof useUserGetNewsLazyQuery>;
export type UserGetNewsQueryResult = Apollo.QueryResult<UserGetNewsQueryResponse, UserGetNewsQueryVariables>;
