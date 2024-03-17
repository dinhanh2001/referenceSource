import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerUpdateAccessaryMutationVariables = Types.Exact<{
  input: Types.PartnerUpdateAccessaryInput;
}>;

export type PartnerUpdateAccessaryMutationResponse = { __typename?: 'Mutation' } & {
  partnerUpdateAccessary: { __typename?: 'ProductEntity' } & Pick<Types.ProductEntity, 'id'>;
};

export const PartnerUpdateAccessaryDocument = gql`
  mutation partnerUpdateAccessary($input: PartnerUpdateAccessaryInput!) {
    partnerUpdateAccessary(input: $input) {
      id
    }
  }
`;
export function usePartnerUpdateAccessaryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerUpdateAccessaryMutationResponse,
    PartnerUpdateAccessaryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerUpdateAccessaryMutationResponse, PartnerUpdateAccessaryMutationVariables>(
    PartnerUpdateAccessaryDocument,
    options,
  );
}
export type PartnerUpdateAccessaryMutationHookResult = ReturnType<typeof usePartnerUpdateAccessaryMutation>;
export type PartnerUpdateAccessaryMutationResult = Apollo.MutationResult<PartnerUpdateAccessaryMutationResponse>;
export type PartnerUpdateAccessaryMutationOptions = Apollo.BaseMutationOptions<
  PartnerUpdateAccessaryMutationResponse,
  PartnerUpdateAccessaryMutationVariables
>;
