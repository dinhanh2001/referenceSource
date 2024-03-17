import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetSurveyQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type PartnerGetSurveyQueryResponse = { __typename?: 'Query' } & {
  partnerGetSurvey: { __typename?: 'SurveyEntity' } & Pick<
    Types.SurveyEntity,
    'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'partnerIsSubmitSurvey' | 'updatedAt'
  > & {
      partnerResultSurvey?: Types.Maybe<
        { __typename?: 'SurveyHistoryEntity' } & Pick<
          Types.SurveyHistoryEntity,
          'createdAt' | 'deletedAt' | 'id' | 'surveyId' | 'type' | 'updatedAt' | 'userId'
        > & { results: Array<{ __typename?: 'SurveyResult' } & Pick<Types.SurveyResult, 'questionId' | 'answer'>> }
      >;
      questions: Array<
        { __typename?: 'QuestionEntity' } & Pick<
          Types.QuestionEntity,
          | 'answers'
          | 'answerType'
          | 'createdAt'
          | 'deletedAt'
          | 'id'
          | 'isRequired'
          | 'question'
          | 'surveyId'
          | 'updatedAt'
        >
      >;
    };
};

export const PartnerGetSurveyDocument = gql`
  query partnerGetSurvey($id: String!) {
    partnerGetSurvey(id: $id) {
      createdAt
      deletedAt
      id
      isActive
      name
      partnerIsSubmitSurvey
      partnerResultSurvey {
        createdAt
        deletedAt
        id
        results {
          questionId
          answer
        }
        surveyId
        type
        updatedAt
        userId
      }
      questions {
        answers
        answerType
        createdAt
        deletedAt
        id
        isRequired
        question
        surveyId
        updatedAt
      }
      updatedAt
    }
  }
`;
export function usePartnerGetSurveyQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetSurveyQueryResponse, PartnerGetSurveyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetSurveyQueryResponse, PartnerGetSurveyQueryVariables>(
    PartnerGetSurveyDocument,
    options,
  );
}
export function usePartnerGetSurveyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetSurveyQueryResponse, PartnerGetSurveyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetSurveyQueryResponse, PartnerGetSurveyQueryVariables>(
    PartnerGetSurveyDocument,
    options,
  );
}
export type PartnerGetSurveyQueryHookResult = ReturnType<typeof usePartnerGetSurveyQuery>;
export type PartnerGetSurveyLazyQueryHookResult = ReturnType<typeof usePartnerGetSurveyLazyQuery>;
export type PartnerGetSurveyQueryResult = Apollo.QueryResult<
  PartnerGetSurveyQueryResponse,
  PartnerGetSurveyQueryVariables
>;
