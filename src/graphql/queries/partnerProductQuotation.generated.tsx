import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerProductQuotationQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerProductQuotationQueryResponse = { __typename?: 'Query' } & {
  partnerProductQuotation: { __typename?: 'ProductQuotationEntity' } & Pick<
    Types.ProductQuotationEntity,
    | 'createdAt'
    | 'deletedAt'
    | 'detail'
    | 'id'
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
        'avatarId' | 'createdAt' | 'id' | 'isFixedCost' | 'isNew' | 'name' | 'quantity'
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
      user: { __typename?: 'UserEntity' } & Pick<Types.UserEntity, 'fullname' | 'id'> & {
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
      partner: { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'fullname' | 'id'> & {
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

export const PartnerProductQuotationDocument = gql`
  query partnerProductQuotation($id: String!) {
    partnerProductQuotation(id: $id) {
      createdAt
      deletedAt
      detail
      id
      medias {
        ...MediaFragment
      }
      product {
        avatar {
          ...MediaFragment
        }
        avatarId
        createdAt
        id
        isFixedCost
        isNew
        name
        quantity
      }
      productId
      quantity
      response
      status
      updatedAt
      user {
        avatar {
          ...MediaFragment
        }
        fullname
        id
      }
      partner {
        avatar {
          ...MediaFragment
        }
        fullname
        id
      }
      userId
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function usePartnerProductQuotationQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerProductQuotationQueryResponse, PartnerProductQuotationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerProductQuotationQueryResponse, PartnerProductQuotationQueryVariables>(
    PartnerProductQuotationDocument,
    options,
  );
}
export function usePartnerProductQuotationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerProductQuotationQueryResponse,
    PartnerProductQuotationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerProductQuotationQueryResponse, PartnerProductQuotationQueryVariables>(
    PartnerProductQuotationDocument,
    options,
  );
}
export type PartnerProductQuotationQueryHookResult = ReturnType<typeof usePartnerProductQuotationQuery>;
export type PartnerProductQuotationLazyQueryHookResult = ReturnType<typeof usePartnerProductQuotationLazyQuery>;
export type PartnerProductQuotationQueryResult = Apollo.QueryResult<
  PartnerProductQuotationQueryResponse,
  PartnerProductQuotationQueryVariables
>;
