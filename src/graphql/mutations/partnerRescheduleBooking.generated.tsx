import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerRescheduleBookingMutationVariables = Types.Exact<{
  input: Types.ScheduleBookingInput;
}>;

export type PartnerRescheduleBookingMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerRescheduleBooking'
>;

export const PartnerRescheduleBookingDocument = gql`
  mutation partnerRescheduleBooking($input: ScheduleBookingInput!) {
    partnerRescheduleBooking(input: $input)
  }
`;
export function usePartnerRescheduleBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerRescheduleBookingMutationResponse,
    PartnerRescheduleBookingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerRescheduleBookingMutationResponse, PartnerRescheduleBookingMutationVariables>(
    PartnerRescheduleBookingDocument,
    options,
  );
}
export type PartnerRescheduleBookingMutationHookResult = ReturnType<typeof usePartnerRescheduleBookingMutation>;
export type PartnerRescheduleBookingMutationResult = Apollo.MutationResult<PartnerRescheduleBookingMutationResponse>;
export type PartnerRescheduleBookingMutationOptions = Apollo.BaseMutationOptions<
  PartnerRescheduleBookingMutationResponse,
  PartnerRescheduleBookingMutationVariables
>;
