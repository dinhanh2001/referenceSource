import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { DiscountCodeFragmentFragmentDoc } from '../fragments/discount.fragment.generated';

const defaultOptions = {} as const;
export type PartnerUpdateDiscountCodeMutationVariables = Types.Exact<{
  input: Types.PartnerUpdateDiscountCodeInput;
}>;

export type PartnerUpdateDiscountCodeMutationResponse = { __typename?: 'Mutation' } & {
  partnerUpdateDiscountCode: { __typename?: 'DiscountCodeEntity' } & Pick<
    Types.DiscountCodeEntity,
    | 'id'
    | 'name'
    | 'minOrderValue'
    | 'unit'
    | 'limit'
    | 'limitPerAccount'
    | 'startDate'
    | 'endDate'
    | 'isActive'
    | 'isAssignAllProduct'
    | 'deletedAt'
    | 'createdAt'
    | 'updatedAt'
    | 'value'
    | 'usedCount'
  > & {
      products?: Types.Maybe<
        Array<
          { __typename?: 'ProductEntity' } & Pick<
            Types.ProductEntity,
            | 'avatarId'
            | 'createdAt'
            | 'deletedAt'
            | 'descriptionImageIds'
            | 'detail'
            | 'id'
            | 'isActive'
            | 'isFixedCost'
            | 'isNew'
            | 'name'
            | 'operatingNumber'
            | 'operatingUnit'
            | 'ordinalNumber'
            | 'partNumber'
            | 'partnerId'
            | 'quantity'
            | 'serialNumber'
            | 'type'
            | 'unitPrice'
            | 'updatedAt'
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
              descriptionImages: Array<
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
              manufacturer?: Types.Maybe<
                { __typename?: 'CategoryEntity' } & Pick<
                  Types.CategoryEntity,
                  'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                >
              >;
              model?: Types.Maybe<
                { __typename?: 'CategoryEntity' } & Pick<
                  Types.CategoryEntity,
                  'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                >
              >;
              origin?: Types.Maybe<
                { __typename?: 'CategoryEntity' } & Pick<
                  Types.CategoryEntity,
                  'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                >
              >;
              partner?: Types.Maybe<
                { __typename?: 'PartnerEntity' } & Pick<
                  Types.PartnerEntity,
                  | 'addressMoreInfo'
                  | 'avatarId'
                  | 'bank'
                  | 'birthday'
                  | 'cardNumber'
                  | 'citizenId'
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
                  | 'phone'
                  | 'type'
                  | 'star'
                  | 'parentId'
                  | 'menus'
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
                    education?: Types.Maybe<
                      { __typename?: 'CategoryEntity' } & Pick<
                        Types.CategoryEntity,
                        'id' | 'isActive' | 'name' | 'type'
                      >
                    >;
                    level?: Types.Maybe<
                      { __typename?: 'CategoryEntity' } & Pick<
                        Types.CategoryEntity,
                        'id' | 'isActive' | 'name' | 'type'
                      >
                    >;
                    parentInfo?: Types.Maybe<
                      { __typename?: 'PartnerEntity' } & {
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
                      }
                    >;
                    qualifications?: Types.Maybe<
                      Array<
                        { __typename?: 'CategoryEntity' } & Pick<
                          Types.CategoryEntity,
                          'id' | 'isActive' | 'name' | 'type'
                        >
                      >
                    >;
                  }
              >;
              productType?: Types.Maybe<
                { __typename?: 'CategoryEntity' } & Pick<
                  Types.CategoryEntity,
                  'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                >
              >;
              productUnit?: Types.Maybe<
                { __typename?: 'CategoryEntity' } & Pick<
                  Types.CategoryEntity,
                  'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                >
              >;
            }
        >
      >;
    };
};

export const PartnerUpdateDiscountCodeDocument = gql`
  mutation partnerUpdateDiscountCode($input: PartnerUpdateDiscountCodeInput!) {
    partnerUpdateDiscountCode(input: $input) {
      ...DiscountCodeFragment
    }
  }
  ${DiscountCodeFragmentFragmentDoc}
`;
export function usePartnerUpdateDiscountCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerUpdateDiscountCodeMutationResponse,
    PartnerUpdateDiscountCodeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerUpdateDiscountCodeMutationResponse, PartnerUpdateDiscountCodeMutationVariables>(
    PartnerUpdateDiscountCodeDocument,
    options,
  );
}
export type PartnerUpdateDiscountCodeMutationHookResult = ReturnType<typeof usePartnerUpdateDiscountCodeMutation>;
export type PartnerUpdateDiscountCodeMutationResult = Apollo.MutationResult<PartnerUpdateDiscountCodeMutationResponse>;
export type PartnerUpdateDiscountCodeMutationOptions = Apollo.BaseMutationOptions<
  PartnerUpdateDiscountCodeMutationResponse,
  PartnerUpdateDiscountCodeMutationVariables
>;
