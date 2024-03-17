import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerOrdersQueryVariables = Types.Exact<{
  endDate?: Types.InputMaybe<Types.Scalars['String']>;
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  startDate?: Types.InputMaybe<Types.Scalars['String']>;
  statuses?: Types.InputMaybe<Array<Types.OrderStatusEnum> | Types.OrderStatusEnum>;
}>;

export type PartnerOrdersQueryResponse = { __typename?: 'Query' } & {
  partnerOrders: { __typename?: 'OrderConnection' } & {
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
          | 'userId'
        > & {
            product: Array<
              { __typename?: 'OrderProductEntity' } & Pick<
                Types.OrderProductEntity,
                | 'canReviewProduct'
                | 'createdAt'
                | 'id'
                | 'isNew'
                | 'name'
                | 'productId'
                | 'quantity'
                | 'total'
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
              { __typename?: 'OrderStatusEntity' } & Pick<
                Types.OrderStatusEntity,
                'createdAt' | 'id' | 'note' | 'orderId' | 'partnerId' | 'status' | 'userId'
              >
            >;
            user: { __typename?: 'UserEntity' } & Pick<Types.UserEntity, 'fullname' | 'id' | 'phone'> & {
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

export const PartnerOrdersDocument = gql`
  query partnerOrders(
    $endDate: String
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $startDate: String
    $statuses: [OrderStatusEnum!]
  ) {
    partnerOrders(
      endDate: $endDate
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      startDate: $startDate
      statuses: $statuses
    ) {
      items {
        code
        createdAt
        deletedAt
        discount
        id
        note
        partnerId
        product {
          avatar {
            ...MediaFragment
          }
          canReviewProduct
          createdAt
          id
          isNew
          name
          productId
          quantity
          total
          unitPrice
        }
        shippingFee
        status
        statusDetail {
          createdAt
          id
          note
          orderId
          partnerId
          status
          userId
        }
        total
        updatedAt
        user {
          avatar {
            ...MediaFragment
          }
          fullname
          id
          phone
        }
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
export function usePartnerOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<PartnerOrdersQueryResponse, PartnerOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerOrdersQueryResponse, PartnerOrdersQueryVariables>(PartnerOrdersDocument, options);
}
export function usePartnerOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerOrdersQueryResponse, PartnerOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerOrdersQueryResponse, PartnerOrdersQueryVariables>(PartnerOrdersDocument, options);
}
export type PartnerOrdersQueryHookResult = ReturnType<typeof usePartnerOrdersQuery>;
export type PartnerOrdersLazyQueryHookResult = ReturnType<typeof usePartnerOrdersLazyQuery>;
export type PartnerOrdersQueryResult = Apollo.QueryResult<PartnerOrdersQueryResponse, PartnerOrdersQueryVariables>;
