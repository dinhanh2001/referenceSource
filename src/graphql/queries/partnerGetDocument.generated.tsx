import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerGetDocumentQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerGetDocumentQueryResponse = { __typename?: 'Query' } & {
  partnerGetDocument: { __typename?: 'DocumentEntity' } & Pick<
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
      > & {
          documents?: Types.Maybe<
            Array<
              { __typename?: 'DocumentEntity' } & Pick<
                Types.DocumentEntity,
                'createdAt' | 'deletedAt' | 'fileIds' | 'id' | 'isActive' | 'name' | 'referenceId' | 'updatedAt'
              >
            >
          >;
        };
    };
};

export const PartnerGetDocumentDocument = gql`
  query partnerGetDocument($id: String!) {
    partnerGetDocument(id: $id) {
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
        documents {
          createdAt
          deletedAt
          fileIds
          id
          isActive
          name
          referenceId
          updatedAt
        }
        id
        isActive
        name
        updatedAt
      }
      referenceId
      updatedAt
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function usePartnerGetDocumentQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetDocumentQueryResponse, PartnerGetDocumentQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetDocumentQueryResponse, PartnerGetDocumentQueryVariables>(
    PartnerGetDocumentDocument,
    options,
  );
}
export function usePartnerGetDocumentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetDocumentQueryResponse, PartnerGetDocumentQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetDocumentQueryResponse, PartnerGetDocumentQueryVariables>(
    PartnerGetDocumentDocument,
    options,
  );
}
export type PartnerGetDocumentQueryHookResult = ReturnType<typeof usePartnerGetDocumentQuery>;
export type PartnerGetDocumentLazyQueryHookResult = ReturnType<typeof usePartnerGetDocumentLazyQuery>;
export type PartnerGetDocumentQueryResult = Apollo.QueryResult<
  PartnerGetDocumentQueryResponse,
  PartnerGetDocumentQueryVariables
>;
