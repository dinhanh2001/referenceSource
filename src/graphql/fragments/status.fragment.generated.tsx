import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

export type BookingStatusFragmentFragment = { __typename?: 'BookingStatusEntity' } & Pick<
  Types.BookingStatusEntity,
  'bookingId' | 'createdAt' | 'id' | 'note' | 'partnerId' | 'status' | 'userId'
>;

export const BookingStatusFragmentFragmentDoc = gql`
  fragment BookingStatusFragment on BookingStatusEntity {
    bookingId
    createdAt
    id
    note
    partnerId
    status
    userId
  }
`;
