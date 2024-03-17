import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetReferencesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type PartnerGetReferencesQueryResponse = { __typename?: 'Query' } & {
  partnerGetReferences: { __typename?: 'ReferenceConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ReferenceEntity' } & Pick<
          Types.ReferenceEntity,
          'id' | 'name' | 'description' | 'isActive' | 'createdAt'
        > & {
            documents?: Types.Maybe<
              Array<
                { __typename?: 'DocumentEntity' } & Pick<Types.DocumentEntity, 'name'> & {
                    files: Array<{ __typename?: 'Media' } & Pick<Types.Media, 'name' | 'fullOriginalUrl'>>;
                  }
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

export const PartnerGetReferencesDocument = gql`
  query partnerGetReferences(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    partnerGetReferences(
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
        name
        description
        isActive
        documents {
          name
          files {
            name
            fullOriginalUrl
          }
        }
        createdAt
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
`;
export function usePartnerGetReferencesQuery(
  baseOptions?: Apollo.QueryHookOptions<PartnerGetReferencesQueryResponse, PartnerGetReferencesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetReferencesQueryResponse, PartnerGetReferencesQueryVariables>(
    PartnerGetReferencesDocument,
    options,
  );
}
export function usePartnerGetReferencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetReferencesQueryResponse, PartnerGetReferencesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetReferencesQueryResponse, PartnerGetReferencesQueryVariables>(
    PartnerGetReferencesDocument,
    options,
  );
}
export type PartnerGetReferencesQueryHookResult = ReturnType<typeof usePartnerGetReferencesQuery>;
export type PartnerGetReferencesLazyQueryHookResult = ReturnType<typeof usePartnerGetReferencesLazyQuery>;
export type PartnerGetReferencesQueryResult = Apollo.QueryResult<
  PartnerGetReferencesQueryResponse,
  PartnerGetReferencesQueryVariables
>;
