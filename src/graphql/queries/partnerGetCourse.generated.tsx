import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerGetCourseQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerGetCourseQueryResponse = { __typename?: 'Query' } & {
  partnerGetCourse: { __typename?: 'CourseEntity' } & Pick<
    Types.CourseEntity,
    | 'address'
    | 'content'
    | 'startDate'
    | 'endDate'
    | 'openDate'
    | 'name'
    | 'price'
    | 'teacher'
    | 'teacherDescription'
    | 'isEnrolled'
    | 'updatedAt'
    | 'createdAt'
  > & {
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
    };
};

export const PartnerGetCourseDocument = gql`
  query partnerGetCourse($id: String!) {
    partnerGetCourse(id: $id) {
      address
      banner {
        ...MediaFragment
      }
      content
      startDate
      endDate
      openDate
      name
      price
      teacher
      teacherDescription
      isEnrolled
      updatedAt
      createdAt
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function usePartnerGetCourseQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetCourseQueryResponse, PartnerGetCourseQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetCourseQueryResponse, PartnerGetCourseQueryVariables>(
    PartnerGetCourseDocument,
    options,
  );
}
export function usePartnerGetCourseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetCourseQueryResponse, PartnerGetCourseQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetCourseQueryResponse, PartnerGetCourseQueryVariables>(
    PartnerGetCourseDocument,
    options,
  );
}
export type PartnerGetCourseQueryHookResult = ReturnType<typeof usePartnerGetCourseQuery>;
export type PartnerGetCourseLazyQueryHookResult = ReturnType<typeof usePartnerGetCourseLazyQuery>;
export type PartnerGetCourseQueryResult = Apollo.QueryResult<
  PartnerGetCourseQueryResponse,
  PartnerGetCourseQueryVariables
>;
