import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCountProductQuotationForEachStatusQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PartnerCountProductQuotationForEachStatusQueryResponse = { __typename?: 'Query' } & {
  partnerCountProductQuotationForEachStatus: Array<
    { __typename?: 'ProductQuotationStatusAndItemCount' } & Pick<
      Types.ProductQuotationStatusAndItemCount,
      'status' | 'totalItem'
    >
  >;
};

export const PartnerCountProductQuotationForEachStatusDocument = gql`
  query partnerCountProductQuotationForEachStatus {
    partnerCountProductQuotationForEachStatus {
      status
      totalItem
    }
  }
`;
export function usePartnerCountProductQuotationForEachStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PartnerCountProductQuotationForEachStatusQueryResponse,
    PartnerCountProductQuotationForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PartnerCountProductQuotationForEachStatusQueryResponse,
    PartnerCountProductQuotationForEachStatusQueryVariables
  >(PartnerCountProductQuotationForEachStatusDocument, options);
}
export function usePartnerCountProductQuotationForEachStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerCountProductQuotationForEachStatusQueryResponse,
    PartnerCountProductQuotationForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PartnerCountProductQuotationForEachStatusQueryResponse,
    PartnerCountProductQuotationForEachStatusQueryVariables
  >(PartnerCountProductQuotationForEachStatusDocument, options);
}
export type PartnerCountProductQuotationForEachStatusQueryHookResult = ReturnType<
  typeof usePartnerCountProductQuotationForEachStatusQuery
>;
export type PartnerCountProductQuotationForEachStatusLazyQueryHookResult = ReturnType<
  typeof usePartnerCountProductQuotationForEachStatusLazyQuery
>;
export type PartnerCountProductQuotationForEachStatusQueryResult = Apollo.QueryResult<
  PartnerCountProductQuotationForEachStatusQueryResponse,
  PartnerCountProductQuotationForEachStatusQueryVariables
>;
