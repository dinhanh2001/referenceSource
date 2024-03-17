import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetSurveysQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type UserGetSurveysQueryResponse = { __typename?: 'Query' } & {
  userGetSurveys: { __typename?: 'SurveyConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'SurveyEntity' } & Pick<
          Types.SurveyEntity,
          'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'updatedAt' | 'userIsSubmitSurvey'
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

export const UserGetSurveysDocument = gql`
  query userGetSurveys(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    userGetSurveys(
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
export function useUserGetSurveysQuery(
  baseOptions?: Apollo.QueryHookOptions<UserGetSurveysQueryResponse, UserGetSurveysQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetSurveysQueryResponse, UserGetSurveysQueryVariables>(UserGetSurveysDocument, options);
}
export function useUserGetSurveysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserGetSurveysQueryResponse, UserGetSurveysQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetSurveysQueryResponse, UserGetSurveysQueryVariables>(
    UserGetSurveysDocument,
    options,
  );
}
export type UserGetSurveysQueryHookResult = ReturnType<typeof useUserGetSurveysQuery>;
export type UserGetSurveysLazyQueryHookResult = ReturnType<typeof useUserGetSurveysLazyQuery>;
export type UserGetSurveysQueryResult = Apollo.QueryResult<UserGetSurveysQueryResponse, UserGetSurveysQueryVariables>;
