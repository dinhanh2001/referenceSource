import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerProductsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  partnerId: Types.Scalars['String'];
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  type?: Types.InputMaybe<Types.ProductTypeEnum>;
}>;

export type PartnerProductsQueryResponse = { __typename?: 'Query' } & {
  partnerProducts: { __typename?: 'ProductConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ProductEntity' } & Pick<
          Types.ProductEntity,
          | 'id'
          | 'name'
          | 'vehicleRegistrationPlate'
          | 'ordinalNumber'
          | 'serialNumber'
          | 'vinNumber'
          | 'yearOfManufacture'
          | 'isNew'
          | 'operatingNumber'
          | 'operatingUnit'
          | 'detail'
          | 'isFixedCost'
          | 'unitPrice'
          | 'quantity'
          | 'partNumber'
          | 'type'
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
            productType?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id'>>;
            manufacturer?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id'>>;
            model?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id'>>;
            origin?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id'>>;
            productUnit?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id'>>;
            partOfProduct?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id'>>;
            productDevices: Array<
              { __typename?: 'ProductDevice' } & {
                manufacturer: { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id'>;
                model: { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id'>;
                vehicleType: { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id'>;
              }
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

export const PartnerProductsDocument = gql`
  query partnerProducts(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $partnerId: String!
    $search: String
    $sort: SortInput
    $type: ProductTypeEnum
  ) {
    partnerProducts(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      partnerId: $partnerId
      search: $search
      sort: $sort
      type: $type
    ) {
      items {
        id
        avatar {
          ...MediaFragment
        }
        descriptionImages {
          ...MediaFragment
        }
        name
        vehicleRegistrationPlate
        ordinalNumber
        productType {
          id
        }
        manufacturer {
          id
        }
        model {
          id
        }
        serialNumber
        vinNumber
        origin {
          id
        }
        yearOfManufacture
        isNew
        operatingNumber
        operatingUnit
        detail
        isFixedCost
        unitPrice
        quantity
        partNumber
        productUnit {
          id
        }
        type
        partOfProduct {
          id
        }
        productDevices {
          manufacturer {
            id
          }
          model {
            id
          }
          vehicleType {
            id
          }
        }
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
  ${MediaFragmentFragmentDoc}
`;
export function usePartnerProductsQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerProductsQueryResponse, PartnerProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerProductsQueryResponse, PartnerProductsQueryVariables>(PartnerProductsDocument, options);
}
export function usePartnerProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerProductsQueryResponse, PartnerProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerProductsQueryResponse, PartnerProductsQueryVariables>(
    PartnerProductsDocument,
    options,
  );
}
export type PartnerProductsQueryHookResult = ReturnType<typeof usePartnerProductsQuery>;
export type PartnerProductsLazyQueryHookResult = ReturnType<typeof usePartnerProductsLazyQuery>;
export type PartnerProductsQueryResult = Apollo.QueryResult<
  PartnerProductsQueryResponse,
  PartnerProductsQueryVariables
>;
