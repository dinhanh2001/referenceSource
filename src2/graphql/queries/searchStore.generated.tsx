import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type SearchStoreQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isNew?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search: Types.Scalars['String'];
  sort?: Types.InputMaybe<Types.SortInput>;
  type?: Types.InputMaybe<Types.ProductTypeEnum>;
}>;

export type SearchStoreQueryResponse = { __typename?: 'Query' } & {
  searchStore: { __typename?: 'PartnerConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'fullname' | 'id'> & {
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
                  'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                >
              >
            >;
            storeReviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
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

export const SearchStoreDocument = gql`
  query searchStore(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $isNew: Boolean
    $limit: Int
    $page: Int
    $search: String!
    $sort: SortInput
    $type: ProductTypeEnum
  ) {
    searchStore(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      isNew: $isNew
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      type: $type
    ) {
      items {
        avatar {
          ...MediaFragment
        }
        fullname
        id
        qualifications {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        storeReviewSummary {
          percent
          starAverage
          total
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
export function useSearchStoreQuery(
  baseOptions: Apollo.QueryHookOptions<SearchStoreQueryResponse, SearchStoreQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchStoreQueryResponse, SearchStoreQueryVariables>(SearchStoreDocument, options);
}
export function useSearchStoreLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchStoreQueryResponse, SearchStoreQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchStoreQueryResponse, SearchStoreQueryVariables>(SearchStoreDocument, options);
}
export type SearchStoreQueryHookResult = ReturnType<typeof useSearchStoreQuery>;
export type SearchStoreLazyQueryHookResult = ReturnType<typeof useSearchStoreLazyQuery>;
export type SearchStoreQueryResult = Apollo.QueryResult<SearchStoreQueryResponse, SearchStoreQueryVariables>;
