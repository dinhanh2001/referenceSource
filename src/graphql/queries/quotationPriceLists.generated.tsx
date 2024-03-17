import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type QuotationPriceListsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  productName?: Types.InputMaybe<Types.Scalars['String']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type QuotationPriceListsQueryResponse = { __typename?: 'Query' } & {
  quotationPriceLists: { __typename?: 'QuotationPriceListConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'QuotationPriceListEntity' } & Pick<
          Types.QuotationPriceListEntity,
          | 'accessoriesName'
          | 'createdAt'
          | 'deletedAt'
          | 'diagnosticCode'
          | 'expense'
          | 'fixable'
          | 'id'
          | 'isActive'
          | 'updatedAt'
          | 'vehicleType'
          | 'workingCode'
          | 'workingHour'
        >
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const QuotationPriceListsDocument = gql`
  query quotationPriceLists(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $productName: String
    $search: String
    $sort: SortInput
  ) {
    quotationPriceLists(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      productName: $productName
      search: $search
      sort: $sort
    ) {
      items {
        accessoriesName
        createdAt
        deletedAt
        diagnosticCode
        expense
        fixable
        id
        isActive
        updatedAt
        vehicleType
        workingCode
        workingHour
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
export function useQuotationPriceListsQuery(
  baseOptions?: Apollo.QueryHookOptions<QuotationPriceListsQueryResponse, QuotationPriceListsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<QuotationPriceListsQueryResponse, QuotationPriceListsQueryVariables>(
    QuotationPriceListsDocument,
    options,
  );
}
export function useQuotationPriceListsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<QuotationPriceListsQueryResponse, QuotationPriceListsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<QuotationPriceListsQueryResponse, QuotationPriceListsQueryVariables>(
    QuotationPriceListsDocument,
    options,
  );
}
export type QuotationPriceListsQueryHookResult = ReturnType<typeof useQuotationPriceListsQuery>;
export type QuotationPriceListsLazyQueryHookResult = ReturnType<typeof useQuotationPriceListsLazyQuery>;
export type QuotationPriceListsQueryResult = Apollo.QueryResult<
  QuotationPriceListsQueryResponse,
  QuotationPriceListsQueryVariables
>;
