import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerGetStoreQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerGetStoreQueryResponse = { __typename?: 'Query' } & {
  partnerGetStore: { __typename?: 'StoreEntity' } & Pick<
    Types.StoreEntity,
    'id' | 'avatarId' | 'name' | 'address' | 'phoneNumber' | 'email' | 'description' | 'partnerId'
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

export const PartnerGetStoreDocument = gql`
  query partnerGetStore($id: String!) {
    partnerGetStore(id: $id) {
      id
      avatarId
      name
      address
      phoneNumber
      email
      description
      partnerId
      avatar {
        ...MediaFragment
      }
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function usePartnerGetStoreQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetStoreQueryResponse, PartnerGetStoreQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetStoreQueryResponse, PartnerGetStoreQueryVariables>(PartnerGetStoreDocument, options);
}
export function usePartnerGetStoreLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetStoreQueryResponse, PartnerGetStoreQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetStoreQueryResponse, PartnerGetStoreQueryVariables>(
    PartnerGetStoreDocument,
    options,
  );
}
export type PartnerGetStoreQueryHookResult = ReturnType<typeof usePartnerGetStoreQuery>;
export type PartnerGetStoreLazyQueryHookResult = ReturnType<typeof usePartnerGetStoreLazyQuery>;
export type PartnerGetStoreQueryResult = Apollo.QueryResult<
  PartnerGetStoreQueryResponse,
  PartnerGetStoreQueryVariables
>;
