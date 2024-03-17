import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerListReviewQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  reviewObject: Types.ReviewObjectEnum;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  star?: Types.InputMaybe<Types.Scalars['Float']>;
}>;

export type PartnerListReviewQueryResponse = { __typename?: 'Query' } & {
  partnerListReview: { __typename?: 'ReviewConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ReviewEntity' } & Pick<
          Types.ReviewEntity,
          'comment' | 'createdAt' | 'id' | 'star' | 'type' | 'updatedAt'
        > & {
            userAssessor?: Types.Maybe<
              { __typename?: 'UserEntity' } & Pick<Types.UserEntity, 'fullname'> & {
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

export const PartnerListReviewDocument = gql`
  query partnerListReview(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $reviewObject: ReviewObjectEnum!
    $search: String
    $sort: SortInput
    $star: Float
  ) {
    partnerListReview(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      reviewObject: $reviewObject
      search: $search
      sort: $sort
      star: $star
    ) {
      items {
        comment
        createdAt
        id
        star
        type
        updatedAt
        userAssessor {
          fullname
          avatar {
            ...MediaFragment
          }
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
export function usePartnerListReviewQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerListReviewQueryResponse, PartnerListReviewQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerListReviewQueryResponse, PartnerListReviewQueryVariables>(
    PartnerListReviewDocument,
    options,
  );
}
export function usePartnerListReviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerListReviewQueryResponse, PartnerListReviewQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerListReviewQueryResponse, PartnerListReviewQueryVariables>(
    PartnerListReviewDocument,
    options,
  );
}
export type PartnerListReviewQueryHookResult = ReturnType<typeof usePartnerListReviewQuery>;
export type PartnerListReviewLazyQueryHookResult = ReturnType<typeof usePartnerListReviewLazyQuery>;
export type PartnerListReviewQueryResult = Apollo.QueryResult<
  PartnerListReviewQueryResponse,
  PartnerListReviewQueryVariables
>;
