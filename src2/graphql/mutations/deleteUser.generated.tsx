import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type DeleteUserMutationVariables = Types.Exact<{
  input: Types.DeleteUserInput;
}>;

export type DeleteUserMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteUser'>;

export const DeleteUserDocument = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`;
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteUserMutationResponse, DeleteUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutationResponse, DeleteUserMutationVariables>(DeleteUserDocument, options);
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutationResponse>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutationResponse,
  DeleteUserMutationVariables
>;
