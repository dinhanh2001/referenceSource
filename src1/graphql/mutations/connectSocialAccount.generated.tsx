import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type ConnectSocialAccountMutationVariables = Types.Exact<{
  input: Types.ConnectSocialAccountInput;
}>;

export type ConnectSocialAccountMutationResponse = { __typename?: 'Mutation' } & {
  connectSocialAccount: { __typename?: 'SocialAccount' } & Pick<
    Types.SocialAccount,
    'id' | 'socialEmail' | 'socialId' | 'type' | 'userId'
  >;
};

export const ConnectSocialAccountDocument = gql`
  mutation connectSocialAccount($input: ConnectSocialAccountInput!) {
    connectSocialAccount(input: $input) {
      id
      socialEmail
      socialId
      type
      userId
    }
  }
`;
export function useConnectSocialAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<ConnectSocialAccountMutationResponse, ConnectSocialAccountMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConnectSocialAccountMutationResponse, ConnectSocialAccountMutationVariables>(
    ConnectSocialAccountDocument,
    options,
  );
}
export type ConnectSocialAccountMutationHookResult = ReturnType<typeof useConnectSocialAccountMutation>;
export type ConnectSocialAccountMutationResult = Apollo.MutationResult<ConnectSocialAccountMutationResponse>;
export type ConnectSocialAccountMutationOptions = Apollo.BaseMutationOptions<
  ConnectSocialAccountMutationResponse,
  ConnectSocialAccountMutationVariables
>;
