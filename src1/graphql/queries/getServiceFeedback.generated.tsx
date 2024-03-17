import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type GetServiceFeedbackQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type GetServiceFeedbackQueryResponse = { __typename?: 'Query' } & {
  getServiceFeedback: { __typename?: 'ServiceFeedbackEntity' } & Pick<
    Types.ServiceFeedbackEntity,
    | 'answer'
    | 'content'
    | 'createAt'
    | 'id'
    | 'imagesAnswerIds'
    | 'imagesIds'
    | 'status'
    | 'type'
    | 'updateAt'
    | 'userId'
  > & {
      images: Array<{ __typename?: 'Media' } & Pick<Types.Media, 'id' | 'fullThumbUrl' | 'fullOriginalUrl' | 'type'>>;
      imagesAnswer: Array<
        { __typename?: 'Media' } & Pick<Types.Media, 'id' | 'fullThumbUrl' | 'fullOriginalUrl' | 'type'>
      >;
    };
};

export const GetServiceFeedbackDocument = gql`
  query getServiceFeedback($id: String!) {
    getServiceFeedback(id: $id) {
      answer
      content
      createAt
      id
      images {
        id
        fullThumbUrl
        fullOriginalUrl
        type
      }
      imagesAnswer {
        id
        fullThumbUrl
        fullOriginalUrl
        type
      }
      imagesAnswerIds
      imagesIds
      status
      type
      updateAt
      userId
    }
  }
`;
export function useGetServiceFeedbackQuery(
  baseOptions: Apollo.QueryHookOptions<GetServiceFeedbackQueryResponse, GetServiceFeedbackQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetServiceFeedbackQueryResponse, GetServiceFeedbackQueryVariables>(
    GetServiceFeedbackDocument,
    options,
  );
}
export function useGetServiceFeedbackLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetServiceFeedbackQueryResponse, GetServiceFeedbackQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetServiceFeedbackQueryResponse, GetServiceFeedbackQueryVariables>(
    GetServiceFeedbackDocument,
    options,
  );
}
export type GetServiceFeedbackQueryHookResult = ReturnType<typeof useGetServiceFeedbackQuery>;
export type GetServiceFeedbackLazyQueryHookResult = ReturnType<typeof useGetServiceFeedbackLazyQuery>;
export type GetServiceFeedbackQueryResult = Apollo.QueryResult<
  GetServiceFeedbackQueryResponse,
  GetServiceFeedbackQueryVariables
>;
