import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { PartnerFragmentFragmentDoc } from '../fragments/partnerFragment.generated';

const defaultOptions = {} as const;
export type PartnersForBookingQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isAgency?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isTechnician?: Types.InputMaybe<Types.Scalars['Boolean']>;
  latitude: Types.Scalars['Float'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  longitude: Types.Scalars['Float'];
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  sortBy?: Types.InputMaybe<Types.PartnersForBookingSortBy>;
}>;

export type PartnersForBookingQueryResponse = { __typename?: 'Query' } & {
  partnersForBooking?: Types.Maybe<
    { __typename?: 'PartnerConnection' } & {
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
    }
  >;
};

export const PartnersForBookingDocument = gql`
  query partnersForBooking(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isAgency: Boolean
    $isApproved: Boolean
    $isTechnician: Boolean
    $latitude: Float!
    $limit: Int
    $longitude: Float!
    $page: Int
    $search: String
    $sort: SortInput
    $sortBy: PartnersForBookingSortBy
  ) {
    partnersForBooking(
      filters: $filters
      isActive: $isActive
      isAgency: $isAgency
      isApproved: $isApproved
      isTechnician: $isTechnician
      latitude: $latitude
      limit: $limit
      longitude: $longitude
      page: $page
      search: $search
      sort: $sort
      sortBy: $sortBy
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
export function usePartnersForBookingQuery(
  baseOptions: Apollo.QueryHookOptions<PartnersForBookingQueryResponse, PartnersForBookingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnersForBookingQueryResponse, PartnersForBookingQueryVariables>(
    PartnersForBookingDocument,
    options,
  );
}
export function usePartnersForBookingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnersForBookingQueryResponse, PartnersForBookingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnersForBookingQueryResponse, PartnersForBookingQueryVariables>(
    PartnersForBookingDocument,
    options,
  );
}
export type PartnersForBookingQueryHookResult = ReturnType<typeof usePartnersForBookingQuery>;
export type PartnersForBookingLazyQueryHookResult = ReturnType<typeof usePartnersForBookingLazyQuery>;
export type PartnersForBookingQueryResult = Apollo.QueryResult<
  PartnersForBookingQueryResponse,
  PartnersForBookingQueryVariables
>;
