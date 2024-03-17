import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type ReviewsOfPartnerQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  partnerId: Types.Scalars['String'];
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  star?: Types.InputMaybe<Types.Scalars['Float']>;
  type: Types.ReviewTypeEnum;
}>;

export type ReviewsOfPartnerQueryResponse = { __typename?: 'Query' } & {
  reviewsOfPartner: { __typename?: 'ReviewConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ReviewEntity' } & Pick<
          Types.ReviewEntity,
          | 'assessorId'
          | 'bookingId'
          | 'comment'
          | 'createdAt'
          | 'deletedAt'
          | 'id'
          | 'personEvaluatedId'
          | 'star'
          | 'type'
          | 'updatedAt'
        > & {
            userAssessor?: Types.Maybe<
              { __typename?: 'UserEntity' } & Pick<
                Types.UserEntity,
                | 'address'
                | 'avatarId'
                | 'birthday'
                | 'certificate'
                | 'createdAt'
                | 'deletedAt'
                | 'email'
                | 'fullname'
                | 'id'
                | 'isActive'
                | 'phone'
                | 'totalBookings'
                | 'totalMaintenanceRequests'
                | 'totalOrders'
                | 'totalSpending'
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
                }
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

export const ReviewsOfPartnerDocument = gql`
  query reviewsOfPartner(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $partnerId: String!
    $search: String
    $sort: SortInput
    $star: Float
    $type: ReviewTypeEnum!
  ) {
    reviewsOfPartner(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      partnerId: $partnerId
      search: $search
      sort: $sort
      star: $star
      type: $type
    ) {
      items {
        userAssessor {
          avatar {
            ...MediaFragment
          }
          address
          avatarId
          birthday
          certificate
          createdAt
          deletedAt
          email
          fullname
          id
          isActive
          phone
          totalBookings
          totalMaintenanceRequests
          totalOrders
          totalSpending
          updatedAt
        }
        assessorId
        bookingId
        comment
        createdAt
        deletedAt
        id
        personEvaluatedId
        star
        type
        updatedAt
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
export function useReviewsOfPartnerQuery(
  baseOptions: Apollo.QueryHookOptions<ReviewsOfPartnerQueryResponse, ReviewsOfPartnerQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReviewsOfPartnerQueryResponse, ReviewsOfPartnerQueryVariables>(
    ReviewsOfPartnerDocument,
    options,
  );
}
export function useReviewsOfPartnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReviewsOfPartnerQueryResponse, ReviewsOfPartnerQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReviewsOfPartnerQueryResponse, ReviewsOfPartnerQueryVariables>(
    ReviewsOfPartnerDocument,
    options,
  );
}
export type ReviewsOfPartnerQueryHookResult = ReturnType<typeof useReviewsOfPartnerQuery>;
export type ReviewsOfPartnerLazyQueryHookResult = ReturnType<typeof useReviewsOfPartnerLazyQuery>;
export type ReviewsOfPartnerQueryResult = Apollo.QueryResult<
  ReviewsOfPartnerQueryResponse,
  ReviewsOfPartnerQueryVariables
>;
