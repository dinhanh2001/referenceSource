import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { PartnerFragmentFragmentDoc } from '../fragments/partner.fragment.generated';

const defaultOptions = {} as const;
export type MePartnerQueryVariables = Types.Exact<{
  deviceId?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type MePartnerQueryResponse = { __typename?: 'Query' } & {
  mePartner: { __typename?: 'PartnerEntity' } & Pick<
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
      reviewSummary?: Types.Maybe<
        { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
      >;
      storeReviewSummary?: Types.Maybe<
        { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
      >;
      storeStarInfo?: Types.Maybe<Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>>;
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
    };
};

export const MePartnerDocument = gql`
  query mePartner($deviceId: String) {
    mePartner(deviceId: $deviceId) {
      ...PartnerFragment
      reviewSummary {
        starAverage
        total
        percent
      }
      storeReviewSummary {
        starAverage
        total
        percent
      }
      storeStarInfo {
        star
        total
      }
    }
  }
  ${PartnerFragmentFragmentDoc}
`;
export function useMePartnerQuery(
  baseOptions?: Apollo.QueryHookOptions<MePartnerQueryResponse, MePartnerQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MePartnerQueryResponse, MePartnerQueryVariables>(MePartnerDocument, options);
}
export function useMePartnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MePartnerQueryResponse, MePartnerQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MePartnerQueryResponse, MePartnerQueryVariables>(MePartnerDocument, options);
}
export type MePartnerQueryHookResult = ReturnType<typeof useMePartnerQuery>;
export type MePartnerLazyQueryHookResult = ReturnType<typeof useMePartnerLazyQuery>;
export type MePartnerQueryResult = Apollo.QueryResult<MePartnerQueryResponse, MePartnerQueryVariables>;
