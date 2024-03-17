import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetVehicleTypeCategoryQueryVariables = Types.Exact<{
  input: Types.UserGetVehicleTypeCategory;
}>;

export type UserGetVehicleTypeCategoryQueryResponse = { __typename?: 'Query' } & {
  userGetVehicleTypeCategory: { __typename?: 'VechicleTypeCategoryEntity' } & Pick<
    Types.VechicleTypeCategoryEntity,
    'createdAt' | 'deletedAt' | 'id' | 'maintenanceAcessoryIds' | 'operatingNumber' | 'updatedAt' | 'vehicleTypeId'
  > & {
      maintenanceAcessories: Array<
        { __typename?: 'MaintenancesAccessoryEntity' } & Pick<
          Types.MaintenancesAccessoryEntity,
          'id' | 'name' | 'quantity' | 'unit'
        >
      >;
      vehicleType: { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>;
      model: { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>;
    };
};

export const UserGetVehicleTypeCategoryDocument = gql`
  query userGetVehicleTypeCategory($input: UserGetVehicleTypeCategory!) {
    userGetVehicleTypeCategory(input: $input) {
      createdAt
      deletedAt
      id
      maintenanceAcessories {
        id
        name
        quantity
        unit
      }
      maintenanceAcessoryIds
      operatingNumber
      updatedAt
      vehicleType {
        id
        name
      }
      model {
        id
        name
      }
      vehicleTypeId
    }
  }
`;
export function useUserGetVehicleTypeCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserGetVehicleTypeCategoryQueryResponse,
    UserGetVehicleTypeCategoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetVehicleTypeCategoryQueryResponse, UserGetVehicleTypeCategoryQueryVariables>(
    UserGetVehicleTypeCategoryDocument,
    options,
  );
}
export function useUserGetVehicleTypeCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserGetVehicleTypeCategoryQueryResponse,
    UserGetVehicleTypeCategoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetVehicleTypeCategoryQueryResponse, UserGetVehicleTypeCategoryQueryVariables>(
    UserGetVehicleTypeCategoryDocument,
    options,
  );
}
export type UserGetVehicleTypeCategoryQueryHookResult = ReturnType<typeof useUserGetVehicleTypeCategoryQuery>;
export type UserGetVehicleTypeCategoryLazyQueryHookResult = ReturnType<typeof useUserGetVehicleTypeCategoryLazyQuery>;
export type UserGetVehicleTypeCategoryQueryResult = Apollo.QueryResult<
  UserGetVehicleTypeCategoryQueryResponse,
  UserGetVehicleTypeCategoryQueryVariables
>;
