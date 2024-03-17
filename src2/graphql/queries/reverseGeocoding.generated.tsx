import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type ReverseGeocodingQueryVariables = Types.Exact<{
  input: Types.LatLng;
}>;

export type ReverseGeocodingQueryResponse = { __typename?: 'Query' } & {
  reverseGeocoding: Array<
    { __typename?: 'ReverseGeocoding' } & Pick<Types.ReverseGeocoding, 'address' | 'lat' | 'lng' | 'name' | 'place_id'>
  >;
};

export const ReverseGeocodingDocument = gql`
  query reverseGeocoding($input: LatLng!) {
    reverseGeocoding(input: $input) {
      address
      lat
      lng
      name
      place_id
    }
  }
`;
export function useReverseGeocodingQuery(
  baseOptions: Apollo.QueryHookOptions<ReverseGeocodingQueryResponse, ReverseGeocodingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReverseGeocodingQueryResponse, ReverseGeocodingQueryVariables>(
    ReverseGeocodingDocument,
    options,
  );
}
export function useReverseGeocodingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReverseGeocodingQueryResponse, ReverseGeocodingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReverseGeocodingQueryResponse, ReverseGeocodingQueryVariables>(
    ReverseGeocodingDocument,
    options,
  );
}
export type ReverseGeocodingQueryHookResult = ReturnType<typeof useReverseGeocodingQuery>;
export type ReverseGeocodingLazyQueryHookResult = ReturnType<typeof useReverseGeocodingLazyQuery>;
export type ReverseGeocodingQueryResult = Apollo.QueryResult<
  ReverseGeocodingQueryResponse,
  ReverseGeocodingQueryVariables
>;
