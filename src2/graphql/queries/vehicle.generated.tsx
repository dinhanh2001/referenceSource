import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type VehicleQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type VehicleQueryResponse = { __typename?: 'Query' } & {
  vehicle: { __typename?: 'VehicleEntity' } & Pick<
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
      manufacturer?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      model?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      origin?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      vehicleType?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
    };
};

export const VehicleDocument = gql`
  query vehicle($id: String!) {
    vehicle(id: $id) {
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
      manufacturer {
        id
        name
      }
      mapAddress
      model {
        id
        name
      }
      name
      operatingNumber
      operatingUnit
      ordinalNumber
      origin {
        id
        name
      }
      serialNumber
      updatedAt
      userId
      vehicleRegistrationPlate
      vehicleType {
        id
        name
      }
      vinNumber
      yearOfManufacture
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function useVehicleQuery(baseOptions: Apollo.QueryHookOptions<VehicleQueryResponse, VehicleQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VehicleQueryResponse, VehicleQueryVariables>(VehicleDocument, options);
}
export function useVehicleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VehicleQueryResponse, VehicleQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VehicleQueryResponse, VehicleQueryVariables>(VehicleDocument, options);
}
export type VehicleQueryHookResult = ReturnType<typeof useVehicleQuery>;
export type VehicleLazyQueryHookResult = ReturnType<typeof useVehicleLazyQuery>;
export type VehicleQueryResult = Apollo.QueryResult<VehicleQueryResponse, VehicleQueryVariables>;
