import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

import { MediaFragmentFragmentDoc } from './avatar.fragment.generated';
export type PartnerFragmentFragment = { __typename?: 'PartnerEntity' } & Pick<
  Types.PartnerEntity,
  | 'addressMoreInfo'
  | 'avatarId'
  | 'bank'
  | 'birthday'
  | 'cardNumber'
  | 'citizenId'
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
  | 'phone'
  | 'type'
  | 'star'
  | 'parentId'
  | 'menus'
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
    education?: Types.Maybe<
      { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
    >;
    level?: Types.Maybe<
      { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
    >;
    parentInfo?: Types.Maybe<
      { __typename?: 'PartnerEntity' } & {
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
      }
    >;
    qualifications?: Types.Maybe<
      Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
    >;
  };

export const PartnerFragmentFragmentDoc = gql`
  fragment PartnerFragment on PartnerEntity {
    addressMoreInfo
    avatar {
      ...MediaFragment
    }
    avatarId
    bank
    birthday
    cardNumber
    citizenId
    description
    education {
      id
      isActive
      name
      type
    }
    email
    fullname
    hotline
    id
    isActive
    isApproved
    latitude
    level {
      id
      isActive
      name
      type
    }
    longitude
    mapAddress
    phone
    type
    star
    parentId
    parentInfo {
      avatar {
        ...MediaFragment
      }
    }
    qualifications {
      id
      isActive
      name
      type
    }
    menus
  }
  ${MediaFragmentFragmentDoc}
`;
