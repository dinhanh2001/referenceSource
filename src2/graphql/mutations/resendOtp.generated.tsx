import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type ResendOtpMutationVariables = Types.Exact<{
  input: Types.ResendOtpInput;
}>;

export type ResendOtpMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'resendOtp'>;

export const ResendOtpDocument = gql`
  mutation resendOtp($input: ResendOtpInput!) {
    resendOtp(input: $input)
  }
`;
export function useResendOtpMutation(
  baseOptions?: Apollo.MutationHookOptions<ResendOtpMutationResponse, ResendOtpMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ResendOtpMutationResponse, ResendOtpMutationVariables>(ResendOtpDocument, options);
}
export type ResendOtpMutationHookResult = ReturnType<typeof useResendOtpMutation>;
export type ResendOtpMutationResult = Apollo.MutationResult<ResendOtpMutationResponse>;
export type ResendOtpMutationOptions = Apollo.BaseMutationOptions<
  ResendOtpMutationResponse,
  ResendOtpMutationVariables
>;
