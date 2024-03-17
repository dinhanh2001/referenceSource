import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type DisconnectSocialAccountMutationVariables = Types.Exact<{
  input: Types.DisconnectSocialAccountInput;
}>;

export type DisconnectSocialAccountMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'disconnectSocialAccount'
>;

export const DisconnectSocialAccountDocument = gql`
  mutation disconnectSocialAccount($input: DisconnectSocialAccountInput!) {
    disconnectSocialAccount(input: $input)
  }
`;
export function useDisconnectSocialAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DisconnectSocialAccountMutationResponse,
    DisconnectSocialAccountMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DisconnectSocialAccountMutationResponse, DisconnectSocialAccountMutationVariables>(
    DisconnectSocialAccountDocument,
    options,
  );
}
export type DisconnectSocialAccountMutationHookResult = ReturnType<typeof useDisconnectSocialAccountMutation>;
export type DisconnectSocialAccountMutationResult = Apollo.MutationResult<DisconnectSocialAccountMutationResponse>;
export type DisconnectSocialAccountMutationOptions = Apollo.BaseMutationOptions<
  DisconnectSocialAccountMutationResponse,
  DisconnectSocialAccountMutationVariables
>;
