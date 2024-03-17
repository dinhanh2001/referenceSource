import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetReportDetailBookingQueryVariables = Types.Exact<{
  endDate?: Types.InputMaybe<Types.Scalars['String']>;
  partnerId: Types.Scalars['String'];
  periodType: Types.PeriodTypeEnum;
  startDate?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type PartnerGetReportDetailBookingQueryResponse = { __typename?: 'Query' } & {
  partnerGetReportDetailBooking: { __typename?: 'PartnerReportBooking' } & Pick<
    Types.PartnerReportBooking,
    'settlementTotal'
  > & {
      dailySettlementReport?: Types.Maybe<
        Array<{ __typename?: 'ReportHistoryResDto' } & Pick<Types.ReportHistoryResDto, 'date' | 'revenue'>>
      >;
      settlementDetails?: Types.Maybe<
        Array<
          { __typename?: 'SettlementEntity' } & Pick<
            Types.SettlementEntity,
            'createdAt' | 'id' | 'invoiceId' | 'quotationId' | 'status' | 'technicianId' | 'total'
          > & {
              booking: { __typename?: 'BookingEntity' } & Pick<Types.BookingEntity, 'code'>;
              user: { __typename?: 'UserEntity' } & Pick<Types.UserEntity, 'fullname'>;
            }
        >
      >;
    };
};

export const PartnerGetReportDetailBookingDocument = gql`
  query partnerGetReportDetailBooking(
    $endDate: String
    $partnerId: String!
    $periodType: PeriodTypeEnum!
    $startDate: String
  ) {
    partnerGetReportDetailBooking(
      endDate: $endDate
      partnerId: $partnerId
      periodType: $periodType
      startDate: $startDate
    ) {
      dailySettlementReport {
        date
        revenue
      }
      settlementDetails {
        booking {
          code
        }
        createdAt
        id
        invoiceId
        quotationId
        status
        technicianId
        total
        user {
          fullname
        }
      }
      settlementTotal
    }
  }
`;
export function usePartnerGetReportDetailBookingQuery(
  baseOptions: Apollo.QueryHookOptions<
    PartnerGetReportDetailBookingQueryResponse,
    PartnerGetReportDetailBookingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetReportDetailBookingQueryResponse, PartnerGetReportDetailBookingQueryVariables>(
    PartnerGetReportDetailBookingDocument,
    options,
  );
}
export function usePartnerGetReportDetailBookingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerGetReportDetailBookingQueryResponse,
    PartnerGetReportDetailBookingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetReportDetailBookingQueryResponse, PartnerGetReportDetailBookingQueryVariables>(
    PartnerGetReportDetailBookingDocument,
    options,
  );
}
export type PartnerGetReportDetailBookingQueryHookResult = ReturnType<typeof usePartnerGetReportDetailBookingQuery>;
export type PartnerGetReportDetailBookingLazyQueryHookResult = ReturnType<
  typeof usePartnerGetReportDetailBookingLazyQuery
>;
export type PartnerGetReportDetailBookingQueryResult = Apollo.QueryResult<
  PartnerGetReportDetailBookingQueryResponse,
  PartnerGetReportDetailBookingQueryVariables
>;
