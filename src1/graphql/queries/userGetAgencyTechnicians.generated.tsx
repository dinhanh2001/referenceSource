import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { PartnerFragmentFragmentDoc } from '../fragments/partnerFragment.generated';

const defaultOptions = {} as const;
export type UserGetAgencyTechniciansQueryVariables = Types.Exact<{
  filterTechniciansByAgencyId?: Types.InputMaybe<Types.Scalars['String']>;
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type UserGetAgencyTechniciansQueryResponse = { __typename?: 'Query' } & {
  userGetAgencyTechnicians: { __typename?: 'PartnerConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'PartnerEntity' } & Pick<
          Types.PartnerEntity,
          | 'addressMoreInfo'
          | 'avatarId'
          | 'bank'
          | 'birthday'
          | 'cardNumber'
          | 'citizenId'
          | 'createdAt'
          | 'deletedAt'
          | 'description'
          | 'email'
          | 'fullname'
          | 'hotline'
          | 'id'
          | 'isActive'
          | 'isApproved'
          | 'latitude'
          | 'longitude'
          | 'mapAddress'
          | 'parentId'
          | 'phone'
          | 'suggestionPoint'
          | 'type'
          | 'updatedAt'
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
            education?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >;
            expenseInfo?: Types.Maybe<{ __typename?: 'Expense' } & Pick<Types.Expense, 'cost' | 'distance' | 'time'>>;
            qualifications?: Types.Maybe<
              Array<
                { __typename?: 'CategoryEntity' } & Pick<
                  Types.CategoryEntity,
                  'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                >
              >
            >;
            reviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
            >;
            starInfo: Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>;
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const UserGetAgencyTechniciansDocument = gql`
  query userGetAgencyTechnicians(
    $filterTechniciansByAgencyId: String
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    userGetAgencyTechnicians(
      filterTechniciansByAgencyId: $filterTechniciansByAgencyId
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
    ) {
      items {
        ...PartnerFragment
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
  ${PartnerFragmentFragmentDoc}
`;
export function useUserGetAgencyTechniciansQuery(
  baseOptions?: Apollo.QueryHookOptions<UserGetAgencyTechniciansQueryResponse, UserGetAgencyTechniciansQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetAgencyTechniciansQueryResponse, UserGetAgencyTechniciansQueryVariables>(
    UserGetAgencyTechniciansDocument,
    options,
  );
}
export function useUserGetAgencyTechniciansLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserGetAgencyTechniciansQueryResponse,
    UserGetAgencyTechniciansQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetAgencyTechniciansQueryResponse, UserGetAgencyTechniciansQueryVariables>(
    UserGetAgencyTechniciansDocument,
    options,
  );
}
export type UserGetAgencyTechniciansQueryHookResult = ReturnType<typeof useUserGetAgencyTechniciansQuery>;
export type UserGetAgencyTechniciansLazyQueryHookResult = ReturnType<typeof useUserGetAgencyTechniciansLazyQuery>;
export type UserGetAgencyTechniciansQueryResult = Apollo.QueryResult<
  UserGetAgencyTechniciansQueryResponse,
  UserGetAgencyTechniciansQueryVariables
>;
