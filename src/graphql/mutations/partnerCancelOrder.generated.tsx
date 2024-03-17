import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCancelOrderMutationVariables = Types.Exact<{
  input: Types.CancelOrderInput;
}>;

export type PartnerCancelOrderMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerCancelOrder'
>;

export const PartnerCancelOrderDocument = gql`
  mutation partnerCancelOrder($input: CancelOrderInput!) {
    partnerCancelOrder(input: $input)
  }
`;
export function usePartnerCancelOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerCancelOrderMutationResponse, PartnerCancelOrderMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerCancelOrderMutationResponse, PartnerCancelOrderMutationVariables>(
    PartnerCancelOrderDocument,
    options,
  );
}
export type PartnerCancelOrderMutationHookResult = ReturnType<typeof usePartnerCancelOrderMutation>;
export type PartnerCancelOrderMutationResult = Apollo.MutationResult<PartnerCancelOrderMutationResponse>;
export type PartnerCancelOrderMutationOptions = Apollo.BaseMutationOptions<
  PartnerCancelOrderMutationResponse,
  PartnerCancelOrderMutationVariables
>;
