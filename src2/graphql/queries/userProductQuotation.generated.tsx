import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type UserProductQuotationQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type UserProductQuotationQueryResponse = { __typename?: 'Query' } & {
  userProductQuotation: { __typename?: 'ProductQuotationEntity' } & Pick<
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
      medias: Array<
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
      product: { __typename?: 'ProductEntity' } & Pick<
        Types.ProductEntity,
        | 'avatarId'
        | 'detail'
        | 'id'
        | 'isActive'
        | 'isFixedCost'
        | 'isNew'
        | 'name'
        | 'operatingNumber'
        | 'operatingUnit'
        | 'ordinalNumber'
        | 'partnerId'
        | 'quantity'
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
          partner?: Types.Maybe<
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
        };
    };
};

export const UserProductQuotationDocument = gql`
  query userProductQuotation($id: String!) {
    userProductQuotation(id: $id) {
      createdAt
      deletedAt
      detail
      id
      medias {
        ...MediaFragment
      }
      partnerId
      product {
        avatar {
          ...MediaFragment
        }
        avatarId
        detail
        id
        isActive
        isFixedCost
        isNew
        name
        operatingNumber
        operatingUnit
        ordinalNumber
        partner {
          avatar {
            ...MediaFragment
          }
          fullname
          id
        }
        partnerId
        quantity
        unitPrice
      }
      productId
      quantity
      response
      status
      updatedAt
      userId
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function useUserProductQuotationQuery(
  baseOptions: Apollo.QueryHookOptions<UserProductQuotationQueryResponse, UserProductQuotationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserProductQuotationQueryResponse, UserProductQuotationQueryVariables>(
    UserProductQuotationDocument,
    options,
  );
}
export function useUserProductQuotationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserProductQuotationQueryResponse, UserProductQuotationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserProductQuotationQueryResponse, UserProductQuotationQueryVariables>(
    UserProductQuotationDocument,
    options,
  );
}
export type UserProductQuotationQueryHookResult = ReturnType<typeof useUserProductQuotationQuery>;
export type UserProductQuotationLazyQueryHookResult = ReturnType<typeof useUserProductQuotationLazyQuery>;
export type UserProductQuotationQueryResult = Apollo.QueryResult<
  UserProductQuotationQueryResponse,
  UserProductQuotationQueryVariables
>;
