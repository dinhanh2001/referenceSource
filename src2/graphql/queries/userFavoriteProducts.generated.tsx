import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type UserFavoriteProductsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type UserFavoriteProductsQueryResponse = { __typename?: 'Query' } & {
  userFavoriteProducts: { __typename?: 'ProductConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ProductEntity' } & Pick<
          Types.ProductEntity,
          | 'createdAt'
          | 'deletedAt'
          | 'id'
          | 'isActive'
          | 'isFixedCost'
          | 'isNew'
          | 'name'
          | 'quantity'
          | 'type'
          | 'unitPrice'
          | 'updatedAt'
        > & {
            avatar?: Types.Maybe<
              { __typename?: 'Media' } & Pick<
                Types.Media,
                | 'createdAt'
                | 'fileSize'
                | 'fullOriginalUrl'
                | 'fullThumbUrl'
                | 'id'
                | 'isDeleted'
                | 'mimeType'
                | 'name'
                | 'originalUrl'
                | 'ownerId'
                | 'thumbUrl'
                | 'type'
                | 'updatedAt'
                | 'videoUrl'
              >
            >;
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const UserFavoriteProductsDocument = gql`
  query userFavoriteProducts(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    userFavoriteProducts(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
    ) {
      items {
        avatar {
          ...MediaFragment
        }
        createdAt
        deletedAt
        id
        isActive
        isFixedCost
        isNew
        name
        quantity
        type
        unitPrice
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
  ${MediaFragmentFragmentDoc}
`;
export function useUserFavoriteProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<UserFavoriteProductsQueryResponse, UserFavoriteProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserFavoriteProductsQueryResponse, UserFavoriteProductsQueryVariables>(
    UserFavoriteProductsDocument,
    options,
  );
}
export function useUserFavoriteProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserFavoriteProductsQueryResponse, UserFavoriteProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserFavoriteProductsQueryResponse, UserFavoriteProductsQueryVariables>(
    UserFavoriteProductsDocument,
    options,
  );
}
export type UserFavoriteProductsQueryHookResult = ReturnType<typeof useUserFavoriteProductsQuery>;
export type UserFavoriteProductsLazyQueryHookResult = ReturnType<typeof useUserFavoriteProductsLazyQuery>;
export type UserFavoriteProductsQueryResult = Apollo.QueryResult<
  UserFavoriteProductsQueryResponse,
  UserFavoriteProductsQueryVariables
>;
