import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

import { MediaFragmentFragmentDoc } from './mediaFragment.generated';
export type PartnerFragmentFragment = { __typename?: 'PartnerEntity' } & Pick<
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
  | 'suggestionPoint'
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
    education?: Types.Maybe<
      { __typename?: 'CategoryEntity' } & Pick<
        Types.CategoryEntity,
        'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
      >
    >;
    expenseInfo?: Types.Maybe<{ __typename?: 'Expense' } & Pick<Types.Expense, 'cost' | 'distance' | 'time'>>;
    qualifications?: Types.Maybe<
      Array<
        { __typename?: 'CategoryEntity' } & Pick<
          Types.CategoryEntity,
          'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
        >
      >
    >;
    reviewSummary?: Types.Maybe<
      { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
    >;
    starInfo: Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>;
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
    createdAt
    deletedAt
    description
    education {
      createdAt
      deletedAt
      id
      isActive
      name
      type
      updatedAt
    }
    email
    expenseInfo {
      cost
      distance
      time
    }
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
    qualifications {
      createdAt
      deletedAt
      id
      isActive
      name
      type
      updatedAt
    }
    reviewSummary {
      percent
      starAverage
      total
    }
    starInfo {
      star
      total
    }
    suggestionPoint
    type
    updatedAt
  }
  ${MediaFragmentFragmentDoc}
`;
