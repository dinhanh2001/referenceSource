import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCountItemForEachStatusQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PartnerCountItemForEachStatusQueryResponse = { __typename?: 'Query' } & {
  partnerCountItemForEachStatus: Array<
    { __typename?: 'StatusAndItemCount' } & Pick<Types.StatusAndItemCount, 'status' | 'totalitems'>
  >;
};

export const PartnerCountItemForEachStatusDocument = gql`
  query partnerCountItemForEachStatus {
    partnerCountItemForEachStatus {
      status
      totalitems
    }
  }
`;
export function usePartnerCountItemForEachStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PartnerCountItemForEachStatusQueryResponse,
    PartnerCountItemForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerCountItemForEachStatusQueryResponse, PartnerCountItemForEachStatusQueryVariables>(
    PartnerCountItemForEachStatusDocument,
    options,
  );
}
export function usePartnerCountItemForEachStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerCountItemForEachStatusQueryResponse,
    PartnerCountItemForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerCountItemForEachStatusQueryResponse, PartnerCountItemForEachStatusQueryVariables>(
    PartnerCountItemForEachStatusDocument,
    options,
  );
}
export type PartnerCountItemForEachStatusQueryHookResult = ReturnType<typeof usePartnerCountItemForEachStatusQuery>;
export type PartnerCountItemForEachStatusLazyQueryHookResult = ReturnType<
  typeof usePartnerCountItemForEachStatusLazyQuery
>;
export type PartnerCountItemForEachStatusQueryResult = Apollo.QueryResult<
  PartnerCountItemForEachStatusQueryResponse,
  PartnerCountItemForEachStatusQueryVariables
>;
