import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/mediaFragment.generated';

const defaultOptions = {} as const;
export type UserGetGuideQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type UserGetGuideQueryResponse = { __typename?: 'Query' } & {
  userGetGuide: { __typename?: 'GuideEntity' } & Pick<
    Types.GuideEntity,
    'id' | 'name' | 'description' | 'isActive' | 'createdAt'
  > & {
      instructions?: Types.Maybe<
        Array<
          { __typename?: 'InstructionEntity' } & Pick<Types.InstructionEntity, 'name'> & {
              files: Array<
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
              guide: { __typename?: 'GuideEntity' } & Pick<Types.GuideEntity, 'id' | 'name' | 'description'>;
            }
        >
      >;
    };
};

export const UserGetGuideDocument = gql`
  query userGetGuide($id: String!) {
    userGetGuide(id: $id) {
      id
      name
      description
      isActive
      instructions {
        name
        files {
          ...MediaFragment
        }
        guide {
          id
          name
          description
        }
      }
      createdAt
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function useUserGetGuideQuery(
  baseOptions: Apollo.QueryHookOptions<UserGetGuideQueryResponse, UserGetGuideQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetGuideQueryResponse, UserGetGuideQueryVariables>(UserGetGuideDocument, options);
}
export function useUserGetGuideLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserGetGuideQueryResponse, UserGetGuideQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetGuideQueryResponse, UserGetGuideQueryVariables>(UserGetGuideDocument, options);
}
export type UserGetGuideQueryHookResult = ReturnType<typeof useUserGetGuideQuery>;
export type UserGetGuideLazyQueryHookResult = ReturnType<typeof useUserGetGuideLazyQuery>;
export type UserGetGuideQueryResult = Apollo.QueryResult<UserGetGuideQueryResponse, UserGetGuideQueryVariables>;
