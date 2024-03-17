import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerRemoveProductMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerRemoveProductMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerRemoveProduct'
>;

export const PartnerRemoveProductDocument = gql`
  mutation partnerRemoveProduct($id: String!) {
    partnerRemoveProduct(id: $id)
  }
`;
export function usePartnerRemoveProductMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerRemoveProductMutationResponse, PartnerRemoveProductMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerRemoveProductMutationResponse, PartnerRemoveProductMutationVariables>(
    PartnerRemoveProductDocument,
    options,
  );
}
export type PartnerRemoveProductMutationHookResult = ReturnType<typeof usePartnerRemoveProductMutation>;
export type PartnerRemoveProductMutationResult = Apollo.MutationResult<PartnerRemoveProductMutationResponse>;
export type PartnerRemoveProductMutationOptions = Apollo.BaseMutationOptions<
  PartnerRemoveProductMutationResponse,
  PartnerRemoveProductMutationVariables
>;
