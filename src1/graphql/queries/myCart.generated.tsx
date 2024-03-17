import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type MyCartQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MyCartQueryResponse = { __typename?: 'Query' } & {
  myCart: { __typename?: 'CartEntity' } & Pick<
    Types.CartEntity,
    'createdAt' | 'id' | 'total' | 'updatedAt' | 'userId'
  > & {
      items: Array<
        { __typename?: 'CartItemEntity' } & Pick<
          Types.CartItemEntity,
          'cartId' | 'createdAt' | 'id' | 'productId' | 'quantity' | 'total' | 'updatedAt'
        > & {
            product: { __typename?: 'ProductEntity' } & Pick<
              Types.ProductEntity,
              'id' | 'isFixedCost' | 'isNew' | 'name' | 'quantity' | 'type' | 'unitPrice'
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
            store?: Types.Maybe<
              { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'fullname' | 'id'> & {
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
          }
      >;
    };
};

export const MyCartDocument = gql`
  query myCart {
    myCart {
      createdAt
      id
      items {
        cartId
        createdAt
        id
        product {
          avatar {
            ...MediaFragment
          }
          id
          isFixedCost
          isNew
          name
          quantity
          type
          unitPrice
        }
        productId
        quantity
        store {
          avatar {
            ...MediaFragment
          }
          fullname
          id
        }
        total
        updatedAt
      }
      total
      updatedAt
      userId
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function useMyCartQuery(baseOptions?: Apollo.QueryHookOptions<MyCartQueryResponse, MyCartQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyCartQueryResponse, MyCartQueryVariables>(MyCartDocument, options);
}
export function useMyCartLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyCartQueryResponse, MyCartQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyCartQueryResponse, MyCartQueryVariables>(MyCartDocument, options);
}
export type MyCartQueryHookResult = ReturnType<typeof useMyCartQuery>;
export type MyCartLazyQueryHookResult = ReturnType<typeof useMyCartLazyQuery>;
export type MyCartQueryResult = Apollo.QueryResult<MyCartQueryResponse, MyCartQueryVariables>;
