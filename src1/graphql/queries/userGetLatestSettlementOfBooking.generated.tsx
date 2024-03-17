import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { BookingFragmentFragmentDoc } from '../fragments/bookingFragment.generated';

const defaultOptions = {} as const;
export type UserGetLatestSettlementOfBookingQueryVariables = Types.Exact<{
  bookingId: Types.Scalars['String'];
}>;

export type UserGetLatestSettlementOfBookingQueryResponse = { __typename?: 'Query' } & {
  userGetLatestSettlementOfBooking: { __typename?: 'SettlementEntity' } & Pick<
    Types.SettlementEntity,
    | 'bookingId'
    | 'createdAt'
    | 'deletedAt'
    | 'id'
    | 'quotationId'
    | 'status'
    | 'technicianId'
    | 'total'
    | 'updatedAt'
    | 'userId'
  > & {
      booking: { __typename?: 'BookingEntity' } & Pick<
        Types.BookingEntity,
        | 'addressMoreInfo'
        | 'code'
        | 'createdAt'
        | 'deletedAt'
        | 'description'
        | 'id'
        | 'latitude'
        | 'longitude'
        | 'mapAddress'
        | 'technicianId'
        | 'transportFee'
        | 'transportDuration'
        | 'transportDistance'
        | 'partnerId'
        | 'problemTexts'
        | 'status'
        | 'updatedAt'
        | 'vehicleId'
        | 'scheduleTime'
        | 'scheduleReason'
        | 'userCanReviewTechnician'
      > & {
          medias: Array<
            { __typename?: 'Media' } & Pick<
              Types.Media,
              | 'createdAt'
              | 'fileSize'
              | 'fullOriginalUrl'
              | 'fullThumbUrl'
              | 'id'
              | 'isDeleted'
              | 'mimeType'
              | 'name'
              | 'originalUrl'
              | 'ownerId'
              | 'thumbUrl'
              | 'type'
              | 'updatedAt'
              | 'videoUrl'
            >
          >;
          user: { __typename?: 'UserEntity' } & Pick<
            Types.UserEntity,
            | 'address'
            | 'avatarId'
            | 'birthday'
            | 'certificate'
            | 'createdAt'
            | 'deletedAt'
            | 'email'
            | 'fullname'
            | 'id'
            | 'isActive'
            | 'phone'
            | 'totalBookings'
            | 'totalMaintenanceRequests'
            | 'totalOrders'
            | 'totalSpending'
            | 'updatedAt'
            | 'star'
          > & {
              avatar?: Types.Maybe<
                { __typename?: 'Media' } & Pick<
                  Types.Media,
                  | 'createdAt'
                  | 'fileSize'
                  | 'fullOriginalUrl'
                  | 'fullThumbUrl'
                  | 'id'
                  | 'isDeleted'
                  | 'mimeType'
                  | 'name'
                  | 'originalUrl'
                  | 'ownerId'
                  | 'thumbUrl'
                  | 'type'
                  | 'updatedAt'
                  | 'videoUrl'
                >
              >;
              userAddress?: Types.Maybe<
                { __typename?: 'AddressEntity' } & Pick<
                  Types.AddressEntity,
                  | 'addressDetail'
                  | 'addressName'
                  | 'contactName'
                  | 'contactPhone'
                  | 'createdAt'
                  | 'deletedAt'
                  | 'id'
                  | 'isDefault'
                  | 'latitude'
                  | 'longitude'
                  | 'mapAddress'
                  | 'updatedAt'
                  | 'userId'
                >
              >;
            };
          partner: { __typename?: 'PartnerEntity' } & Pick<
            Types.PartnerEntity,
            | 'addressMoreInfo'
            | 'avatarId'
            | 'bank'
            | 'birthday'
            | 'cardNumber'
            | 'citizenId'
            | 'createdAt'
            | 'deletedAt'
            | 'description'
            | 'email'
            | 'fullname'
            | 'hotline'
            | 'id'
            | 'isActive'
            | 'isApproved'
            | 'latitude'
            | 'longitude'
            | 'mapAddress'
            | 'parentId'
            | 'phone'
            | 'type'
            | 'updatedAt'
          > & {
              avatar?: Types.Maybe<
                { __typename?: 'Media' } & Pick<
                  Types.Media,
                  | 'createdAt'
                  | 'fileSize'
                  | 'fullOriginalUrl'
                  | 'fullThumbUrl'
                  | 'id'
                  | 'isDeleted'
                  | 'mimeType'
                  | 'name'
                  | 'originalUrl'
                  | 'ownerId'
                  | 'thumbUrl'
                  | 'type'
                  | 'updatedAt'
                  | 'videoUrl'
                >
              >;
              qualifications?: Types.Maybe<
                Array<
                  { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
                >
              >;
              reviewSummary?: Types.Maybe<
                { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
              >;
            };
          technician?: Types.Maybe<
            { __typename?: 'PartnerEntity' } & Pick<
              Types.PartnerEntity,
              | 'addressMoreInfo'
              | 'avatarId'
              | 'bank'
              | 'birthday'
              | 'cardNumber'
              | 'citizenId'
              | 'createdAt'
              | 'deletedAt'
              | 'description'
              | 'email'
              | 'fullname'
              | 'hotline'
              | 'id'
              | 'isActive'
              | 'isApproved'
              | 'latitude'
              | 'longitude'
              | 'mapAddress'
              | 'parentId'
              | 'phone'
              | 'type'
              | 'updatedAt'
            > & {
                avatar?: Types.Maybe<
                  { __typename?: 'Media' } & Pick<
                    Types.Media,
                    | 'createdAt'
                    | 'fileSize'
                    | 'fullOriginalUrl'
                    | 'fullThumbUrl'
                    | 'id'
                    | 'isDeleted'
                    | 'mimeType'
                    | 'name'
                    | 'originalUrl'
                    | 'ownerId'
                    | 'thumbUrl'
                    | 'type'
                    | 'updatedAt'
                    | 'videoUrl'
                  >
                >;
                qualifications?: Types.Maybe<
                  Array<
                    { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
                  >
                >;
                reviewSummary?: Types.Maybe<
                  { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
                >;
              }
          >;
          problems?: Types.Maybe<
            Array<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >
          >;
          statusDetail?: Types.Maybe<
            { __typename?: 'BookingStatusEntity' } & Pick<
              Types.BookingStatusEntity,
              | 'bookingId'
              | 'createdAt'
              | 'id'
              | 'note'
              | 'partnerId'
              | 'scheduleReason'
              | 'scheduleTime'
              | 'status'
              | 'userId'
            > & {
                reasons?: Types.Maybe<
                  Array<
                    { __typename?: 'CategoryEntity' } & Pick<
                      Types.CategoryEntity,
                      'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                    >
                  >
                >;
              }
          >;
          vehicle: { __typename?: 'VehicleEntity' } & Pick<
            Types.VehicleEntity,
            | 'addressMoreInfo'
            | 'avatarId'
            | 'createdAt'
            | 'deletedAt'
            | 'detail'
            | 'hidden'
            | 'id'
            | 'latitude'
            | 'longitude'
            | 'mapAddress'
            | 'name'
            | 'operatingNumber'
            | 'operatingUnit'
            | 'ordinalNumber'
            | 'serialNumber'
            | 'updatedAt'
            | 'userId'
            | 'vehicleRegistrationPlate'
            | 'vinNumber'
            | 'yearOfManufacture'
          > & {
              avatar?: Types.Maybe<
                { __typename?: 'Media' } & Pick<
                  Types.Media,
                  | 'createdAt'
                  | 'fileSize'
                  | 'fullOriginalUrl'
                  | 'fullThumbUrl'
                  | 'id'
                  | 'isDeleted'
                  | 'mimeType'
                  | 'name'
                  | 'originalUrl'
                  | 'ownerId'
                  | 'thumbUrl'
                  | 'type'
                  | 'updatedAt'
                  | 'videoUrl'
                >
              >;
            };
          settlementAccepted?: Types.Maybe<
            { __typename?: 'SettlementEntity' } & Pick<Types.SettlementEntity, 'id' | 'quotationId'>
          >;
        };
      quotation: { __typename?: 'QuotationEntity' } & Pick<
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
          booking: { __typename?: 'BookingEntity' } & Pick<
            Types.BookingEntity,
            | 'addressMoreInfo'
            | 'code'
            | 'createdAt'
            | 'deletedAt'
            | 'description'
            | 'id'
            | 'latitude'
            | 'longitude'
            | 'mapAddress'
            | 'partnerId'
            | 'problemTexts'
            | 'scheduleReason'
            | 'scheduleTime'
            | 'status'
            | 'technicianId'
            | 'transportDistance'
            | 'transportDuration'
            | 'transportFee'
            | 'updatedAt'
            | 'userId'
            | 'vehicleId'
          >;
          diagnostics: Array<
            { __typename?: 'QuotationDiagnosticEntity' } & Pick<
              Types.QuotationDiagnosticEntity,
              'createdAt' | 'deletedAt' | 'diagnosticCode' | 'expense' | 'id' | 'quotationId' | 'updatedAt'
            >
          >;
        };
      additionalFees: Array<
        { __typename?: 'SettlementAdditionalFeeEntity' } & Pick<
          Types.SettlementAdditionalFeeEntity,
          'amount' | 'id' | 'name'
        >
      >;
    };
};

export const UserGetLatestSettlementOfBookingDocument = gql`
  query userGetLatestSettlementOfBooking($bookingId: String!) {
    userGetLatestSettlementOfBooking(bookingId: $bookingId) {
      booking {
        ...BookingFragment
      }
      bookingId
      createdAt
      deletedAt
      id
      quotation {
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
        booking {
          addressMoreInfo
          code
          createdAt
          deletedAt
          description
          id
          latitude
          longitude
          mapAddress
          partnerId
          problemTexts
          scheduleReason
          scheduleTime
          status
          technicianId
          transportDistance
          transportDuration
          transportFee
          updatedAt
          userId
          vehicleId
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
      quotationId
      status
      technicianId
      total
      updatedAt
      userId
      additionalFees {
        amount
        id
        name
      }
    }
  }
  ${BookingFragmentFragmentDoc}
`;
export function useUserGetLatestSettlementOfBookingQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserGetLatestSettlementOfBookingQueryResponse,
    UserGetLatestSettlementOfBookingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetLatestSettlementOfBookingQueryResponse, UserGetLatestSettlementOfBookingQueryVariables>(
    UserGetLatestSettlementOfBookingDocument,
    options,
  );
}
export function useUserGetLatestSettlementOfBookingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserGetLatestSettlementOfBookingQueryResponse,
    UserGetLatestSettlementOfBookingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    UserGetLatestSettlementOfBookingQueryResponse,
    UserGetLatestSettlementOfBookingQueryVariables
  >(UserGetLatestSettlementOfBookingDocument, options);
}
export type UserGetLatestSettlementOfBookingQueryHookResult = ReturnType<
  typeof useUserGetLatestSettlementOfBookingQuery
>;
export type UserGetLatestSettlementOfBookingLazyQueryHookResult = ReturnType<
  typeof useUserGetLatestSettlementOfBookingLazyQuery
>;
export type UserGetLatestSettlementOfBookingQueryResult = Apollo.QueryResult<
  UserGetLatestSettlementOfBookingQueryResponse,
  UserGetLatestSettlementOfBookingQueryVariables
>;
