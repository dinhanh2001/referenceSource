import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { DiscountCodeFragmentFragmentDoc } from '../fragments/discount.fragment.generated';

const defaultOptions = {} as const;
export type PartnerGetDiscountCodesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isActivities: Types.Scalars['Boolean'];
}>;

export type PartnerGetDiscountCodesQueryResponse = { __typename?: 'Query' } & {
  partnerGetDiscountCodes: { __typename?: 'DiscountCodeConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'DiscountCodeEntity' } & Pick<
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
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const PartnerGetDiscountCodesDocument = gql`
  query partnerGetDiscountCodes(
    $limit: Int
    $page: Int
    $filters: [JSONObject!]
    $sort: SortInput
    $search: String
    $isActive: StatusEnum
    $isApproved: Boolean
    $isActivities: Boolean!
  ) {
    partnerGetDiscountCodes(
      limit: $limit
      page: $page
      filters: $filters
      sort: $sort
      search: $search
      isActive: $isActive
      isApproved: $isApproved
      isActivities: $isActivities
    ) {
      items {
        ...DiscountCodeFragment
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
  ${DiscountCodeFragmentFragmentDoc}
`;
export function usePartnerGetDiscountCodesQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetDiscountCodesQueryResponse, PartnerGetDiscountCodesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetDiscountCodesQueryResponse, PartnerGetDiscountCodesQueryVariables>(
    PartnerGetDiscountCodesDocument,
    options,
  );
}
export function usePartnerGetDiscountCodesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerGetDiscountCodesQueryResponse,
    PartnerGetDiscountCodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetDiscountCodesQueryResponse, PartnerGetDiscountCodesQueryVariables>(
    PartnerGetDiscountCodesDocument,
    options,
  );
}
export type PartnerGetDiscountCodesQueryHookResult = ReturnType<typeof usePartnerGetDiscountCodesQuery>;
export type PartnerGetDiscountCodesLazyQueryHookResult = ReturnType<typeof usePartnerGetDiscountCodesLazyQuery>;
export type PartnerGetDiscountCodesQueryResult = Apollo.QueryResult<
  PartnerGetDiscountCodesQueryResponse,
  PartnerGetDiscountCodesQueryVariables
>;
