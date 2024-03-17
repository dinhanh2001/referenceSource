import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type RegisterBiometricLoginMutationVariables = Types.Exact<{ [key: string]: never }>;

export type RegisterBiometricLoginMutationResponse = { __typename?: 'Mutation' } & {
  registerBiometricLogin: { __typename?: 'AuthBiometricEntity' } & Pick<
    Types.AuthBiometricEntity,
    'biometricId' | 'createdAt' | 'id' | 'updatedAt' | 'userId'
  >;
};

export const RegisterBiometricLoginDocument = gql`
  mutation registerBiometricLogin {
    registerBiometricLogin {
      biometricId
      createdAt
      id
      updatedAt
      userId
    }
  }
`;
export function useRegisterBiometricLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterBiometricLoginMutationResponse,
    RegisterBiometricLoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterBiometricLoginMutationResponse, RegisterBiometricLoginMutationVariables>(
    RegisterBiometricLoginDocument,
    options,
  );
}
export type RegisterBiometricLoginMutationHookResult = ReturnType<typeof useRegisterBiometricLoginMutation>;
export type RegisterBiometricLoginMutationResult = Apollo.MutationResult<RegisterBiometricLoginMutationResponse>;
export type RegisterBiometricLoginMutationOptions = Apollo.BaseMutationOptions<
  RegisterBiometricLoginMutationResponse,
  RegisterBiometricLoginMutationVariables
>;
