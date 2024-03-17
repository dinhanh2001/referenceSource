import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerUpdateOrderStatusMutationVariables = Types.Exact<{
  input: Types.UpdateOrderInput;
}>;

export type PartnerUpdateOrderStatusMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerUpdateOrderStatus'
>;

export const PartnerUpdateOrderStatusDocument = gql`
  mutation partnerUpdateOrderStatus($input: UpdateOrderInput!) {
    partnerUpdateOrderStatus(input: $input)
  }
`;
export function usePartnerUpdateOrderStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerUpdateOrderStatusMutationResponse,
    PartnerUpdateOrderStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerUpdateOrderStatusMutationResponse, PartnerUpdateOrderStatusMutationVariables>(
    PartnerUpdateOrderStatusDocument,
    options,
  );
}
export type PartnerUpdateOrderStatusMutationHookResult = ReturnType<typeof usePartnerUpdateOrderStatusMutation>;
export type PartnerUpdateOrderStatusMutationResult = Apollo.MutationResult<PartnerUpdateOrderStatusMutationResponse>;
export type PartnerUpdateOrderStatusMutationOptions = Apollo.BaseMutationOptions<
  PartnerUpdateOrderStatusMutationResponse,
  PartnerUpdateOrderStatusMutationVariables
>;
