import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UpdateVehicleMutationVariables = Types.Exact<{
  input: Types.UpdateVehicleInput;
}>;

export type UpdateVehicleMutationResponse = { __typename?: 'Mutation' } & {
  updateVehicle: { __typename?: 'VehicleEntity' } & Pick<Types.VehicleEntity, 'id'>;
};

export const UpdateVehicleDocument = gql`
  mutation updateVehicle($input: UpdateVehicleInput!) {
    updateVehicle(input: $input) {
      id
    }
  }
`;
export function useUpdateVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateVehicleMutationResponse, UpdateVehicleMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateVehicleMutationResponse, UpdateVehicleMutationVariables>(
    UpdateVehicleDocument,
    options,
  );
}
export type UpdateVehicleMutationHookResult = ReturnType<typeof useUpdateVehicleMutation>;
export type UpdateVehicleMutationResult = Apollo.MutationResult<UpdateVehicleMutationResponse>;
export type UpdateVehicleMutationOptions = Apollo.BaseMutationOptions<
  UpdateVehicleMutationResponse,
  UpdateVehicleMutationVariables
>;
