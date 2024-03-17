import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { ProductFragmentFragmentDoc } from '../fragments/product.fragment.generated';

const defaultOptions = {} as const;
export type PartnerCreateProductVehicleMutationVariables = Types.Exact<{
  input: Types.PartnerCreateProductVehicleInput;
}>;

export type PartnerCreateProductVehicleMutationResponse = { __typename?: 'Mutation' } & {
  partnerCreateProductVehicle: { __typename?: 'ProductEntity' } & Pick<
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
              { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
            >;
            level?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
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
              Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
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
    };
};

export const PartnerCreateProductVehicleDocument = gql`
  mutation partnerCreateProductVehicle($input: PartnerCreateProductVehicleInput!) {
    partnerCreateProductVehicle(input: $input) {
      ...ProductFragment
    }
  }
  ${ProductFragmentFragmentDoc}
`;
export function usePartnerCreateProductVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerCreateProductVehicleMutationResponse,
    PartnerCreateProductVehicleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerCreateProductVehicleMutationResponse, PartnerCreateProductVehicleMutationVariables>(
    PartnerCreateProductVehicleDocument,
    options,
  );
}
export type PartnerCreateProductVehicleMutationHookResult = ReturnType<typeof usePartnerCreateProductVehicleMutation>;
export type PartnerCreateProductVehicleMutationResult =
  Apollo.MutationResult<PartnerCreateProductVehicleMutationResponse>;
export type PartnerCreateProductVehicleMutationOptions = Apollo.BaseMutationOptions<
  PartnerCreateProductVehicleMutationResponse,
  PartnerCreateProductVehicleMutationVariables
>;
