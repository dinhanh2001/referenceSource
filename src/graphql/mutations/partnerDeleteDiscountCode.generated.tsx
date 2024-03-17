import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerDeleteDiscountCodeMutationVariables = Types.Exact<{
  input: Types.DeleteDiscountCodeInput;
}>;

export type PartnerDeleteDiscountCodeMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerDeleteDiscountCode'
>;

export const PartnerDeleteDiscountCodeDocument = gql`
  mutation partnerDeleteDiscountCode($input: DeleteDiscountCodeInput!) {
    partnerDeleteDiscountCode(input: $input)
  }
`;
export function usePartnerDeleteDiscountCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerDeleteDiscountCodeMutationResponse,
    PartnerDeleteDiscountCodeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerDeleteDiscountCodeMutationResponse, PartnerDeleteDiscountCodeMutationVariables>(
    PartnerDeleteDiscountCodeDocument,
    options,
  );
}
export type PartnerDeleteDiscountCodeMutationHookResult = ReturnType<typeof usePartnerDeleteDiscountCodeMutation>;
export type PartnerDeleteDiscountCodeMutationResult = Apollo.MutationResult<PartnerDeleteDiscountCodeMutationResponse>;
export type PartnerDeleteDiscountCodeMutationOptions = Apollo.BaseMutationOptions<
  PartnerDeleteDiscountCodeMutationResponse,
  PartnerDeleteDiscountCodeMutationVariables
>;
