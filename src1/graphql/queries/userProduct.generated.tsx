import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type UserProductQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type UserProductQueryResponse = { __typename?: 'Query' } & {
  userProduct: { __typename?: 'ProductEntity' } & Pick<
    Types.ProductEntity,
    | 'createdAt'
    | 'id'
    | 'isFixedCost'
    | 'isNew'
    | 'isFavorite'
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
    | 'detail'
    | 'numberOrder'
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
      manufacturer?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      model?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      origin?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      partOfProduct?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      partner?: Types.Maybe<
        { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'id' | 'fullname' | 'phone'> & {
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
              Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>
            >;
            storeReviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'total' | 'starAverage' | 'percent'>
            >;
          }
      >;
      productDevices: Array<
        { __typename?: 'ProductDevice' } & {
          manufacturer: { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>;
          model: { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>;
          vehicleType: { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>;
        }
      >;
      productType?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      productUnit?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      reviewSummary?: Types.Maybe<
        { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'total' | 'starAverage' | 'percent'>
      >;
      starInfo?: Types.Maybe<Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>>;
    };
};

export const UserProductDocument = gql`
  query userProduct($id: String!) {
    userProduct(id: $id) {
      avatar {
        ...MediaFragment
      }
      createdAt
      descriptionImages {
        ...MediaFragment
      }
      id
      isFixedCost
      isNew
      isFavorite
      manufacturer {
        id
        name
      }
      model {
        id
        name
      }
      name
      operatingNumber
      operatingUnit
      ordinalNumber
      origin {
        id
        name
      }
      partNumber
      partOfProduct {
        id
        name
      }
      partner {
        id
        fullname
        phone
        avatar {
          ...MediaFragment
        }
        qualifications {
          id
          name
        }
        storeReviewSummary {
          total
          starAverage
          percent
        }
      }
      partnerId
      productDevices {
        manufacturer {
          id
          name
        }
        model {
          id
          name
        }
        vehicleType {
          id
          name
        }
      }
      productType {
        id
        name
      }
      productUnit {
        id
        name
      }
      quantity
      serialNumber
      type
      unitPrice
      updatedAt
      vehicleRegistrationPlate
      vinNumber
      yearOfManufacture
      detail
      reviewSummary {
        total
        starAverage
        percent
      }
      starInfo {
        star
        total
      }
      numberOrder
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function useUserProductQuery(
  baseOptions: Apollo.QueryHookOptions<UserProductQueryResponse, UserProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserProductQueryResponse, UserProductQueryVariables>(UserProductDocument, options);
}
export function useUserProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserProductQueryResponse, UserProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserProductQueryResponse, UserProductQueryVariables>(UserProductDocument, options);
}
export type UserProductQueryHookResult = ReturnType<typeof useUserProductQuery>;
export type UserProductLazyQueryHookResult = ReturnType<typeof useUserProductLazyQuery>;
export type UserProductQueryResult = Apollo.QueryResult<UserProductQueryResponse, UserProductQueryVariables>;
