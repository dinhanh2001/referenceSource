import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetStoreProductQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  storeId: Types.Scalars['String'];
}>;

export type PartnerGetStoreProductQueryResponse = { __typename?: 'Query' } & {
  partnerGetStoreProduct: { __typename?: 'StoreProductConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'StoreProductEntity' } & Pick<
          Types.StoreProductEntity,
          'id' | 'storeId' | 'productId' | 'quantity'
        > & { product: { __typename?: 'ProductEntity' } & Pick<Types.ProductEntity, 'name'> }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const PartnerGetStoreProductDocument = gql`
  query partnerGetStoreProduct(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $storeId: String!
  ) {
    partnerGetStoreProduct(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      storeId: $storeId
    ) {
      items {
        id
        storeId
        productId
        product {
          name
        }
        quantity
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
export function usePartnerGetStoreProductQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetStoreProductQueryResponse, PartnerGetStoreProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetStoreProductQueryResponse, PartnerGetStoreProductQueryVariables>(
    PartnerGetStoreProductDocument,
    options,
  );
}
export function usePartnerGetStoreProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetStoreProductQueryResponse, PartnerGetStoreProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetStoreProductQueryResponse, PartnerGetStoreProductQueryVariables>(
    PartnerGetStoreProductDocument,
    options,
  );
}
export type PartnerGetStoreProductQueryHookResult = ReturnType<typeof usePartnerGetStoreProductQuery>;
export type PartnerGetStoreProductLazyQueryHookResult = ReturnType<typeof usePartnerGetStoreProductLazyQuery>;
export type PartnerGetStoreProductQueryResult = Apollo.QueryResult<
  PartnerGetStoreProductQueryResponse,
  PartnerGetStoreProductQueryVariables
>;
