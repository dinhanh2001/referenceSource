import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCreateDiscountCodeMutationVariables = Types.Exact<{
  input: Types.PartnerCreateDiscountCodeInput;
}>;

export type PartnerCreateDiscountCodeMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerCreateDiscountCode'
>;

export const PartnerCreateDiscountCodeDocument = gql`
  mutation partnerCreateDiscountCode($input: PartnerCreateDiscountCodeInput!) {
    partnerCreateDiscountCode(input: $input)
  }
`;
export function usePartnerCreateDiscountCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerCreateDiscountCodeMutationResponse,
    PartnerCreateDiscountCodeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerCreateDiscountCodeMutationResponse, PartnerCreateDiscountCodeMutationVariables>(
    PartnerCreateDiscountCodeDocument,
    options,
  );
}
export type PartnerCreateDiscountCodeMutationHookResult = ReturnType<typeof usePartnerCreateDiscountCodeMutation>;
export type PartnerCreateDiscountCodeMutationResult = Apollo.MutationResult<PartnerCreateDiscountCodeMutationResponse>;
export type PartnerCreateDiscountCodeMutationOptions = Apollo.BaseMutationOptions<
  PartnerCreateDiscountCodeMutationResponse,
  PartnerCreateDiscountCodeMutationVariables
>;
