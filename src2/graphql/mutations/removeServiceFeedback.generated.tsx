import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type RemoveServiceFeedbackMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type RemoveServiceFeedbackMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'removeServiceFeedback'
>;

export const RemoveServiceFeedbackDocument = gql`
  mutation removeServiceFeedback($id: String!) {
    removeServiceFeedback(id: $id)
  }
`;
export function useRemoveServiceFeedbackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveServiceFeedbackMutationResponse,
    RemoveServiceFeedbackMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveServiceFeedbackMutationResponse, RemoveServiceFeedbackMutationVariables>(
    RemoveServiceFeedbackDocument,
    options,
  );
}
export type RemoveServiceFeedbackMutationHookResult = ReturnType<typeof useRemoveServiceFeedbackMutation>;
export type RemoveServiceFeedbackMutationResult = Apollo.MutationResult<RemoveServiceFeedbackMutationResponse>;
export type RemoveServiceFeedbackMutationOptions = Apollo.BaseMutationOptions<
  RemoveServiceFeedbackMutationResponse,
  RemoveServiceFeedbackMutationVariables
>;
