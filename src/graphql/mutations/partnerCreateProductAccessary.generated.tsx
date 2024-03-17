import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { ProductFragmentFragmentDoc } from '../fragments/product.fragment.generated';

const defaultOptions = {} as const;
export type PartnerCreateProductAccessaryMutationVariables = Types.Exact<{
  input: Types.PartnerCreateAccessaryInput;
}>;

export type PartnerCreateProductAccessaryMutationResponse = { __typename?: 'Mutation' } & {
  partnerCreateProductAccessary: { __typename?: 'ProductEntity' } & Pick<
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

export const PartnerCreateProductAccessaryDocument = gql`
  mutation partnerCreateProductAccessary($input: PartnerCreateAccessaryInput!) {
    partnerCreateProductAccessary(input: $input) {
      ...ProductFragment
    }
  }
  ${ProductFragmentFragmentDoc}
`;
export function usePartnerCreateProductAccessaryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerCreateProductAccessaryMutationResponse,
    PartnerCreateProductAccessaryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    PartnerCreateProductAccessaryMutationResponse,
    PartnerCreateProductAccessaryMutationVariables
  >(PartnerCreateProductAccessaryDocument, options);
}
export type PartnerCreateProductAccessaryMutationHookResult = ReturnType<
  typeof usePartnerCreateProductAccessaryMutation
>;
export type PartnerCreateProductAccessaryMutationResult =
  Apollo.MutationResult<PartnerCreateProductAccessaryMutationResponse>;
export type PartnerCreateProductAccessaryMutationOptions = Apollo.BaseMutationOptions<
  PartnerCreateProductAccessaryMutationResponse,
  PartnerCreateProductAccessaryMutationVariables
>;
