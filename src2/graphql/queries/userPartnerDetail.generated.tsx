import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { PartnerFragmentFragmentDoc } from '../fragments/partnerFragment.generated';

const defaultOptions = {} as const;
export type UserPartnerDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type UserPartnerDetailQueryResponse = { __typename?: 'Query' } & {
  userPartnerDetail: { __typename?: 'PartnerEntity' } & Pick<
    Types.PartnerEntity,
    | 'addressMoreInfo'
    | 'avatarId'
    | 'bank'
    | 'birthday'
    | 'cardNumber'
    | 'citizenId'
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
    };
};

export const UserPartnerDetailDocument = gql`
  query userPartnerDetail($id: String!) {
    userPartnerDetail(id: $id) {
      ...PartnerFragment
    }
  }
  ${PartnerFragmentFragmentDoc}
`;
export function useUserPartnerDetailQuery(
  baseOptions: Apollo.QueryHookOptions<UserPartnerDetailQueryResponse, UserPartnerDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserPartnerDetailQueryResponse, UserPartnerDetailQueryVariables>(
    UserPartnerDetailDocument,
    options,
  );
}
export function useUserPartnerDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserPartnerDetailQueryResponse, UserPartnerDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserPartnerDetailQueryResponse, UserPartnerDetailQueryVariables>(
    UserPartnerDetailDocument,
    options,
  );
}
export type UserPartnerDetailQueryHookResult = ReturnType<typeof useUserPartnerDetailQuery>;
export type UserPartnerDetailLazyQueryHookResult = ReturnType<typeof useUserPartnerDetailLazyQuery>;
export type UserPartnerDetailQueryResult = Apollo.QueryResult<
  UserPartnerDetailQueryResponse,
  UserPartnerDetailQueryVariables
>;
