import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

export type AddressFragmentFragment = { __typename?: 'AddressEntity' } & Pick<
  Types.AddressEntity,
  | 'addressDetail'
  | 'addressName'
  | 'contactName'
  | 'contactPhone'
  | 'createdAt'
  | 'deletedAt'
  | 'id'
  | 'isDefault'
  | 'latitude'
  | 'longitude'
  | 'mapAddress'
  | 'updatedAt'
  | 'userId'
>;

export const AddressFragmentFragmentDoc = gql`
  fragment AddressFragment on AddressEntity {
    addressDetail
    addressName
    contactName
    contactPhone
    createdAt
    deletedAt
    id
    isDefault
    latitude
    longitude
    mapAddress
    updatedAt
    userId
  }
`;
