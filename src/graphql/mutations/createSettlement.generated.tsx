import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { BookingFragmentFragmentDoc } from '../fragments/booking.fragment.generated';

const defaultOptions = {} as const;
export type CreateSettlementMutationVariables = Types.Exact<{
  input: Types.CreateSettlementInput;
}>;

export type CreateSettlementMutationResponse = { __typename?: 'Mutation' } & {
  createSettlement: { __typename?: 'SettlementEntity' } & Pick<
    Types.SettlementEntity,
    'createdAt' | 'id' | 'status' | 'total' | 'updatedAt'
  > & {
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
              settlementAccepted?: Types.Maybe<
                { __typename?: 'SettlementEntity' } & Pick<Types.SettlementEntity, 'id'>
              >;
            };
          diagnostics: Array<
            { __typename?: 'QuotationDiagnosticEntity' } & Pick<
              Types.QuotationDiagnosticEntity,
              'createdAt' | 'deletedAt' | 'diagnosticCode' | 'expense' | 'id' | 'quotationId' | 'updatedAt'
            >
          >;
        };
    };
};

export const CreateSettlementDocument = gql`
  mutation createSettlement($input: CreateSettlementInput!) {
    createSettlement(input: $input) {
      createdAt
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
          ...BookingFragment
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
        repairFee
        status
        technicianId
        total
        transportFee
        updatedAt
        userId
      }
      status
      total
      updatedAt
    }
  }
  ${BookingFragmentFragmentDoc}
`;
export function useCreateSettlementMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateSettlementMutationResponse, CreateSettlementMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateSettlementMutationResponse, CreateSettlementMutationVariables>(
    CreateSettlementDocument,
    options,
  );
}
export type CreateSettlementMutationHookResult = ReturnType<typeof useCreateSettlementMutation>;
export type CreateSettlementMutationResult = Apollo.MutationResult<CreateSettlementMutationResponse>;
export type CreateSettlementMutationOptions = Apollo.BaseMutationOptions<
  CreateSettlementMutationResponse,
  CreateSettlementMutationVariables
>;
