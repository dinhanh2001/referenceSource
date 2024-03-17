import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type DeletePartnerMutationVariables = Types.Exact<{
  input: Types.DeletePartnerInput;
}>;

export type DeletePartnerMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deletePartner'>;

export const DeletePartnerDocument = gql`
  mutation deletePartner($input: DeletePartnerInput!) {
    deletePartner(input: $input)
  }
`;
export function useDeletePartnerMutation(
  baseOptions?: Apollo.MutationHookOptions<DeletePartnerMutationResponse, DeletePartnerMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeletePartnerMutationResponse, DeletePartnerMutationVariables>(
    DeletePartnerDocument,
    options,
  );
}
export type DeletePartnerMutationHookResult = ReturnType<typeof useDeletePartnerMutation>;
export type DeletePartnerMutationResult = Apollo.MutationResult<DeletePartnerMutationResponse>;
export type DeletePartnerMutationOptions = Apollo.BaseMutationOptions<
  DeletePartnerMutationResponse,
  DeletePartnerMutationVariables
>;
