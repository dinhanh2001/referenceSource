import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetLatestQuotationOfBookingQueryVariables = Types.Exact<{
  bookingId: Types.Scalars['String'];
}>;

export type UserGetLatestQuotationOfBookingQueryResponse = { __typename?: 'Query' } & {
  userGetLatestQuotationOfBooking?: Types.Maybe<
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
              | 'suggestionPoint'
              | 'type'
              | 'updatedAt'
            > & {
                reviewSummary?: Types.Maybe<
                  { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
                >;
              };
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
              >
            >;
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
                | 'suggestionPoint'
                | 'type'
                | 'updatedAt'
              > & {
                  reviewSummary?: Types.Maybe<
                    { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
                  >;
                }
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
            >;
          };
        diagnostics: Array<
          { __typename?: 'QuotationDiagnosticEntity' } & Pick<
            Types.QuotationDiagnosticEntity,
            'createdAt' | 'deletedAt' | 'diagnosticCode' | 'expense' | 'id' | 'quotationId' | 'updatedAt'
          >
        >;
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
};

export const UserGetLatestQuotationOfBookingDocument = gql`
  query userGetLatestQuotationOfBooking($bookingId: String!) {
    userGetLatestQuotationOfBooking(bookingId: $bookingId) {
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
        medias {
          createdAt
          fileSize
          fullOriginalUrl
          fullThumbUrl
          id
          isDeleted
          mimeType
          name
          originalUrl
          ownerId
          thumbUrl
          type
          updatedAt
          videoUrl
        }
        partner {
          addressMoreInfo
          avatarId
          bank
          birthday
          cardNumber
          citizenId
          createdAt
          deletedAt
          description
          email
          fullname
          hotline
          id
          isActive
          isApproved
          latitude
          longitude
          mapAddress
          parentId
          phone
          suggestionPoint
          type
          updatedAt
          reviewSummary {
            starAverage
            total
            percent
          }
        }
        partnerId
        problemTexts
        problems {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        scheduleReason
        scheduleTime
        status
        statusDetail {
          bookingId
          createdAt
          id
          note
          partnerId
          scheduleReason
          scheduleTime
          status
          userId
        }
        technician {
          addressMoreInfo
          avatarId
          bank
          birthday
          cardNumber
          citizenId
          createdAt
          deletedAt
          description
          email
          fullname
          hotline
          id
          isActive
          isApproved
          latitude
          longitude
          mapAddress
          parentId
          phone
          suggestionPoint
          type
          updatedAt
          reviewSummary {
            starAverage
            total
            percent
          }
        }
        technicianId
        transportDistance
        transportDuration
        transportFee
        updatedAt
        user {
          address
          avatarId
          birthday
          certificate
          createdAt
          deletedAt
          email
          fullname
          id
          isActive
          phone
          totalBookings
          totalMaintenanceRequests
          totalOrders
          totalSpending
          updatedAt
        }
        userId
        vehicle {
          addressMoreInfo
          avatarId
          createdAt
          deletedAt
          detail
          hidden
          id
          latitude
          longitude
          mapAddress
          name
          operatingNumber
          operatingUnit
          ordinalNumber
          serialNumber
          updatedAt
          userId
          vehicleRegistrationPlate
          vinNumber
          yearOfManufacture
        }
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
      reasons {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
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
export function useUserGetLatestQuotationOfBookingQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserGetLatestQuotationOfBookingQueryResponse,
    UserGetLatestQuotationOfBookingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetLatestQuotationOfBookingQueryResponse, UserGetLatestQuotationOfBookingQueryVariables>(
    UserGetLatestQuotationOfBookingDocument,
    options,
  );
}
export function useUserGetLatestQuotationOfBookingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserGetLatestQuotationOfBookingQueryResponse,
    UserGetLatestQuotationOfBookingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    UserGetLatestQuotationOfBookingQueryResponse,
    UserGetLatestQuotationOfBookingQueryVariables
  >(UserGetLatestQuotationOfBookingDocument, options);
}
export type UserGetLatestQuotationOfBookingQueryHookResult = ReturnType<typeof useUserGetLatestQuotationOfBookingQuery>;
export type UserGetLatestQuotationOfBookingLazyQueryHookResult = ReturnType<
  typeof useUserGetLatestQuotationOfBookingLazyQuery
>;
export type UserGetLatestQuotationOfBookingQueryResult = Apollo.QueryResult<
  UserGetLatestQuotationOfBookingQueryResponse,
  UserGetLatestQuotationOfBookingQueryVariables
>;
