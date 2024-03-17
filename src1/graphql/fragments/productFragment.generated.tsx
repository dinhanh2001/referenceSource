import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

import { MediaFragmentFragmentDoc } from './mediaFragment.generated';
export type ProductFragmentFragment = { __typename?: 'ProductEntity' } & Pick<
  Types.ProductEntity,
  | 'createdAt'
  | 'detail'
  | 'id'
  | 'isFixedCost'
  | 'isNew'
  | 'name'
  | 'operatingNumber'
  | 'operatingUnit'
  | 'ordinalNumber'
  | 'partnerId'
  | 'quantity'
  | 'serialNumber'
  | 'type'
  | 'unitPrice'
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
    reviewSummary?: Types.Maybe<
      { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'total' | 'starAverage' | 'percent'>
    >;
  };

export const ProductFragmentFragmentDoc = gql`
  fragment ProductFragment on ProductEntity {
    avatar {
      ...MediaFragment
    }
    createdAt
    detail
    id
    isFixedCost
    isNew
    name
    operatingNumber
    operatingUnit
    ordinalNumber
    partnerId
    quantity
    serialNumber
    type
    unitPrice
    updatedAt
    reviewSummary {
      total
      starAverage
      percent
    }
  }
  ${MediaFragmentFragmentDoc}
`;
