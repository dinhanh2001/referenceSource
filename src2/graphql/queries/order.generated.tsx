import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type OrderQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type OrderQueryResponse = { __typename?: 'Query' } & {
  order: { __typename?: 'OrderEntity' } & Pick<
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
    | 'userCanReview'
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
      partner?: Types.Maybe<
        { __typename?: 'OrderPartner' } & Pick<Types.OrderPartner, 'fullname' | 'id' | 'phone'> & {
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
            qualifications?: Types.Maybe<
              Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>
            >;
            reviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
            >;
          }
      >;
      product: Array<
        { __typename?: 'OrderProductEntity' } & Pick<
          Types.OrderProductEntity,
          | 'createdAt'
          | 'id'
          | 'productId'
          | 'isNew'
          | 'name'
          | 'orderId'
          | 'quantity'
          | 'unitPrice'
          | 'canReviewProduct'
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
          'id' | 'partnerId' | 'createdAt' | 'note' | 'status'
        > & {
            reasons?: Types.Maybe<
              Array<
                { __typename?: 'OrderStatusCategoryEntity' } & Pick<Types.OrderStatusCategoryEntity, 'name' | 'type'>
              >
            >;
          }
      >;
    };
};

export const OrderDocument = gql`
  query order($id: String!) {
    order(id: $id) {
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
      partner {
        avatar {
          ...MediaFragment
        }
        fullname
        id
        phone
        qualifications {
          id
          name
        }
        reviewSummary {
          percent
          starAverage
          total
        }
      }
      partnerId
      product {
        avatar {
          ...MediaFragment
        }
        createdAt
        id
        productId
        isNew
        name
        orderId
        quantity
        unitPrice
        canReviewProduct
      }
      shippingFee
      status
      total
      updatedAt
      userId
      userCanReview
      statusDetail {
        id
        partnerId
        createdAt
        reasons {
          name
          type
        }
        note
        status
      }
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function useOrderQuery(baseOptions: Apollo.QueryHookOptions<OrderQueryResponse, OrderQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrderQueryResponse, OrderQueryVariables>(OrderDocument, options);
}
export function useOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQueryResponse, OrderQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrderQueryResponse, OrderQueryVariables>(OrderDocument, options);
}
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderQueryResult = Apollo.QueryResult<OrderQueryResponse, OrderQueryVariables>;
