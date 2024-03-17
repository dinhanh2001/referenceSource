import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerGetReferenceQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerGetReferenceQueryResponse = { __typename?: 'Query' } & {
  partnerGetReference: { __typename?: 'ReferenceEntity' } & Pick<
    Types.ReferenceEntity,
    'createdAt' | 'deletedAt' | 'description' | 'id' | 'isActive' | 'name' | 'updatedAt'
  > & {
      documents?: Types.Maybe<
        Array<
          { __typename?: 'DocumentEntity' } & Pick<
            Types.DocumentEntity,
            'createdAt' | 'deletedAt' | 'fileIds' | 'id' | 'isActive' | 'name' | 'referenceId' | 'updatedAt'
          > & {
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
              reference: { __typename?: 'ReferenceEntity' } & Pick<
                Types.ReferenceEntity,
                'createdAt' | 'deletedAt' | 'description' | 'id' | 'isActive' | 'name' | 'updatedAt'
              >;
            }
        >
      >;
    };
};

export const PartnerGetReferenceDocument = gql`
  query partnerGetReference($id: String!) {
    partnerGetReference(id: $id) {
      createdAt
      deletedAt
      description
      documents {
        createdAt
        deletedAt
        fileIds
        files {
          ...MediaFragment
        }
        id
        isActive
        name
        reference {
          createdAt
          deletedAt
          description
          id
          isActive
          name
          updatedAt
        }
        referenceId
        updatedAt
      }
      id
      isActive
      name
      updatedAt
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function usePartnerGetReferenceQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetReferenceQueryResponse, PartnerGetReferenceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetReferenceQueryResponse, PartnerGetReferenceQueryVariables>(
    PartnerGetReferenceDocument,
    options,
  );
}
export function usePartnerGetReferenceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetReferenceQueryResponse, PartnerGetReferenceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetReferenceQueryResponse, PartnerGetReferenceQueryVariables>(
    PartnerGetReferenceDocument,
    options,
  );
}
export type PartnerGetReferenceQueryHookResult = ReturnType<typeof usePartnerGetReferenceQuery>;
export type PartnerGetReferenceLazyQueryHookResult = ReturnType<typeof usePartnerGetReferenceLazyQuery>;
export type PartnerGetReferenceQueryResult = Apollo.QueryResult<
  PartnerGetReferenceQueryResponse,
  PartnerGetReferenceQueryVariables
>;
