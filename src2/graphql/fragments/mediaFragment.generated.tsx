import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

export type MediaFragmentFragment = { __typename?: 'Media' } & Pick<
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
>;

export const MediaFragmentFragmentDoc = gql`
  fragment MediaFragment on Media {
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
    videoUrl
  }
`;
