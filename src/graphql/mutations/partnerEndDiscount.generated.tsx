import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerEndDiscountMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerEndDiscountMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerEndDiscount'
>;

export const PartnerEndDiscountDocument = gql`
  mutation partnerEndDiscount($id: String!) {
    partnerEndDiscount(id: $id)
  }
`;
export function usePartnerEndDiscountMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerEndDiscountMutationResponse, PartnerEndDiscountMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerEndDiscountMutationResponse, PartnerEndDiscountMutationVariables>(
    PartnerEndDiscountDocument,
    options,
  );
}
export type PartnerEndDiscountMutationHookResult = ReturnType<typeof usePartnerEndDiscountMutation>;
export type PartnerEndDiscountMutationResult = Apollo.MutationResult<PartnerEndDiscountMutationResponse>;
export type PartnerEndDiscountMutationOptions = Apollo.BaseMutationOptions<
  PartnerEndDiscountMutationResponse,
  PartnerEndDiscountMutationVariables
>;
