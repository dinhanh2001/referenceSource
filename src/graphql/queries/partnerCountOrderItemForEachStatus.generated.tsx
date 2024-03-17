import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCountOrderItemForEachStatusQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PartnerCountOrderItemForEachStatusQueryResponse = { __typename?: 'Query' } & {
  partnerCountOrderItemForEachStatus: Array<
    { __typename?: 'OrderStatusAndItemCount' } & Pick<Types.OrderStatusAndItemCount, 'status' | 'totalItem'>
  >;
};

export const PartnerCountOrderItemForEachStatusDocument = gql`
  query partnerCountOrderItemForEachStatus {
    partnerCountOrderItemForEachStatus {
      status
      totalItem
    }
  }
`;
export function usePartnerCountOrderItemForEachStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PartnerCountOrderItemForEachStatusQueryResponse,
    PartnerCountOrderItemForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PartnerCountOrderItemForEachStatusQueryResponse,
    PartnerCountOrderItemForEachStatusQueryVariables
  >(PartnerCountOrderItemForEachStatusDocument, options);
}
export function usePartnerCountOrderItemForEachStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerCountOrderItemForEachStatusQueryResponse,
    PartnerCountOrderItemForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PartnerCountOrderItemForEachStatusQueryResponse,
    PartnerCountOrderItemForEachStatusQueryVariables
  >(PartnerCountOrderItemForEachStatusDocument, options);
}
export type PartnerCountOrderItemForEachStatusQueryHookResult = ReturnType<
  typeof usePartnerCountOrderItemForEachStatusQuery
>;
export type PartnerCountOrderItemForEachStatusLazyQueryHookResult = ReturnType<
  typeof usePartnerCountOrderItemForEachStatusLazyQuery
>;
export type PartnerCountOrderItemForEachStatusQueryResult = Apollo.QueryResult<
  PartnerCountOrderItemForEachStatusQueryResponse,
  PartnerCountOrderItemForEachStatusQueryVariables
>;
