import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

export type VehicleFragmentFragment = { __typename?: 'VehicleEntity' } & Pick<
  Types.VehicleEntity,
  | 'addressMoreInfo'
  | 'avatarId'
  | 'createdAt'
  | 'deletedAt'
  | 'detail'
  | 'id'
  | 'latitude'
  | 'longitude'
  | 'mapAddress'
  | 'name'
  | 'operatingNumber'
  | 'operatingUnit'
  | 'ordinalNumber'
  | 'serialNumber'
  | 'updatedAt'
  | 'vehicleRegistrationPlate'
  | 'vinNumber'
  | 'yearOfManufacture'
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
      >
    >;
    manufacturer?: Types.Maybe<
      { __typename?: 'CategoryEntity' } & Pick<
        Types.CategoryEntity,
        'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
      >
    >;
    model?: Types.Maybe<
      { __typename?: 'CategoryEntity' } & Pick<
        Types.CategoryEntity,
        'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
      >
    >;
    origin?: Types.Maybe<
      { __typename?: 'CategoryEntity' } & Pick<
        Types.CategoryEntity,
        'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
      >
    >;
    vehicleType?: Types.Maybe<
      { __typename?: 'CategoryEntity' } & Pick<
        Types.CategoryEntity,
        'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
      >
    >;
  };

export const VehicleFragmentFragmentDoc = gql`
  fragment VehicleFragment on VehicleEntity {
    addressMoreInfo
    avatar {
      createdAt
      fileSize
      fullOriginalUrl
      fullThumbUrl
      id
      isDeleted
      mimeType
      name
      originalUrl
      ownerId
      thumbUrl
      type
      updatedAt
    }
    avatarId
    createdAt
    deletedAt
    detail
    id
    latitude
    longitude
    manufacturer {
      createdAt
      deletedAt
      id
      isActive
      name
      type
      updatedAt
    }
    mapAddress
    model {
      createdAt
      deletedAt
      id
      isActive
      name
      type
      updatedAt
    }
    name
    operatingNumber
    operatingUnit
    ordinalNumber
    origin {
      createdAt
      deletedAt
      id
      isActive
      name
      type
      updatedAt
    }
    serialNumber
    updatedAt
    vehicleRegistrationPlate
    vehicleType {
      createdAt
      deletedAt
      id
      isActive
      name
      type
      updatedAt
    }
    vinNumber
    yearOfManufacture
  }
`;
