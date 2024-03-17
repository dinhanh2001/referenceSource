import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetVehicleTypeCategoriesQueryVariables = Types.Exact<{
  input: Types.UserGetVehicleTypeCategories;
}>;

export type UserGetVehicleTypeCategoriesQueryResponse = { __typename?: 'Query' } & {
  userGetVehicleTypeCategories: Array<
    { __typename?: 'VechicleTypeCategoryEntity' } & Pick<
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
      }
  >;
};

export const UserGetVehicleTypeCategoriesDocument = gql`
  query userGetVehicleTypeCategories($input: UserGetVehicleTypeCategories!) {
    userGetVehicleTypeCategories(input: $input) {
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
export function useUserGetVehicleTypeCategoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserGetVehicleTypeCategoriesQueryResponse,
    UserGetVehicleTypeCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetVehicleTypeCategoriesQueryResponse, UserGetVehicleTypeCategoriesQueryVariables>(
    UserGetVehicleTypeCategoriesDocument,
    options,
  );
}
export function useUserGetVehicleTypeCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserGetVehicleTypeCategoriesQueryResponse,
    UserGetVehicleTypeCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetVehicleTypeCategoriesQueryResponse, UserGetVehicleTypeCategoriesQueryVariables>(
    UserGetVehicleTypeCategoriesDocument,
    options,
  );
}
export type UserGetVehicleTypeCategoriesQueryHookResult = ReturnType<typeof useUserGetVehicleTypeCategoriesQuery>;
export type UserGetVehicleTypeCategoriesLazyQueryHookResult = ReturnType<
  typeof useUserGetVehicleTypeCategoriesLazyQuery
>;
export type UserGetVehicleTypeCategoriesQueryResult = Apollo.QueryResult<
  UserGetVehicleTypeCategoriesQueryResponse,
  UserGetVehicleTypeCategoriesQueryVariables
>;
