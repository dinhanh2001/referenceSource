import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type TechnicianArrivingBookingMutationVariables = Types.Exact<{
  input: Types.UpdateBookingStatusInput;
}>;

export type TechnicianArrivingBookingMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'technicianArrivingBooking'
>;

export const TechnicianArrivingBookingDocument = gql`
  mutation technicianArrivingBooking($input: UpdateBookingStatusInput!) {
    technicianArrivingBooking(input: $input)
  }
`;
export function useTechnicianArrivingBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TechnicianArrivingBookingMutationResponse,
    TechnicianArrivingBookingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<TechnicianArrivingBookingMutationResponse, TechnicianArrivingBookingMutationVariables>(
    TechnicianArrivingBookingDocument,
    options,
  );
}
export type TechnicianArrivingBookingMutationHookResult = ReturnType<typeof useTechnicianArrivingBookingMutation>;
export type TechnicianArrivingBookingMutationResult = Apollo.MutationResult<TechnicianArrivingBookingMutationResponse>;
export type TechnicianArrivingBookingMutationOptions = Apollo.BaseMutationOptions<
  TechnicianArrivingBookingMutationResponse,
  TechnicianArrivingBookingMutationVariables
>;
