import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerSummaryQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PartnerSummaryQueryResponse = { __typename?: 'Query' } & {
  partnerSummary: { __typename?: 'PartnerSummary' } & Pick<
    Types.PartnerSummary,
    'totalBooking' | 'totalOrder' | 'totalProduct' | 'totalRevenue' | 'totalReview' | 'totalTechnician'
  >;
};

export const PartnerSummaryDocument = gql`
  query partnerSummary {
    partnerSummary {
      totalBooking
      totalOrder
      totalProduct
      totalRevenue
      totalReview
      totalTechnician
    }
  }
`;
export function usePartnerSummaryQuery(
  baseOptions?: Apollo.QueryHookOptions<PartnerSummaryQueryResponse, PartnerSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerSummaryQueryResponse, PartnerSummaryQueryVariables>(PartnerSummaryDocument, options);
}
export function usePartnerSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerSummaryQueryResponse, PartnerSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerSummaryQueryResponse, PartnerSummaryQueryVariables>(
    PartnerSummaryDocument,
    options,
  );
}
export type PartnerSummaryQueryHookResult = ReturnType<typeof usePartnerSummaryQuery>;
export type PartnerSummaryLazyQueryHookResult = ReturnType<typeof usePartnerSummaryLazyQuery>;
export type PartnerSummaryQueryResult = Apollo.QueryResult<PartnerSummaryQueryResponse, PartnerSummaryQueryVariables>;
