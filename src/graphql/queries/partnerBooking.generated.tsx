import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { BookingFragmentFragmentDoc } from '../fragments/booking.fragment.generated';

const defaultOptions = {} as const;
export type PartnerBookingQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerBookingQueryResponse = { __typename?: 'Query' } & {
  partnerBooking: { __typename?: 'BookingEntity' } & Pick<
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
    | 'scheduleTime'
    | 'technicianCanReviewUser'
    | 'partnerId'
    | 'problemTexts'
    | 'status'
    | 'updatedAt'
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
            Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
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
              Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
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
        | 'updatedAt'
        | 'star'
      > & { avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>> };
      settlementAccepted?: Types.Maybe<{ __typename?: 'SettlementEntity' } & Pick<Types.SettlementEntity, 'id'>>;
    };
};

export const PartnerBookingDocument = gql`
  query partnerBooking($id: String!) {
    partnerBooking(id: $id) {
      ...BookingFragment
    }
  }
  ${BookingFragmentFragmentDoc}
`;
export function usePartnerBookingQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerBookingQueryResponse, PartnerBookingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerBookingQueryResponse, PartnerBookingQueryVariables>(PartnerBookingDocument, options);
}
export function usePartnerBookingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerBookingQueryResponse, PartnerBookingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerBookingQueryResponse, PartnerBookingQueryVariables>(
    PartnerBookingDocument,
    options,
  );
}
export type PartnerBookingQueryHookResult = ReturnType<typeof usePartnerBookingQuery>;
export type PartnerBookingLazyQueryHookResult = ReturnType<typeof usePartnerBookingLazyQuery>;
export type PartnerBookingQueryResult = Apollo.QueryResult<PartnerBookingQueryResponse, PartnerBookingQueryVariables>;
