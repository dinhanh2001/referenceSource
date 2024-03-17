import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

import { MediaFragmentFragmentDoc } from './mediaFragment.generated';
import { UserFragmentFragmentDoc } from './userFragment.generated';
export type BookingFragmentFragment = { __typename?: 'BookingEntity' } & Pick<
  Types.BookingEntity,
  | 'addressMoreInfo'
  | 'code'
  | 'createdAt'
  | 'deletedAt'
  | 'description'
  | 'id'
  | 'latitude'
  | 'longitude'
  | 'mapAddress'
  | 'technicianId'
  | 'transportFee'
  | 'transportDuration'
  | 'transportDistance'
  | 'partnerId'
  | 'problemTexts'
  | 'status'
  | 'updatedAt'
  | 'vehicleId'
  | 'scheduleTime'
  | 'scheduleReason'
  | 'userCanReviewTechnician'
> & {
    medias: Array<
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
    user: { __typename?: 'UserEntity' } & Pick<
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
    partner: { __typename?: 'PartnerEntity' } & Pick<
      Types.PartnerEntity,
      | 'addressMoreInfo'
      | 'avatarId'
      | 'bank'
      | 'birthday'
      | 'cardNumber'
      | 'citizenId'
      | 'createdAt'
      | 'deletedAt'
      | 'description'
      | 'email'
      | 'fullname'
      | 'hotline'
      | 'id'
      | 'isActive'
      | 'isApproved'
      | 'latitude'
      | 'longitude'
      | 'mapAddress'
      | 'parentId'
      | 'phone'
      | 'type'
      | 'updatedAt'
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
        qualifications?: Types.Maybe<
          Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
        >;
        reviewSummary?: Types.Maybe<
          { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
        >;
      };
    technician?: Types.Maybe<
      { __typename?: 'PartnerEntity' } & Pick<
        Types.PartnerEntity,
        | 'addressMoreInfo'
        | 'avatarId'
        | 'bank'
        | 'birthday'
        | 'cardNumber'
        | 'citizenId'
        | 'createdAt'
        | 'deletedAt'
        | 'description'
        | 'email'
        | 'fullname'
        | 'hotline'
        | 'id'
        | 'isActive'
        | 'isApproved'
        | 'latitude'
        | 'longitude'
        | 'mapAddress'
        | 'parentId'
        | 'phone'
        | 'type'
        | 'updatedAt'
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
          qualifications?: Types.Maybe<
            Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
          >;
          reviewSummary?: Types.Maybe<
            { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
          >;
        }
    >;
    problems?: Types.Maybe<
      Array<
        { __typename?: 'CategoryEntity' } & Pick<
          Types.CategoryEntity,
          'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
        >
      >
    >;
    statusDetail?: Types.Maybe<
      { __typename?: 'BookingStatusEntity' } & Pick<
        Types.BookingStatusEntity,
        | 'bookingId'
        | 'createdAt'
        | 'id'
        | 'note'
        | 'partnerId'
        | 'scheduleReason'
        | 'scheduleTime'
        | 'status'
        | 'userId'
      > & {
          reasons?: Types.Maybe<
            Array<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >
          >;
        }
    >;
    vehicle: { __typename?: 'VehicleEntity' } & Pick<
      Types.VehicleEntity,
      | 'addressMoreInfo'
      | 'avatarId'
      | 'createdAt'
      | 'deletedAt'
      | 'detail'
      | 'hidden'
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
      | 'userId'
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
            | 'videoUrl'
          >
        >;
      };
    settlementAccepted?: Types.Maybe<
      { __typename?: 'SettlementEntity' } & Pick<Types.SettlementEntity, 'id' | 'quotationId'>
    >;
  };

export const BookingFragmentFragmentDoc = gql`
  fragment BookingFragment on BookingEntity {
    addressMoreInfo
    code
    createdAt
    deletedAt
    description
    id
    latitude
    longitude
    mapAddress
    technicianId
    transportFee
    transportDuration
    transportDistance
    medias {
      ...MediaFragment
    }
    user {
      ...UserFragment
    }
    partner {
      addressMoreInfo
      avatarId
      avatar {
        ...MediaFragment
      }
      qualifications {
        id
        isActive
        name
        type
      }
      bank
      birthday
      cardNumber
      citizenId
      createdAt
      deletedAt
      description
      email
      fullname
      hotline
      id
      isActive
      isApproved
      latitude
      longitude
      mapAddress
      parentId
      phone
      type
      updatedAt
      reviewSummary {
        starAverage
        total
        percent
      }
    }
    technician {
      addressMoreInfo
      avatarId
      avatar {
        ...MediaFragment
      }
      qualifications {
        id
        isActive
        name
        type
      }
      bank
      birthday
      cardNumber
      citizenId
      createdAt
      deletedAt
      description
      email
      fullname
      hotline
      id
      isActive
      isApproved
      latitude
      longitude
      mapAddress
      parentId
      phone
      type
      updatedAt
      reviewSummary {
        starAverage
        total
        percent
      }
    }
    partnerId
    problemTexts
    problems {
      createdAt
      deletedAt
      id
      isActive
      name
      type
      updatedAt
    }
    status
    statusDetail {
      bookingId
      createdAt
      id
      note
      partnerId
      reasons {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
      scheduleReason
      scheduleTime
      status
      userId
    }
    updatedAt
    vehicle {
      addressMoreInfo
      avatarId
      createdAt
      deletedAt
      detail
      hidden
      id
      latitude
      longitude
      mapAddress
      name
      operatingNumber
      operatingUnit
      ordinalNumber
      serialNumber
      updatedAt
      userId
      vehicleRegistrationPlate
      vinNumber
      yearOfManufacture
      avatar {
        ...MediaFragment
      }
    }
    vehicleId
    scheduleTime
    scheduleReason
    userCanReviewTechnician
    settlementAccepted {
      id
      quotationId
    }
  }
  ${MediaFragmentFragmentDoc}
  ${UserFragmentFragmentDoc}
`;
