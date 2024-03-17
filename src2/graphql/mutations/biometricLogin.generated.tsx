import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { UserFragmentFragmentDoc } from '../fragments/userFragment.generated';

const defaultOptions = {} as const;
export type BiometricLoginMutationVariables = Types.Exact<{
  input: Types.BiometricLoginInput;
}>;

export type BiometricLoginMutationResponse = { __typename?: 'Mutation' } & {
  biometricLogin: { __typename?: 'AuthConnection' } & Pick<Types.AuthConnection, 'accessToken' | 'refreshToken'> & {
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

export const BiometricLoginDocument = gql`
  mutation biometricLogin($input: BiometricLoginInput!) {
    biometricLogin(input: $input) {
      accessToken
      refreshToken
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export function useBiometricLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<BiometricLoginMutationResponse, BiometricLoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BiometricLoginMutationResponse, BiometricLoginMutationVariables>(
    BiometricLoginDocument,
    options,
  );
}
export type BiometricLoginMutationHookResult = ReturnType<typeof useBiometricLoginMutation>;
export type BiometricLoginMutationResult = Apollo.MutationResult<BiometricLoginMutationResponse>;
export type BiometricLoginMutationOptions = Apollo.BaseMutationOptions<
  BiometricLoginMutationResponse,
  BiometricLoginMutationVariables
>;
