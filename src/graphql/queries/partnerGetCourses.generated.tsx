import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerGetCoursesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isOwner?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type PartnerGetCoursesQueryResponse = { __typename?: 'Query' } & {
  partnerGetCourses: { __typename?: 'CourseConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'CourseEntity' } & Pick<Types.CourseEntity, 'id' | 'name' | 'price'> & {
            banner?: Types.Maybe<
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

export const PartnerGetCoursesDocument = gql`
  query partnerGetCourses(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $isOwner: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    partnerGetCourses(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      isOwner: $isOwner
      limit: $limit
      page: $page
      search: $search
      sort: $sort
    ) {
      items {
        id
        banner {
          ...MediaFragment
        }
        name
        price
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
export function usePartnerGetCoursesQuery(
  baseOptions?: Apollo.QueryHookOptions<PartnerGetCoursesQueryResponse, PartnerGetCoursesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetCoursesQueryResponse, PartnerGetCoursesQueryVariables>(
    PartnerGetCoursesDocument,
    options,
  );
}
export function usePartnerGetCoursesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetCoursesQueryResponse, PartnerGetCoursesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetCoursesQueryResponse, PartnerGetCoursesQueryVariables>(
    PartnerGetCoursesDocument,
    options,
  );
}
export type PartnerGetCoursesQueryHookResult = ReturnType<typeof usePartnerGetCoursesQuery>;
export type PartnerGetCoursesLazyQueryHookResult = ReturnType<typeof usePartnerGetCoursesLazyQuery>;
export type PartnerGetCoursesQueryResult = Apollo.QueryResult<
  PartnerGetCoursesQueryResponse,
  PartnerGetCoursesQueryVariables
>;
