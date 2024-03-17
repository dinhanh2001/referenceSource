import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetSurveysQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type PartnerGetSurveysQueryResponse = { __typename?: 'Query' } & {
  partnerGetSurveys: { __typename?: 'SurveyConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'SurveyEntity' } & Pick<
          Types.SurveyEntity,
          | 'createdAt'
          | 'deletedAt'
          | 'id'
          | 'isActive'
          | 'name'
          | 'updatedAt'
          | 'partnerIsSubmitSurvey'
          | 'userIsSubmitSurvey'
        > & {
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
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const PartnerGetSurveysDocument = gql`
  query partnerGetSurveys(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    partnerGetSurveys(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
    ) {
      items {
        createdAt
        deletedAt
        id
        isActive
        name
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
        partnerIsSubmitSurvey
        userIsSubmitSurvey
      }
      meta {
        currentPage
        itemCount
        itemsPerPage
        totalItems
        totalPages
      }
    }
  }
`;
export function usePartnerGetSurveysQuery(
  baseOptions?: Apollo.QueryHookOptions<PartnerGetSurveysQueryResponse, PartnerGetSurveysQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetSurveysQueryResponse, PartnerGetSurveysQueryVariables>(
    PartnerGetSurveysDocument,
    options,
  );
}
export function usePartnerGetSurveysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetSurveysQueryResponse, PartnerGetSurveysQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetSurveysQueryResponse, PartnerGetSurveysQueryVariables>(
    PartnerGetSurveysDocument,
    options,
  );
}
export type PartnerGetSurveysQueryHookResult = ReturnType<typeof usePartnerGetSurveysQuery>;
export type PartnerGetSurveysLazyQueryHookResult = ReturnType<typeof usePartnerGetSurveysLazyQuery>;
export type PartnerGetSurveysQueryResult = Apollo.QueryResult<
  PartnerGetSurveysQueryResponse,
  PartnerGetSurveysQueryVariables
>;
