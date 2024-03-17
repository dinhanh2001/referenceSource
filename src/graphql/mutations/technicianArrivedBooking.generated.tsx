import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type TechnicianArrivedBookingMutationVariables = Types.Exact<{
  input: Types.UpdateBookingStatusInput;
}>;

export type TechnicianArrivedBookingMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'technicianArrivedBooking'
>;

export const TechnicianArrivedBookingDocument = gql`
  mutation technicianArrivedBooking($input: UpdateBookingStatusInput!) {
    technicianArrivedBooking(input: $input)
  }
`;
export function useTechnicianArrivedBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TechnicianArrivedBookingMutationResponse,
    TechnicianArrivedBookingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<TechnicianArrivedBookingMutationResponse, TechnicianArrivedBookingMutationVariables>(
    TechnicianArrivedBookingDocument,
    options,
  );
}
export type TechnicianArrivedBookingMutationHookResult = ReturnType<typeof useTechnicianArrivedBookingMutation>;
export type TechnicianArrivedBookingMutationResult = Apollo.MutationResult<TechnicianArrivedBookingMutationResponse>;
export type TechnicianArrivedBookingMutationOptions = Apollo.BaseMutationOptions<
  TechnicianArrivedBookingMutationResponse,
  TechnicianArrivedBookingMutationVariables
>;
