import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type GetConnectedSocialAccountsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetConnectedSocialAccountsQueryResponse = { __typename?: 'Query' } & {
  getConnectedSocialAccounts: Array<
    { __typename?: 'SocialAccount' } & Pick<Types.SocialAccount, 'id' | 'socialEmail' | 'socialId' | 'type' | 'userId'>
  >;
};

export const GetConnectedSocialAccountsDocument = gql`
  query getConnectedSocialAccounts {
    getConnectedSocialAccounts {
      id
      socialEmail
      socialId
      type
      userId
    }
  }
`;
export function useGetConnectedSocialAccountsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetConnectedSocialAccountsQueryResponse,
    GetConnectedSocialAccountsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetConnectedSocialAccountsQueryResponse, GetConnectedSocialAccountsQueryVariables>(
    GetConnectedSocialAccountsDocument,
    options,
  );
}
export function useGetConnectedSocialAccountsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetConnectedSocialAccountsQueryResponse,
    GetConnectedSocialAccountsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetConnectedSocialAccountsQueryResponse, GetConnectedSocialAccountsQueryVariables>(
    GetConnectedSocialAccountsDocument,
    options,
  );
}
export type GetConnectedSocialAccountsQueryHookResult = ReturnType<typeof useGetConnectedSocialAccountsQuery>;
export type GetConnectedSocialAccountsLazyQueryHookResult = ReturnType<typeof useGetConnectedSocialAccountsLazyQuery>;
export type GetConnectedSocialAccountsQueryResult = Apollo.QueryResult<
  GetConnectedSocialAccountsQueryResponse,
  GetConnectedSocialAccountsQueryVariables
>;
