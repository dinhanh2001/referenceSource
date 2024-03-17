import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { UserFragmentFragmentDoc } from '../fragments/userFragment.generated';

const defaultOptions = {} as const;
export type SocialLoginMutationVariables = Types.Exact<{
  input: Types.AuthSocialInput;
}>;

export type SocialLoginMutationResponse = { __typename?: 'Mutation' } & {
  socialLogin: { __typename?: 'AuthConnection' } & Pick<Types.AuthConnection, 'accessToken' | 'refreshToken'> & {
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

export const SocialLoginDocument = gql`
  mutation socialLogin($input: AuthSocialInput!) {
    socialLogin(input: $input) {
      accessToken
      refreshToken
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export function useSocialLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<SocialLoginMutationResponse, SocialLoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SocialLoginMutationResponse, SocialLoginMutationVariables>(SocialLoginDocument, options);
}
export type SocialLoginMutationHookResult = ReturnType<typeof useSocialLoginMutation>;
export type SocialLoginMutationResult = Apollo.MutationResult<SocialLoginMutationResponse>;
export type SocialLoginMutationOptions = Apollo.BaseMutationOptions<
  SocialLoginMutationResponse,
  SocialLoginMutationVariables
>;
