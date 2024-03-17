import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetNewsByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type UserGetNewsByIdQueryResponse = { __typename?: 'Query' } & {
  userGetNewsById: { __typename?: 'NewsEntity' } & Pick<
    Types.NewsEntity,
    'body' | 'createdAt' | 'id' | 'isActive' | 'description' | 'mediaId' | 'title'
  > & { media: { __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'> };
};

export const UserGetNewsByIdDocument = gql`
  query userGetNewsById($id: String!) {
    userGetNewsById(id: $id) {
      body
      createdAt
      id
      isActive
      description
      media {
        fullOriginalUrl
        fullThumbUrl
        id
      }
      mediaId
      title
    }
  }
`;
export function useUserGetNewsByIdQuery(
  baseOptions: Apollo.QueryHookOptions<UserGetNewsByIdQueryResponse, UserGetNewsByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetNewsByIdQueryResponse, UserGetNewsByIdQueryVariables>(UserGetNewsByIdDocument, options);
}
export function useUserGetNewsByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserGetNewsByIdQueryResponse, UserGetNewsByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetNewsByIdQueryResponse, UserGetNewsByIdQueryVariables>(
    UserGetNewsByIdDocument,
    options,
  );
}
export type UserGetNewsByIdQueryHookResult = ReturnType<typeof useUserGetNewsByIdQuery>;
export type UserGetNewsByIdLazyQueryHookResult = ReturnType<typeof useUserGetNewsByIdLazyQuery>;
export type UserGetNewsByIdQueryResult = Apollo.QueryResult<
  UserGetNewsByIdQueryResponse,
  UserGetNewsByIdQueryVariables
>;
