import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type EnrollCourseMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type EnrollCourseMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'enrollCourse'>;

export const EnrollCourseDocument = gql`
  mutation enrollCourse($id: String!) {
    enrollCourse(id: $id)
  }
`;
export function useEnrollCourseMutation(
  baseOptions?: Apollo.MutationHookOptions<EnrollCourseMutationResponse, EnrollCourseMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EnrollCourseMutationResponse, EnrollCourseMutationVariables>(EnrollCourseDocument, options);
}
export type EnrollCourseMutationHookResult = ReturnType<typeof useEnrollCourseMutation>;
export type EnrollCourseMutationResult = Apollo.MutationResult<EnrollCourseMutationResponse>;
export type EnrollCourseMutationOptions = Apollo.BaseMutationOptions<
  EnrollCourseMutationResponse,
  EnrollCourseMutationVariables
>;
