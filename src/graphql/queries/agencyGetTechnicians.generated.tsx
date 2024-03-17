import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type AgencyGetTechniciansQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type AgencyGetTechniciansQueryResponse = { __typename?: 'Query' } & {
  agencyGetTechnicians: { __typename?: 'PartnerConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'fullname' | 'id' | 'phone'> & {
            avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>>;
            qualifications?: Types.Maybe<
              Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
            >;
            reviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
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

export const AgencyGetTechniciansDocument = gql`
  query agencyGetTechnicians(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    agencyGetTechnicians(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
    ) {
      items {
        fullname
        id
        phone
        avatar {
          fullThumbUrl
        }
        qualifications {
          id
          isActive
          name
          type
        }
        reviewSummary {
          starAverage
          total
          percent
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
`;
export function useAgencyGetTechniciansQuery(
  baseOptions?: Apollo.QueryHookOptions<AgencyGetTechniciansQueryResponse, AgencyGetTechniciansQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AgencyGetTechniciansQueryResponse, AgencyGetTechniciansQueryVariables>(
    AgencyGetTechniciansDocument,
    options,
  );
}
export function useAgencyGetTechniciansLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AgencyGetTechniciansQueryResponse, AgencyGetTechniciansQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AgencyGetTechniciansQueryResponse, AgencyGetTechniciansQueryVariables>(
    AgencyGetTechniciansDocument,
    options,
  );
}
export type AgencyGetTechniciansQueryHookResult = ReturnType<typeof useAgencyGetTechniciansQuery>;
export type AgencyGetTechniciansLazyQueryHookResult = ReturnType<typeof useAgencyGetTechniciansLazyQuery>;
export type AgencyGetTechniciansQueryResult = Apollo.QueryResult<
  AgencyGetTechniciansQueryResponse,
  AgencyGetTechniciansQueryVariables
>;
