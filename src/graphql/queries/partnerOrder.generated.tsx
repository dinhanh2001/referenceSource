import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerOrderQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerOrderQueryResponse = { __typename?: 'Query' } & {
  partnerOrder: { __typename?: 'OrderEntity' } & Pick<
    Types.OrderEntity,
    | 'code'
    | 'createdAt'
    | 'deletedAt'
    | 'discount'
    | 'id'
    | 'note'
    | 'shippingFee'
    | 'status'
    | 'total'
    | 'updatedAt'
    | 'userId'
  > & {
      address?: Types.Maybe<
        { __typename?: 'OrderAddressEntity' } & Pick<
          Types.OrderAddressEntity,
          | 'addressDetail'
          | 'addressName'
          | 'contactName'
          | 'contactPhone'
          | 'createdAt'
          | 'deletedAt'
          | 'id'
          | 'latitude'
          | 'longitude'
          | 'mapAddress'
          | 'updatedAt'
        >
      >;
      product: Array<
        { __typename?: 'OrderProductEntity' } & Pick<
          Types.OrderProductEntity,
          | 'avatarId'
          | 'canReviewProduct'
          | 'createdAt'
          | 'deletedAt'
          | 'id'
          | 'isNew'
          | 'name'
          | 'quantity'
          | 'total'
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
        { __typename?: 'OrderStatusEntity' } & Pick<
          Types.OrderStatusEntity,
          'id' | 'note' | 'orderId' | 'partnerId' | 'status' | 'userId'
        > & {
            reasons?: Types.Maybe<
              Array<
                { __typename?: 'OrderStatusCategoryEntity' } & Pick<
                  Types.OrderStatusCategoryEntity,
                  'createdAt' | 'id' | 'name' | 'orderStatusId' | 'type'
                >
              >
            >;
          }
      >;
      user: { __typename?: 'UserEntity' } & Pick<
        Types.UserEntity,
        | 'address'
        | 'avatarId'
        | 'email'
        | 'fullname'
        | 'id'
        | 'isActive'
        | 'phone'
        | 'star'
        | 'totalBookings'
        | 'totalMaintenanceRequests'
        | 'totalOrders'
        | 'totalSpending'
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
    };
};

export const PartnerOrderDocument = gql`
  query partnerOrder($id: String!) {
    partnerOrder(id: $id) {
      address {
        addressDetail
        addressName
        contactName
        contactPhone
        createdAt
        deletedAt
        id
        latitude
        longitude
        mapAddress
        updatedAt
      }
      code
      createdAt
      deletedAt
      discount
      id
      note
      product {
        avatar {
          ...MediaFragment
        }
        avatarId
        canReviewProduct
        createdAt
        deletedAt
        id
        isNew
        name
        quantity
        total
        type
        unitPrice
      }
      shippingFee
      status
      statusDetail {
        id
        note
        orderId
        partnerId
        reasons {
          createdAt
          id
          name
          orderStatusId
          type
        }
        status
        userId
      }
      total
      updatedAt
      user {
        address
        avatar {
          ...MediaFragment
        }
        avatarId
        email
        fullname
        id
        isActive
        phone
        star
        totalBookings
        totalMaintenanceRequests
        totalOrders
        totalSpending
      }
      userId
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function usePartnerOrderQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerOrderQueryResponse, PartnerOrderQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerOrderQueryResponse, PartnerOrderQueryVariables>(PartnerOrderDocument, options);
}
export function usePartnerOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerOrderQueryResponse, PartnerOrderQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerOrderQueryResponse, PartnerOrderQueryVariables>(PartnerOrderDocument, options);
}
export type PartnerOrderQueryHookResult = ReturnType<typeof usePartnerOrderQuery>;
export type PartnerOrderLazyQueryHookResult = ReturnType<typeof usePartnerOrderLazyQuery>;
export type PartnerOrderQueryResult = Apollo.QueryResult<PartnerOrderQueryResponse, PartnerOrderQueryVariables>;
