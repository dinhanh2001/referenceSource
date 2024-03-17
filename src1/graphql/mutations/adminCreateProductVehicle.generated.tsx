import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type AdminCreateProductVehicleMutationVariables = Types.Exact<{
  input: Types.CreateProductVehicleInput;
}>;

export type AdminCreateProductVehicleMutationResponse = { __typename?: 'Mutation' } & {
  adminCreateProductVehicle: { __typename?: 'ProductEntity' } & Pick<
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
      partOfProduct?: Types.Maybe<
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
          | 'countProduct'
          | 'countTechnician'
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
          | 'star'
          | 'suggestionPoint'
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
            education?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >;
            expenseInfo?: Types.Maybe<{ __typename?: 'Expense' } & Pick<Types.Expense, 'cost' | 'distance' | 'time'>>;
            level?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >;
            parentInfo?: Types.Maybe<
              { __typename?: 'PartnerEntity' } & Pick<
                Types.PartnerEntity,
                | 'addressMoreInfo'
                | 'avatarId'
                | 'bank'
                | 'birthday'
                | 'cardNumber'
                | 'citizenId'
                | 'countProduct'
                | 'countTechnician'
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
                | 'star'
                | 'suggestionPoint'
                | 'type'
                | 'updatedAt'
              >
            >;
            qualifications?: Types.Maybe<
              Array<
                { __typename?: 'CategoryEntity' } & Pick<
                  Types.CategoryEntity,
                  'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                >
              >
            >;
            reviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
            >;
            starInfo: Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>;
          }
      >;
      productDevices: Array<
        { __typename?: 'ProductDevice' } & {
          manufacturer: { __typename?: 'CategoryEntity' } & Pick<
            Types.CategoryEntity,
            'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
          >;
          model: { __typename?: 'CategoryEntity' } & Pick<
            Types.CategoryEntity,
            'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
          >;
          vehicleType: { __typename?: 'CategoryEntity' } & Pick<
            Types.CategoryEntity,
            'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
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

export const AdminCreateProductVehicleDocument = gql`
  mutation adminCreateProductVehicle($input: CreateProductVehicleInput!) {
    adminCreateProductVehicle(input: $input) {
      avatar {
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
      avatarId
      createdAt
      deletedAt
      descriptionImageIds
      descriptionImages {
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
      detail
      id
      isActive
      isFixedCost
      isNew
      manufacturer {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
      model {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
      name
      operatingNumber
      operatingUnit
      ordinalNumber
      origin {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
      partNumber
      partOfProduct {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
      partner {
        addressMoreInfo
        avatar {
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
        avatarId
        bank
        birthday
        cardNumber
        citizenId
        countProduct
        countTechnician
        createdAt
        deletedAt
        description
        education {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        email
        expenseInfo {
          cost
          distance
          time
        }
        fullname
        hotline
        id
        isActive
        isApproved
        latitude
        level {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        longitude
        mapAddress
        parentId
        parentInfo {
          addressMoreInfo
          avatarId
          bank
          birthday
          cardNumber
          citizenId
          countProduct
          countTechnician
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
          star
          suggestionPoint
          type
          updatedAt
        }
        phone
        qualifications {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        reviewSummary {
          percent
          starAverage
          total
        }
        star
        starInfo {
          star
          total
        }
        suggestionPoint
        type
        updatedAt
      }
      partnerId
      productDevices {
        manufacturer {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        model {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        vehicleType {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
      }
      productType {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
      productUnit {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
      quantity
      serialNumber
      type
      unitPrice
      updatedAt
      vehicleRegistrationPlate
      vinNumber
      yearOfManufacture
    }
  }
`;
export function useAdminCreateProductVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AdminCreateProductVehicleMutationResponse,
    AdminCreateProductVehicleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AdminCreateProductVehicleMutationResponse, AdminCreateProductVehicleMutationVariables>(
    AdminCreateProductVehicleDocument,
    options,
  );
}
export type AdminCreateProductVehicleMutationHookResult = ReturnType<typeof useAdminCreateProductVehicleMutation>;
export type AdminCreateProductVehicleMutationResult = Apollo.MutationResult<AdminCreateProductVehicleMutationResponse>;
export type AdminCreateProductVehicleMutationOptions = Apollo.BaseMutationOptions<
  AdminCreateProductVehicleMutationResponse,
  AdminCreateProductVehicleMutationVariables
>;
