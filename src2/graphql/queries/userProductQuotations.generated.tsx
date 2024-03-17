import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type UserProductQuotationsQueryVariables = Types.Exact<{
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

export type UserProductQuotationsQueryResponse = { __typename?: 'Query' } & {
  userProductQuotations: { __typename?: 'ProductQuotationConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ProductQuotationEntity' } & Pick<
          Types.ProductQuotationEntity,
          | 'createdAt'
          | 'deletedAt'
          | 'detail'
          | 'id'
          | 'partnerId'
          | 'productId'
          | 'quantity'
          | 'response'
          | 'status'
          | 'updatedAt'
          | 'userId'
        > & {
            product: { __typename?: 'ProductEntity' } & Pick<
              Types.ProductEntity,
              'createdAt' | 'id' | 'isFixedCost' | 'isNew' | 'name' | 'unitPrice'
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
                partner?: Types.Maybe<
                  { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'id' | 'fullname'> & {
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

export const UserProductQuotationsDocument = gql`
  query userProductQuotations(
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
    userProductQuotations(
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
        deletedAt
        detail
        id
        partnerId
        product {
          avatar {
            ...MediaFragment
          }
          createdAt
          id
          isFixedCost
          isNew
          name
          unitPrice
          partner {
            id
            avatar {
              ...MediaFragment
            }
            fullname
          }
        }
        productId
        quantity
        response
        status
        updatedAt
        userId
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
export function useUserProductQuotationsQuery(
  baseOptions?: Apollo.QueryHookOptions<UserProductQuotationsQueryResponse, UserProductQuotationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserProductQuotationsQueryResponse, UserProductQuotationsQueryVariables>(
    UserProductQuotationsDocument,
    options,
  );
}
export function useUserProductQuotationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserProductQuotationsQueryResponse, UserProductQuotationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserProductQuotationsQueryResponse, UserProductQuotationsQueryVariables>(
    UserProductQuotationsDocument,
    options,
  );
}
export type UserProductQuotationsQueryHookResult = ReturnType<typeof useUserProductQuotationsQuery>;
export type UserProductQuotationsLazyQueryHookResult = ReturnType<typeof useUserProductQuotationsLazyQuery>;
export type UserProductQuotationsQueryResult = Apollo.QueryResult<
  UserProductQuotationsQueryResponse,
  UserProductQuotationsQueryVariables
>;
