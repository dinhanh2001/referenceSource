import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

import { MediaFragmentFragmentDoc } from './mediaFragment.generated';
export type UserFragmentFragment = { __typename?: 'UserEntity' } & Pick<
  Types.UserEntity,
  | 'address'
  | 'avatarId'
  | 'birthday'
  | 'certificate'
  | 'createdAt'
  | 'deletedAt'
  | 'email'
  | 'fullname'
  | 'id'
  | 'isActive'
  | 'phone'
  | 'totalBookings'
  | 'totalMaintenanceRequests'
  | 'totalOrders'
  | 'totalSpending'
  | 'updatedAt'
  | 'star'
> & {
    avatar?: Types.Maybe<
      { __typename?: 'Media' } & Pick<
        Types.Media,
        | 'createdAt'
        | 'fileSize'
        | 'fullOriginalUrl'
        | 'fullThumbUrl'
        | 'id'
        | 'isDeleted'
        | 'mimeType'
        | 'name'
        | 'originalUrl'
        | 'ownerId'
        | 'thumbUrl'
        | 'type'
        | 'updatedAt'
        | 'videoUrl'
      >
    >;
    userAddress?: Types.Maybe<
      { __typename?: 'AddressEntity' } & Pick<
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
      >
    >;
  };

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on UserEntity {
    address
    avatar {
      ...MediaFragment
    }
    avatarId
    birthday
    certificate
    createdAt
    deletedAt
    email
    fullname
    id
    isActive
    phone
    totalBookings
    totalMaintenanceRequests
    totalOrders
    totalSpending
    updatedAt
    star
    userAddress {
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
  }
  ${MediaFragmentFragmentDoc}
`;
