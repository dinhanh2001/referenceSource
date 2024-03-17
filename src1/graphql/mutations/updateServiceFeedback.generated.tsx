import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UpdateServiceFeedbackMutationVariables = Types.Exact<{
  input: Types.UpdateServiceFeedbackInput;
}>;

export type UpdateServiceFeedbackMutationResponse = { __typename?: 'Mutation' } & {
  updateServiceFeedback: { __typename?: 'ServiceFeedbackEntity' } & Pick<Types.ServiceFeedbackEntity, 'id'>;
};

export const UpdateServiceFeedbackDocument = gql`
  mutation updateServiceFeedback($input: UpdateServiceFeedbackInput!) {
    updateServiceFeedback(input: $input) {
      id
    }
  }
`;
export function useUpdateServiceFeedbackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateServiceFeedbackMutationResponse,
    UpdateServiceFeedbackMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateServiceFeedbackMutationResponse, UpdateServiceFeedbackMutationVariables>(
    UpdateServiceFeedbackDocument,
    options,
  );
}
export type UpdateServiceFeedbackMutationHookResult = ReturnType<typeof useUpdateServiceFeedbackMutation>;
export type UpdateServiceFeedbackMutationResult = Apollo.MutationResult<UpdateServiceFeedbackMutationResponse>;
export type UpdateServiceFeedbackMutationOptions = Apollo.BaseMutationOptions<
  UpdateServiceFeedbackMutationResponse,
  UpdateServiceFeedbackMutationVariables
>;
