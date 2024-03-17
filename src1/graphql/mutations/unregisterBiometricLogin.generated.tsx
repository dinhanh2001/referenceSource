import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UnregisterBiometricLoginMutationVariables = Types.Exact<{
  biometricId: Types.Scalars['String'];
}>;

export type UnregisterBiometricLoginMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'unregisterBiometricLogin'
>;

export const UnregisterBiometricLoginDocument = gql`
  mutation unregisterBiometricLogin($biometricId: String!) {
    unregisterBiometricLogin(biometricId: $biometricId)
  }
`;
export function useUnregisterBiometricLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnregisterBiometricLoginMutationResponse,
    UnregisterBiometricLoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnregisterBiometricLoginMutationResponse, UnregisterBiometricLoginMutationVariables>(
    UnregisterBiometricLoginDocument,
    options,
  );
}
export type UnregisterBiometricLoginMutationHookResult = ReturnType<typeof useUnregisterBiometricLoginMutation>;
export type UnregisterBiometricLoginMutationResult = Apollo.MutationResult<UnregisterBiometricLoginMutationResponse>;
export type UnregisterBiometricLoginMutationOptions = Apollo.BaseMutationOptions<
  UnregisterBiometricLoginMutationResponse,
  UnregisterBiometricLoginMutationVariables
>;
