import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

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
  | 'updatedAt'
  | 'star'
> & { avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>> };

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on UserEntity {
    address
    avatar {
      fullThumbUrl
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
    updatedAt
    star
  }
`;
