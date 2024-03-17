import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCancelBookingMutationVariables = Types.Exact<{
  input: Types.CancelBookingInput;
}>;

export type PartnerCancelBookingMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerCancelBooking'
>;

export const PartnerCancelBookingDocument = gql`
  mutation partnerCancelBooking($input: CancelBookingInput!) {
    partnerCancelBooking(input: $input)
  }
`;
export function usePartnerCancelBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerCancelBookingMutationResponse, PartnerCancelBookingMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerCancelBookingMutationResponse, PartnerCancelBookingMutationVariables>(
    PartnerCancelBookingDocument,
    options,
  );
}
export type PartnerCancelBookingMutationHookResult = ReturnType<typeof usePartnerCancelBookingMutation>;
export type PartnerCancelBookingMutationResult = Apollo.MutationResult<PartnerCancelBookingMutationResponse>;
export type PartnerCancelBookingMutationOptions = Apollo.BaseMutationOptions<
  PartnerCancelBookingMutationResponse,
  PartnerCancelBookingMutationVariables
>;
