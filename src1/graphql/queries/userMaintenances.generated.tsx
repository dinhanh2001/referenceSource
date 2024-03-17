import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type UserMaintenancesQueryVariables = Types.Exact<{
  endDate?: Types.InputMaybe<Types.Scalars['String']>;
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  startDate?: Types.InputMaybe<Types.Scalars['String']>;
  statuses?: Types.InputMaybe<Array<Types.MaintenanceStatusEnum> | Types.MaintenanceStatusEnum>;
}>;

export type UserMaintenancesQueryResponse = { __typename?: 'Query' } & {
  userMaintenances: { __typename?: 'MaintenanceConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'MaintenanceEntity' } & Pick<
          Types.MaintenanceEntity,
          | 'addressMoreInfo'
          | 'code'
          | 'createdAt'
          | 'deletedAt'
          | 'endDate'
          | 'id'
          | 'isActive'
          | 'latitude'
          | 'longitude'
          | 'maintenanceLevel'
          | 'mapAddress'
          | 'note'
          | 'startDate'
          | 'status'
          | 'updatedAt'
          | 'userId'
          | 'vehicleId'
          | 'vehicleTypeCategoryId'
        > & {
            accessories_available?: Types.Maybe<
              Array<
                { __typename?: 'MaintenanceAccessoryEntity' } & Pick<
                  Types.MaintenanceAccessoryEntity,
                  'accessoryId' | 'createdAt' | 'id' | 'isAvailable' | 'maintenanceId'
                >
              >
            >;
            statusDetail?: Types.Maybe<
              { __typename?: 'MaintenanceStatusEntity' } & Pick<
                Types.MaintenanceStatusEntity,
                'createdAt' | 'id' | 'maintenanceId' | 'note' | 'status' | 'userId'
              >
            >;
            vehicle?: Types.Maybe<
              { __typename?: 'VehicleEntity' } & Pick<
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
                }
            >;
            vehicleTypeCategory?: Types.Maybe<
              { __typename?: 'VechicleTypeCategoryEntity' } & Pick<
                Types.VechicleTypeCategoryEntity,
                | 'createdAt'
                | 'deletedAt'
                | 'id'
                | 'maintenanceAcessoryIds'
                | 'operatingNumber'
                | 'updatedAt'
                | 'vehicleTypeId'
              >
            >;
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const UserMaintenancesDocument = gql`
  query userMaintenances(
    $endDate: String
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $startDate: String
    $statuses: [MaintenanceStatusEnum!]
  ) {
    userMaintenances(
      endDate: $endDate
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      startDate: $startDate
      statuses: $statuses
    ) {
      items {
        accessories_available {
          accessoryId
          createdAt
          id
          isAvailable
          maintenanceId
        }
        addressMoreInfo
        code
        createdAt
        deletedAt
        endDate
        id
        isActive
        latitude
        longitude
        maintenanceLevel
        mapAddress
        note
        startDate
        status
        statusDetail {
          createdAt
          id
          maintenanceId
          note
          status
          userId
        }
        updatedAt
        userId
        vehicle {
          addressMoreInfo
          avatar {
            ...MediaFragment
          }
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
        }
        vehicleId
        vehicleTypeCategory {
          createdAt
          deletedAt
          id
          maintenanceAcessoryIds
          operatingNumber
          updatedAt
          vehicleTypeId
        }
        vehicleTypeCategoryId
      }
      meta {
        currentPage
        itemCount
        itemsPerPage
        totalItems
        totalPages
      }
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function useUserMaintenancesQuery(
  baseOptions?: Apollo.QueryHookOptions<UserMaintenancesQueryResponse, UserMaintenancesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserMaintenancesQueryResponse, UserMaintenancesQueryVariables>(
    UserMaintenancesDocument,
    options,
  );
}
export function useUserMaintenancesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserMaintenancesQueryResponse, UserMaintenancesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserMaintenancesQueryResponse, UserMaintenancesQueryVariables>(
    UserMaintenancesDocument,
    options,
  );
}
export type UserMaintenancesQueryHookResult = ReturnType<typeof useUserMaintenancesQuery>;
export type UserMaintenancesLazyQueryHookResult = ReturnType<typeof useUserMaintenancesLazyQuery>;
export type UserMaintenancesQueryResult = Apollo.QueryResult<
  UserMaintenancesQueryResponse,
  UserMaintenancesQueryVariables
>;
