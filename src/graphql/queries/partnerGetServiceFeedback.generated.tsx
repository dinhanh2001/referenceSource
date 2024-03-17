import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerGetServiceFeedbackQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerGetServiceFeedbackQueryResponse = { __typename?: 'Query' } & {
  partnerGetServiceFeedback: { __typename?: 'ServiceFeedbackEntity' } & Pick<
    Types.ServiceFeedbackEntity,
    'answer' | 'content' | 'createAt' | 'id' | 'imagesAnswerIds' | 'imagesIds' | 'status' | 'type' | 'updateAt'
  > & {
      images: Array<
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
      imagesAnswer: Array<
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
    };
};

export const PartnerGetServiceFeedbackDocument = gql`
  query partnerGetServiceFeedback($id: String!) {
    partnerGetServiceFeedback(id: $id) {
      answer
      content
      createAt
      id
      images {
        ...MediaFragment
      }
      imagesAnswer {
        ...MediaFragment
      }
      imagesAnswerIds
      imagesIds
      status
      type
      updateAt
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function usePartnerGetServiceFeedbackQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetServiceFeedbackQueryResponse, PartnerGetServiceFeedbackQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetServiceFeedbackQueryResponse, PartnerGetServiceFeedbackQueryVariables>(
    PartnerGetServiceFeedbackDocument,
    options,
  );
}
export function usePartnerGetServiceFeedbackLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerGetServiceFeedbackQueryResponse,
    PartnerGetServiceFeedbackQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetServiceFeedbackQueryResponse, PartnerGetServiceFeedbackQueryVariables>(
    PartnerGetServiceFeedbackDocument,
    options,
  );
}
export type PartnerGetServiceFeedbackQueryHookResult = ReturnType<typeof usePartnerGetServiceFeedbackQuery>;
export type PartnerGetServiceFeedbackLazyQueryHookResult = ReturnType<typeof usePartnerGetServiceFeedbackLazyQuery>;
export type PartnerGetServiceFeedbackQueryResult = Apollo.QueryResult<
  PartnerGetServiceFeedbackQueryResponse,
  PartnerGetServiceFeedbackQueryVariables
>;
