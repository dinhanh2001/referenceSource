import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type StoreDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type StoreDetailQueryResponse = { __typename?: 'Query' } & {
  storeDetail: { __typename?: 'PartnerEntity' } & Pick<
    Types.PartnerEntity,
    | 'addressMoreInfo'
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
      education?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      expenseInfo?: Types.Maybe<{ __typename?: 'Expense' } & Pick<Types.Expense, 'cost' | 'distance' | 'time'>>;
      level?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
      qualifications?: Types.Maybe<
        Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>
      >;
      storeReviewSummary?: Types.Maybe<
        { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
      >;
      storeStarInfo?: Types.Maybe<Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>>;
    };
};

export const StoreDetailDocument = gql`
  query storeDetail($id: String!) {
    storeDetail(id: $id) {
      addressMoreInfo
      avatar {
        ...MediaFragment
      }
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
        id
        name
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
        id
        name
      }
      longitude
      mapAddress
      parentId
      phone
      qualifications {
        id
        name
      }
      storeReviewSummary {
        percent
        starAverage
        total
      }
      star
      storeStarInfo {
        star
        total
      }
      suggestionPoint
      type
      updatedAt
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function useStoreDetailQuery(
  baseOptions: Apollo.QueryHookOptions<StoreDetailQueryResponse, StoreDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StoreDetailQueryResponse, StoreDetailQueryVariables>(StoreDetailDocument, options);
}
export function useStoreDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<StoreDetailQueryResponse, StoreDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StoreDetailQueryResponse, StoreDetailQueryVariables>(StoreDetailDocument, options);
}
export type StoreDetailQueryHookResult = ReturnType<typeof useStoreDetailQuery>;
export type StoreDetailLazyQueryHookResult = ReturnType<typeof useStoreDetailLazyQuery>;
export type StoreDetailQueryResult = Apollo.QueryResult<StoreDetailQueryResponse, StoreDetailQueryVariables>;
