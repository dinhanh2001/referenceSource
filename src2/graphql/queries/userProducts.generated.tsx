import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { ProductFragmentFragmentDoc } from '../fragments/productFragment.generated';

const defaultOptions = {} as const;
export type UserProductsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isAdmin?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isNew?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  manufacturerIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  modelIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  originIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  partnerId?: Types.InputMaybe<Types.Scalars['String']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  type?: Types.InputMaybe<Types.ProductTypeEnum>;
  vehicleTypeIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  excludeProductIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;

export type UserProductsQueryResponse = { __typename?: 'Query' } & {
  userProducts: { __typename?: 'ProductConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ProductEntity' } & Pick<
          Types.ProductEntity,
          | 'createdAt'
          | 'detail'
          | 'id'
          | 'isFixedCost'
          | 'isNew'
          | 'name'
          | 'operatingNumber'
          | 'operatingUnit'
          | 'ordinalNumber'
          | 'partnerId'
          | 'quantity'
          | 'serialNumber'
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
            reviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'total' | 'starAverage' | 'percent'>
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

export const UserProductsDocument = gql`
  query userProducts(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isAdmin: Boolean
    $isApproved: Boolean
    $isNew: Boolean
    $limit: Int
    $manufacturerIds: [String!]
    $modelIds: [String!]
    $originIds: [String!]
    $page: Int
    $partnerId: String
    $search: String
    $sort: SortInput
    $type: ProductTypeEnum
    $vehicleTypeIds: [String!]
    $excludeProductIds: [String!]
  ) {
    userProducts(
      excludeProductIds: $excludeProductIds
      filters: $filters
      isActive: $isActive
      isAdmin: $isAdmin
      isApproved: $isApproved
      isNew: $isNew
      limit: $limit
      manufacturerIds: $manufacturerIds
      modelIds: $modelIds
      originIds: $originIds
      page: $page
      partnerId: $partnerId
      search: $search
      sort: $sort
      type: $type
      vehicleTypeIds: $vehicleTypeIds
    ) {
      items {
        ...ProductFragment
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
  ${ProductFragmentFragmentDoc}
`;
export function useUserProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<UserProductsQueryResponse, UserProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserProductsQueryResponse, UserProductsQueryVariables>(UserProductsDocument, options);
}
export function useUserProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserProductsQueryResponse, UserProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserProductsQueryResponse, UserProductsQueryVariables>(UserProductsDocument, options);
}
export type UserProductsQueryHookResult = ReturnType<typeof useUserProductsQuery>;
export type UserProductsLazyQueryHookResult = ReturnType<typeof useUserProductsLazyQuery>;
export type UserProductsQueryResult = Apollo.QueryResult<UserProductsQueryResponse, UserProductsQueryVariables>;
