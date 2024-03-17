import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { UserFragmentFragmentDoc } from '../fragments/userFragment.generated';

const defaultOptions = {} as const;
export type UserLoginMutationVariables = Types.Exact<{
  input: Types.UserLoginInput;
}>;

export type UserLoginMutationResponse = { __typename?: 'Mutation' } & {
  userLogin: { __typename?: 'AuthConnection' } & Pick<Types.AuthConnection, 'accessToken' | 'refreshToken'> & {
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
    };
};

export const UserLoginDocument = gql`
  mutation userLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      accessToken
      refreshToken
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export function useUserLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<UserLoginMutationResponse, UserLoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserLoginMutationResponse, UserLoginMutationVariables>(UserLoginDocument, options);
}
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutationResponse>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<
  UserLoginMutationResponse,
  UserLoginMutationVariables
>;
