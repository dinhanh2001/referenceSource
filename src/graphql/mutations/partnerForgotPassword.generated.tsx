import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerForgotPasswordMutationVariables = Types.Exact<{
  input: Types.PartnerForgotPasswordInput;
}>;

export type PartnerForgotPasswordMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerForgotPassword'
>;

export const PartnerForgotPasswordDocument = gql`
  mutation partnerForgotPassword($input: PartnerForgotPasswordInput!) {
    partnerForgotPassword(input: $input)
  }
`;
export function usePartnerForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerForgotPasswordMutationResponse,
    PartnerForgotPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerForgotPasswordMutationResponse, PartnerForgotPasswordMutationVariables>(
    PartnerForgotPasswordDocument,
    options,
  );
}
export type PartnerForgotPasswordMutationHookResult = ReturnType<typeof usePartnerForgotPasswordMutation>;
export type PartnerForgotPasswordMutationResult = Apollo.MutationResult<PartnerForgotPasswordMutationResponse>;
export type PartnerForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  PartnerForgotPasswordMutationResponse,
  PartnerForgotPasswordMutationVariables
>;
