import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type AgencyAssignBookingMutationVariables = Types.Exact<{
  input: Types.AssignBookingInput;
}>;

export type AgencyAssignBookingMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'agencyAssignBooking'
>;

export const AgencyAssignBookingDocument = gql`
  mutation agencyAssignBooking($input: AssignBookingInput!) {
    agencyAssignBooking(input: $input)
  }
`;
export function useAgencyAssignBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<AgencyAssignBookingMutationResponse, AgencyAssignBookingMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AgencyAssignBookingMutationResponse, AgencyAssignBookingMutationVariables>(
    AgencyAssignBookingDocument,
    options,
  );
}
export type AgencyAssignBookingMutationHookResult = ReturnType<typeof useAgencyAssignBookingMutation>;
export type AgencyAssignBookingMutationResult = Apollo.MutationResult<AgencyAssignBookingMutationResponse>;
export type AgencyAssignBookingMutationOptions = Apollo.BaseMutationOptions<
  AgencyAssignBookingMutationResponse,
  AgencyAssignBookingMutationVariables
>;
