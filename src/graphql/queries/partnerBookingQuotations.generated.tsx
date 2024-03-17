import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerBookingQuotationsQueryVariables = Types.Exact<{
  bookingId: Types.Scalars['String'];
}>;

export type PartnerBookingQuotationsQueryResponse = { __typename?: 'Query' } & {
  partnerBookingQuotations: Array<
    { __typename?: 'QuotationEntity' } & Pick<
      Types.QuotationEntity,
      | 'bookingId'
      | 'createdAt'
      | 'deletedAt'
      | 'diagnosisFee'
      | 'diagnosisNote'
      | 'estimatedCompleteAt'
      | 'id'
      | 'operatingNumber'
      | 'operatingUnit'
      | 'rejectReasons'
      | 'repairFee'
      | 'status'
      | 'technicianId'
      | 'total'
      | 'transportFee'
      | 'updatedAt'
      | 'userId'
    > & {
        accessories: Array<
          { __typename?: 'QuotationAccessoryEntity' } & Pick<
            Types.QuotationAccessoryEntity,
            | 'available'
            | 'createdAt'
            | 'deletedAt'
            | 'id'
            | 'name'
            | 'quantity'
            | 'quotationId'
            | 'unit'
            | 'unitPrice'
            | 'updatedAt'
          >
        >;
        additionalFees: Array<
          { __typename?: 'QuotationAdditionalFeeEntity' } & Pick<
            Types.QuotationAdditionalFeeEntity,
            'amount' | 'createdAt' | 'deletedAt' | 'id' | 'name' | 'quotationId' | 'updatedAt'
          >
        >;
        diagnostics: Array<
          { __typename?: 'QuotationDiagnosticEntity' } & Pick<
            Types.QuotationDiagnosticEntity,
            'createdAt' | 'deletedAt' | 'diagnosticCode' | 'expense' | 'id' | 'quotationId' | 'updatedAt'
          >
        >;
      }
  >;
};

export const PartnerBookingQuotationsDocument = gql`
  query partnerBookingQuotations($bookingId: String!) {
    partnerBookingQuotations(bookingId: $bookingId) {
      accessories {
        available
        createdAt
        deletedAt
        id
        name
        quantity
        quotationId
        unit
        unitPrice
        updatedAt
      }
      additionalFees {
        amount
        createdAt
        deletedAt
        id
        name
        quotationId
        updatedAt
      }
      bookingId
      createdAt
      deletedAt
      diagnosisFee
      diagnosisNote
      diagnostics {
        createdAt
        deletedAt
        diagnosticCode
        expense
        id
        quotationId
        updatedAt
      }
      estimatedCompleteAt
      id
      operatingNumber
      operatingUnit
      rejectReasons
      repairFee
      status
      technicianId
      total
      transportFee
      updatedAt
      userId
    }
  }
`;
export function usePartnerBookingQuotationsQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerBookingQuotationsQueryResponse, PartnerBookingQuotationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerBookingQuotationsQueryResponse, PartnerBookingQuotationsQueryVariables>(
    PartnerBookingQuotationsDocument,
    options,
  );
}
export function usePartnerBookingQuotationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerBookingQuotationsQueryResponse,
    PartnerBookingQuotationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerBookingQuotationsQueryResponse, PartnerBookingQuotationsQueryVariables>(
    PartnerBookingQuotationsDocument,
    options,
  );
}
export type PartnerBookingQuotationsQueryHookResult = ReturnType<typeof usePartnerBookingQuotationsQuery>;
export type PartnerBookingQuotationsLazyQueryHookResult = ReturnType<typeof usePartnerBookingQuotationsLazyQuery>;
export type PartnerBookingQuotationsQueryResult = Apollo.QueryResult<
  PartnerBookingQuotationsQueryResponse,
  PartnerBookingQuotationsQueryVariables
>;
