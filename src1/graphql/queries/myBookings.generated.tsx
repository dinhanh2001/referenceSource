import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { BookingFragmentFragmentDoc } from '../fragments/bookingFragment.generated';

const defaultOptions = {} as const;
export type MyBookingsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  statuses?: Types.InputMaybe<Array<Types.BookingStatusEnum> | Types.BookingStatusEnum>;
}>;

export type MyBookingsQueryResponse = { __typename?: 'Query' } & {
  myBookings: { __typename?: 'BookingConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'BookingEntity' } & Pick<
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
                      { __typename?: 'CategoryEntity' } & Pick<
                        Types.CategoryEntity,
                        'id' | 'isActive' | 'name' | 'type'
                      >
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
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const MyBookingsDocument = gql`
  query myBookings(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $statuses: [BookingStatusEnum!]
  ) {
    myBookings(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      statuses: $statuses
    ) {
      items {
        ...BookingFragment
      }
      meta {
        currentPage
        itemCount
        itemsPerPage
        totalItems
        totalPages
      }
    }
  }
  ${BookingFragmentFragmentDoc}
`;
export function useMyBookingsQuery(
  baseOptions?: Apollo.QueryHookOptions<MyBookingsQueryResponse, MyBookingsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyBookingsQueryResponse, MyBookingsQueryVariables>(MyBookingsDocument, options);
}
export function useMyBookingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyBookingsQueryResponse, MyBookingsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyBookingsQueryResponse, MyBookingsQueryVariables>(MyBookingsDocument, options);
}
export type MyBookingsQueryHookResult = ReturnType<typeof useMyBookingsQuery>;
export type MyBookingsLazyQueryHookResult = ReturnType<typeof useMyBookingsLazyQuery>;
export type MyBookingsQueryResult = Apollo.QueryResult<MyBookingsQueryResponse, MyBookingsQueryVariables>;
