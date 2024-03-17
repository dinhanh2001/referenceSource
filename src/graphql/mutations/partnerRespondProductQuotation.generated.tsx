import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerRespondProductQuotationMutationVariables = Types.Exact<{
  input: Types.RespondProductQuotationInput;
}>;

export type PartnerRespondProductQuotationMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerRespondProductQuotation'
>;

export const PartnerRespondProductQuotationDocument = gql`
  mutation partnerRespondProductQuotation($input: RespondProductQuotationInput!) {
    partnerRespondProductQuotation(input: $input)
  }
`;
export function usePartnerRespondProductQuotationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerRespondProductQuotationMutationResponse,
    PartnerRespondProductQuotationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    PartnerRespondProductQuotationMutationResponse,
    PartnerRespondProductQuotationMutationVariables
  >(PartnerRespondProductQuotationDocument, options);
}
export type PartnerRespondProductQuotationMutationHookResult = ReturnType<
  typeof usePartnerRespondProductQuotationMutation
>;
export type PartnerRespondProductQuotationMutationResult =
  Apollo.MutationResult<PartnerRespondProductQuotationMutationResponse>;
export type PartnerRespondProductQuotationMutationOptions = Apollo.BaseMutationOptions<
  PartnerRespondProductQuotationMutationResponse,
  PartnerRespondProductQuotationMutationVariables
>;
