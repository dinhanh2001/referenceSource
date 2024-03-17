import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CreateVehicleMutationVariables = Types.Exact<{
  input: Types.CreateVehicleInput;
}>;

export type CreateVehicleMutationResponse = { __typename?: 'Mutation' } & {
  createVehicle: { __typename?: 'VehicleEntity' } & Pick<Types.VehicleEntity, 'id'>;
};

export const CreateVehicleDocument = gql`
  mutation createVehicle($input: CreateVehicleInput!) {
    createVehicle(input: $input) {
      id
    }
  }
`;
export function useCreateVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateVehicleMutationResponse, CreateVehicleMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateVehicleMutationResponse, CreateVehicleMutationVariables>(
    CreateVehicleDocument,
    options,
  );
}
export type CreateVehicleMutationHookResult = ReturnType<typeof useCreateVehicleMutation>;
export type CreateVehicleMutationResult = Apollo.MutationResult<CreateVehicleMutationResponse>;
export type CreateVehicleMutationOptions = Apollo.BaseMutationOptions<
  CreateVehicleMutationResponse,
  CreateVehicleMutationVariables
>;
