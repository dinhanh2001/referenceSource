import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerUpdateProductStatusMutationVariables = Types.Exact<{
  input: Types.UpdateProductStatusInput;
}>;

export type PartnerUpdateProductStatusMutationResponse = { __typename?: 'Mutation' } & {
  partnerUpdateProductStatus: { __typename?: 'ProductEntity' } & Pick<Types.ProductEntity, 'id' | 'isActive'>;
};

export const PartnerUpdateProductStatusDocument = gql`
  mutation partnerUpdateProductStatus($input: UpdateProductStatusInput!) {
    partnerUpdateProductStatus(input: $input) {
      id
      isActive
    }
  }
`;
export function usePartnerUpdateProductStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerUpdateProductStatusMutationResponse,
    PartnerUpdateProductStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerUpdateProductStatusMutationResponse, PartnerUpdateProductStatusMutationVariables>(
    PartnerUpdateProductStatusDocument,
    options,
  );
}
export type PartnerUpdateProductStatusMutationHookResult = ReturnType<typeof usePartnerUpdateProductStatusMutation>;
export type PartnerUpdateProductStatusMutationResult =
  Apollo.MutationResult<PartnerUpdateProductStatusMutationResponse>;
export type PartnerUpdateProductStatusMutationOptions = Apollo.BaseMutationOptions<
  PartnerUpdateProductStatusMutationResponse,
  PartnerUpdateProductStatusMutationVariables
>;
