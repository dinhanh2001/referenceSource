import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerUpdateProductVehicleMutationVariables = Types.Exact<{
  input: Types.PartnerUpdateProductVehicleInput;
}>;

export type PartnerUpdateProductVehicleMutationResponse = { __typename?: 'Mutation' } & {
  partnerUpdateProductVehicle: { __typename?: 'ProductEntity' } & Pick<Types.ProductEntity, 'id'>;
};

export const PartnerUpdateProductVehicleDocument = gql`
  mutation partnerUpdateProductVehicle($input: PartnerUpdateProductVehicleInput!) {
    partnerUpdateProductVehicle(input: $input) {
      id
    }
  }
`;
export function usePartnerUpdateProductVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerUpdateProductVehicleMutationResponse,
    PartnerUpdateProductVehicleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerUpdateProductVehicleMutationResponse, PartnerUpdateProductVehicleMutationVariables>(
    PartnerUpdateProductVehicleDocument,
    options,
  );
}
export type PartnerUpdateProductVehicleMutationHookResult = ReturnType<typeof usePartnerUpdateProductVehicleMutation>;
export type PartnerUpdateProductVehicleMutationResult =
  Apollo.MutationResult<PartnerUpdateProductVehicleMutationResponse>;
export type PartnerUpdateProductVehicleMutationOptions = Apollo.BaseMutationOptions<
  PartnerUpdateProductVehicleMutationResponse,
  PartnerUpdateProductVehicleMutationVariables
>;
