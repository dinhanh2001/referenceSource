import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type ReCreateBookingMutationVariables = Types.Exact<{
  input: Types.ReCreateBookingInput;
}>;

export type ReCreateBookingMutationResponse = { __typename?: 'Mutation' } & {
  reCreateBooking: { __typename?: 'BookingEntity' } & Pick<Types.BookingEntity, 'id'>;
};

export const ReCreateBookingDocument = gql`
  mutation reCreateBooking($input: ReCreateBookingInput!) {
    reCreateBooking(input: $input) {
      id
    }
  }
`;
export function useReCreateBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<ReCreateBookingMutationResponse, ReCreateBookingMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReCreateBookingMutationResponse, ReCreateBookingMutationVariables>(
    ReCreateBookingDocument,
    options,
  );
}
export type ReCreateBookingMutationHookResult = ReturnType<typeof useReCreateBookingMutation>;
export type ReCreateBookingMutationResult = Apollo.MutationResult<ReCreateBookingMutationResponse>;
export type ReCreateBookingMutationOptions = Apollo.BaseMutationOptions<
  ReCreateBookingMutationResponse,
  ReCreateBookingMutationVariables
>;
