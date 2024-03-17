import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerProductQuotationsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  partnerId?: Types.InputMaybe<Types.Scalars['String']>;
  productId?: Types.InputMaybe<Types.Scalars['String']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  status?: Types.InputMaybe<Types.ProductQuotationStatusEnum>;
  userId?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type PartnerProductQuotationsQueryResponse = { __typename?: 'Query' } & {
  partnerProductQuotations: { __typename?: 'ProductQuotationConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ProductQuotationEntity' } & Pick<
          Types.ProductQuotationEntity,
          'createdAt' | 'detail' | 'id' | 'partnerId' | 'quantity' | 'response' | 'status' | 'updatedAt'
        > & {
            product: { __typename?: 'ProductEntity' } & Pick<
              Types.ProductEntity,
              'id' | 'isFixedCost' | 'isNew' | 'name' | 'quantity'
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
              };
            user: { __typename?: 'UserEntity' } & Pick<Types.UserEntity, 'id' | 'fullname'> & {
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
              };
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const PartnerProductQuotationsDocument = gql`
  query partnerProductQuotations(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $partnerId: String
    $productId: String
    $search: String
    $sort: SortInput
    $status: ProductQuotationStatusEnum
    $userId: String
  ) {
    partnerProductQuotations(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      partnerId: $partnerId
      productId: $productId
      search: $search
      sort: $sort
      status: $status
      userId: $userId
    ) {
      items {
        createdAt
        detail
        id
        partnerId
        product {
          avatar {
            ...MediaFragment
          }
          id
          isFixedCost
          isNew
          name
          quantity
        }
        quantity
        response
        status
        updatedAt
        user {
          id
          avatar {
            ...MediaFragment
          }
          fullname
        }
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
export function usePartnerProductQuotationsQuery(
  baseOptions?: Apollo.QueryHookOptions<PartnerProductQuotationsQueryResponse, PartnerProductQuotationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerProductQuotationsQueryResponse, PartnerProductQuotationsQueryVariables>(
    PartnerProductQuotationsDocument,
    options,
  );
}
export function usePartnerProductQuotationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerProductQuotationsQueryResponse,
    PartnerProductQuotationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerProductQuotationsQueryResponse, PartnerProductQuotationsQueryVariables>(
    PartnerProductQuotationsDocument,
    options,
  );
}
export type PartnerProductQuotationsQueryHookResult = ReturnType<typeof usePartnerProductQuotationsQuery>;
export type PartnerProductQuotationsLazyQueryHookResult = ReturnType<typeof usePartnerProductQuotationsLazyQuery>;
export type PartnerProductQuotationsQueryResult = Apollo.QueryResult<
  PartnerProductQuotationsQueryResponse,
  PartnerProductQuotationsQueryVariables
>;
