import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetStoreHistoryQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  storeId: Types.Scalars['String'];
  type: Types.StoreProductTypeEnum;
}>;

export type PartnerGetStoreHistoryQueryResponse = { __typename?: 'Query' } & {
  partnerGetStoreHistory: { __typename?: 'StoreProductHistoryConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'StoreProductHistoryEntity' } & Pick<
          Types.StoreProductHistoryEntity,
          'id' | 'storeId' | 'productId' | 'quantity' | 'inputDate'
        > & { product: { __typename?: 'ProductEntity' } & Pick<Types.ProductEntity, 'name'> }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const PartnerGetStoreHistoryDocument = gql`
  query partnerGetStoreHistory(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $storeId: String!
    $type: StoreProductTypeEnum!
  ) {
    partnerGetStoreHistory(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      storeId: $storeId
      type: $type
    ) {
      items {
        id
        storeId
        productId
        product {
          name
        }
        quantity
        inputDate
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
export function usePartnerGetStoreHistoryQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetStoreHistoryQueryResponse, PartnerGetStoreHistoryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetStoreHistoryQueryResponse, PartnerGetStoreHistoryQueryVariables>(
    PartnerGetStoreHistoryDocument,
    options,
  );
}
export function usePartnerGetStoreHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetStoreHistoryQueryResponse, PartnerGetStoreHistoryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetStoreHistoryQueryResponse, PartnerGetStoreHistoryQueryVariables>(
    PartnerGetStoreHistoryDocument,
    options,
  );
}
export type PartnerGetStoreHistoryQueryHookResult = ReturnType<typeof usePartnerGetStoreHistoryQuery>;
export type PartnerGetStoreHistoryLazyQueryHookResult = ReturnType<typeof usePartnerGetStoreHistoryLazyQuery>;
export type PartnerGetStoreHistoryQueryResult = Apollo.QueryResult<
  PartnerGetStoreHistoryQueryResponse,
  PartnerGetStoreHistoryQueryVariables
>;
