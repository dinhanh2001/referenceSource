import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerGetStoresQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type PartnerGetStoresQueryResponse = { __typename?: 'Query' } & {
  partnerGetStores: { __typename?: 'StoreConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'StoreEntity' } & Pick<
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
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const PartnerGetStoresDocument = gql`
  query partnerGetStores(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    partnerGetStores(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
    ) {
      items {
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
export function usePartnerGetStoresQuery(
  baseOptions?: Apollo.QueryHookOptions<PartnerGetStoresQueryResponse, PartnerGetStoresQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetStoresQueryResponse, PartnerGetStoresQueryVariables>(
    PartnerGetStoresDocument,
    options,
  );
}
export function usePartnerGetStoresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetStoresQueryResponse, PartnerGetStoresQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetStoresQueryResponse, PartnerGetStoresQueryVariables>(
    PartnerGetStoresDocument,
    options,
  );
}
export type PartnerGetStoresQueryHookResult = ReturnType<typeof usePartnerGetStoresQuery>;
export type PartnerGetStoresLazyQueryHookResult = ReturnType<typeof usePartnerGetStoresLazyQuery>;
export type PartnerGetStoresQueryResult = Apollo.QueryResult<
  PartnerGetStoresQueryResponse,
  PartnerGetStoresQueryVariables
>;
