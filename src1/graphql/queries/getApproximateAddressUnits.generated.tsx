import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type GetApproximateAddressUnitsQueryVariables = Types.Exact<{
  input: Types.ApproximateAddressUnitsArgs;
}>;

export type GetApproximateAddressUnitsQueryResponse = { __typename?: 'Query' } & {
  getApproximateAddressUnits: { __typename?: 'ApproximateAddressUnits' } & {
    district: { __typename?: 'DistrictOutput' } & Pick<
      Types.DistrictOutput,
      'code' | 'codename' | 'divisionType' | 'name' | 'shortCodename'
    >;
    province: { __typename?: 'ProvinceOutput' } & Pick<
      Types.ProvinceOutput,
      'code' | 'codename' | 'divisionType' | 'name'
    >;
    ward: { __typename?: 'WardOutput' } & Pick<
      Types.WardOutput,
      'code' | 'codename' | 'divisionType' | 'name' | 'shortCodename'
    >;
  };
};

export const GetApproximateAddressUnitsDocument = gql`
  query getApproximateAddressUnits($input: ApproximateAddressUnitsArgs!) {
    getApproximateAddressUnits(input: $input) {
      district {
        code
        codename
        divisionType
        name
        shortCodename
      }
      province {
        code
        codename
        divisionType
        name
      }
      ward {
        code
        codename
        divisionType
        name
        shortCodename
      }
    }
  }
`;
export function useGetApproximateAddressUnitsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetApproximateAddressUnitsQueryResponse,
    GetApproximateAddressUnitsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetApproximateAddressUnitsQueryResponse, GetApproximateAddressUnitsQueryVariables>(
    GetApproximateAddressUnitsDocument,
    options,
  );
}
export function useGetApproximateAddressUnitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetApproximateAddressUnitsQueryResponse,
    GetApproximateAddressUnitsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetApproximateAddressUnitsQueryResponse, GetApproximateAddressUnitsQueryVariables>(
    GetApproximateAddressUnitsDocument,
    options,
  );
}
export type GetApproximateAddressUnitsQueryHookResult = ReturnType<typeof useGetApproximateAddressUnitsQuery>;
export type GetApproximateAddressUnitsLazyQueryHookResult = ReturnType<typeof useGetApproximateAddressUnitsLazyQuery>;
export type GetApproximateAddressUnitsQueryResult = Apollo.QueryResult<
  GetApproximateAddressUnitsQueryResponse,
  GetApproximateAddressUnitsQueryVariables
>;
