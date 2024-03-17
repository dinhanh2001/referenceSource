import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type MaintenanceQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type MaintenanceQueryResponse = { __typename?: 'Query' } & {
  maintenance: { __typename?: 'MaintenanceEntity' } & Pick<
    Types.MaintenanceEntity,
    | 'addressMoreInfo'
    | 'code'
    | 'createdAt'
    | 'deletedAt'
    | 'endDate'
    | 'id'
    | 'isActive'
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
        > & {
            reasons?: Types.Maybe<
              Array<
                { __typename?: 'MaintenanceStatusCategoryEntity' } & Pick<
                  Types.MaintenanceStatusCategoryEntity,
                  'createdAt' | 'id' | 'maintenanceStatusId' | 'name' | 'type'
                >
              >
            >;
          }
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
        > & {
            maintenanceAcessories: Array<
              { __typename?: 'MaintenancesAccessoryEntity' } & Pick<
                Types.MaintenancesAccessoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'name' | 'quantity' | 'unit' | 'updatedAt'
              >
            >;
            vehicleType: { __typename?: 'CategoryEntity' } & Pick<
              Types.CategoryEntity,
              'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
            >;
          }
      >;
    };
};

export const MaintenanceDocument = gql`
  query maintenance($id: String!) {
    maintenance(id: $id) {
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
        reasons {
          createdAt
          id
          maintenanceStatusId
          name
          type
        }
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
        maintenanceAcessories {
          createdAt
          deletedAt
          id
          name
          quantity
          unit
          updatedAt
        }
        maintenanceAcessoryIds
        operatingNumber
        updatedAt
        vehicleType {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        vehicleTypeId
      }
      vehicleTypeCategoryId
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function useMaintenanceQuery(
  baseOptions: Apollo.QueryHookOptions<MaintenanceQueryResponse, MaintenanceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MaintenanceQueryResponse, MaintenanceQueryVariables>(MaintenanceDocument, options);
}
export function useMaintenanceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MaintenanceQueryResponse, MaintenanceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MaintenanceQueryResponse, MaintenanceQueryVariables>(MaintenanceDocument, options);
}
export type MaintenanceQueryHookResult = ReturnType<typeof useMaintenanceQuery>;
export type MaintenanceLazyQueryHookResult = ReturnType<typeof useMaintenanceLazyQuery>;
export type MaintenanceQueryResult = Apollo.QueryResult<MaintenanceQueryResponse, MaintenanceQueryVariables>;
