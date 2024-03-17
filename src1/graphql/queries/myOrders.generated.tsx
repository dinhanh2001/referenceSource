import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type MyOrdersQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  statuses?: Types.InputMaybe<Array<Types.OrderStatusEnum> | Types.OrderStatusEnum>;
}>;

export type MyOrdersQueryResponse = { __typename?: 'Query' } & {
  myOrders: { __typename?: 'OrderConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'OrderEntity' } & Pick<
          Types.OrderEntity,
          | 'code'
          | 'createdAt'
          | 'deletedAt'
          | 'discount'
          | 'id'
          | 'note'
          | 'partnerId'
          | 'shippingFee'
          | 'status'
          | 'total'
          | 'updatedAt'
          | 'userCanReview'
        > & {
            partner?: Types.Maybe<
              { __typename?: 'OrderPartner' } & Pick<Types.OrderPartner, 'createdAt' | 'fullname' | 'id'> & {
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
            product: Array<
              { __typename?: 'OrderProductEntity' } & Pick<
                Types.OrderProductEntity,
                | 'canReviewProduct'
                | 'createdAt'
                | 'id'
                | 'isNew'
                | 'name'
                | 'operatingNumber'
                | 'operatingUnit'
                | 'orderId'
                | 'ordinalNumber'
                | 'partNumber'
                | 'productId'
                | 'quantity'
                | 'type'
                | 'unitPrice'
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
            >;
            statusDetail?: Types.Maybe<
              { __typename?: 'OrderStatusEntity' } & Pick<Types.OrderStatusEntity, 'createdAt' | 'id' | 'status'>
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

export const MyOrdersDocument = gql`
  query myOrders(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $statuses: [OrderStatusEnum!]
  ) {
    myOrders(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      statuses: $statuses
    ) {
      items {
        code
        createdAt
        deletedAt
        discount
        id
        note
        partner {
          avatar {
            ...MediaFragment
          }
          createdAt
          fullname
          id
        }
        partnerId
        product {
          canReviewProduct
          createdAt
          id
          isNew
          name
          operatingNumber
          operatingUnit
          orderId
          ordinalNumber
          partNumber
          productId
          quantity
          type
          unitPrice
          avatar {
            ...MediaFragment
          }
        }
        shippingFee
        status
        total
        updatedAt
        userCanReview
        statusDetail {
          createdAt
          id
          status
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
export function useMyOrdersQuery(baseOptions?: Apollo.QueryHookOptions<MyOrdersQueryResponse, MyOrdersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyOrdersQueryResponse, MyOrdersQueryVariables>(MyOrdersDocument, options);
}
export function useMyOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyOrdersQueryResponse, MyOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyOrdersQueryResponse, MyOrdersQueryVariables>(MyOrdersDocument, options);
}
export type MyOrdersQueryHookResult = ReturnType<typeof useMyOrdersQuery>;
export type MyOrdersLazyQueryHookResult = ReturnType<typeof useMyOrdersLazyQuery>;
export type MyOrdersQueryResult = Apollo.QueryResult<MyOrdersQueryResponse, MyOrdersQueryVariables>;
