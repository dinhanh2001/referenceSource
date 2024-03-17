import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetReportDetailOrderQueryVariables = Types.Exact<{
  endDate?: Types.InputMaybe<Types.Scalars['String']>;
  partnerId: Types.Scalars['String'];
  periodType: Types.PeriodTypeEnum;
  startDate?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type PartnerGetReportDetailOrderQueryResponse = { __typename?: 'Query' } & {
  partnerGetReportDetailOrder: { __typename?: 'PartnerReportOrder' } & Pick<Types.PartnerReportOrder, 'orderTotal'> & {
      dailyOrderReport?: Types.Maybe<
        Array<{ __typename?: 'ReportHistoryResDto' } & Pick<Types.ReportHistoryResDto, 'date' | 'revenue'>>
      >;
      orderDetails?: Types.Maybe<
        Array<
          { __typename?: 'OrderEntity' } & Pick<
            Types.OrderEntity,
            'code' | 'createdAt' | 'id' | 'partnerId' | 'shippingFee' | 'status' | 'total'
          >
        >
      >;
    };
};

export const PartnerGetReportDetailOrderDocument = gql`
  query partnerGetReportDetailOrder(
    $endDate: String
    $partnerId: String!
    $periodType: PeriodTypeEnum!
    $startDate: String
  ) {
    partnerGetReportDetailOrder(
      endDate: $endDate
      partnerId: $partnerId
      periodType: $periodType
      startDate: $startDate
    ) {
      dailyOrderReport {
        date
        revenue
      }
      orderDetails {
        code
        createdAt
        id
        partnerId
        shippingFee
        status
        total
      }
      orderTotal
    }
  }
`;
export function usePartnerGetReportDetailOrderQuery(
  baseOptions: Apollo.QueryHookOptions<
    PartnerGetReportDetailOrderQueryResponse,
    PartnerGetReportDetailOrderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetReportDetailOrderQueryResponse, PartnerGetReportDetailOrderQueryVariables>(
    PartnerGetReportDetailOrderDocument,
    options,
  );
}
export function usePartnerGetReportDetailOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerGetReportDetailOrderQueryResponse,
    PartnerGetReportDetailOrderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetReportDetailOrderQueryResponse, PartnerGetReportDetailOrderQueryVariables>(
    PartnerGetReportDetailOrderDocument,
    options,
  );
}
export type PartnerGetReportDetailOrderQueryHookResult = ReturnType<typeof usePartnerGetReportDetailOrderQuery>;
export type PartnerGetReportDetailOrderLazyQueryHookResult = ReturnType<typeof usePartnerGetReportDetailOrderLazyQuery>;
export type PartnerGetReportDetailOrderQueryResult = Apollo.QueryResult<
  PartnerGetReportDetailOrderQueryResponse,
  PartnerGetReportDetailOrderQueryVariables
>;
