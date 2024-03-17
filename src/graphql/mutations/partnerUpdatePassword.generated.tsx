import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerUpdatePasswordMutationVariables = Types.Exact<{
  input: Types.UpdatePartnerPasswordInput;
}>;

export type PartnerUpdatePasswordMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerUpdatePassword'
>;

export const PartnerUpdatePasswordDocument = gql`
  mutation partnerUpdatePassword($input: UpdatePartnerPasswordInput!) {
    partnerUpdatePassword(input: $input)
  }
`;
export function usePartnerUpdatePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerUpdatePasswordMutationResponse,
    PartnerUpdatePasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerUpdatePasswordMutationResponse, PartnerUpdatePasswordMutationVariables>(
    PartnerUpdatePasswordDocument,
    options,
  );
}
export type PartnerUpdatePasswordMutationHookResult = ReturnType<typeof usePartnerUpdatePasswordMutation>;
export type PartnerUpdatePasswordMutationResult = Apollo.MutationResult<PartnerUpdatePasswordMutationResponse>;
export type PartnerUpdatePasswordMutationOptions = Apollo.BaseMutationOptions<
  PartnerUpdatePasswordMutationResponse,
  PartnerUpdatePasswordMutationVariables
>;
