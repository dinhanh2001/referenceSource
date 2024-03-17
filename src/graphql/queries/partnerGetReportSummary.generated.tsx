import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetReportSummaryQueryVariables = Types.Exact<{
  endDate?: Types.InputMaybe<Types.Scalars['String']>;
  partnerId: Types.Scalars['String'];
  periodType: Types.PeriodTypeEnum;
  startDate?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type PartnerGetReportSummaryQueryResponse = { __typename?: 'Query' } & {
  partnerGetReportSummary: { __typename?: 'PartnerReportSummary' } & Pick<
    Types.PartnerReportSummary,
    'totalRevenue' | 'totalRevenueOrder' | 'totalRevenueSettlement'
  > & {
      histories: Array<{ __typename?: 'ReportHistoryResDto' } & Pick<Types.ReportHistoryResDto, 'date' | 'revenue'>>;
    };
};

export const PartnerGetReportSummaryDocument = gql`
  query partnerGetReportSummary(
    $endDate: String
    $partnerId: String!
    $periodType: PeriodTypeEnum!
    $startDate: String
  ) {
    partnerGetReportSummary(endDate: $endDate, partnerId: $partnerId, periodType: $periodType, startDate: $startDate) {
      histories {
        date
        revenue
      }
      totalRevenue
      totalRevenueOrder
      totalRevenueSettlement
    }
  }
`;
export function usePartnerGetReportSummaryQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetReportSummaryQueryResponse, PartnerGetReportSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetReportSummaryQueryResponse, PartnerGetReportSummaryQueryVariables>(
    PartnerGetReportSummaryDocument,
    options,
  );
}
export function usePartnerGetReportSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerGetReportSummaryQueryResponse,
    PartnerGetReportSummaryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetReportSummaryQueryResponse, PartnerGetReportSummaryQueryVariables>(
    PartnerGetReportSummaryDocument,
    options,
  );
}
export type PartnerGetReportSummaryQueryHookResult = ReturnType<typeof usePartnerGetReportSummaryQuery>;
export type PartnerGetReportSummaryLazyQueryHookResult = ReturnType<typeof usePartnerGetReportSummaryLazyQuery>;
export type PartnerGetReportSummaryQueryResult = Apollo.QueryResult<
  PartnerGetReportSummaryQueryResponse,
  PartnerGetReportSummaryQueryVariables
>;
