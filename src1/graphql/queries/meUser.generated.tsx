import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { UserFragmentFragmentDoc } from '../fragments/userFragment.generated';

const defaultOptions = {} as const;
export type MeUserQueryVariables = Types.Exact<{
  deviceId?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type MeUserQueryResponse = { __typename?: 'Query' } & {
  meUser: { __typename?: 'UserEntity' } & Pick<
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

export const MeUserDocument = gql`
  query meUser($deviceId: String) {
    meUser(deviceId: $deviceId) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export function useMeUserQuery(baseOptions?: Apollo.QueryHookOptions<MeUserQueryResponse, MeUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeUserQueryResponse, MeUserQueryVariables>(MeUserDocument, options);
}
export function useMeUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeUserQueryResponse, MeUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeUserQueryResponse, MeUserQueryVariables>(MeUserDocument, options);
}
export type MeUserQueryHookResult = ReturnType<typeof useMeUserQuery>;
export type MeUserLazyQueryHookResult = ReturnType<typeof useMeUserLazyQuery>;
export type MeUserQueryResult = Apollo.QueryResult<MeUserQueryResponse, MeUserQueryVariables>;
