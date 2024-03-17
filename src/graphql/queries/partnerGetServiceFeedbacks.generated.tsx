import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetServiceFeedbacksQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  status?: Types.InputMaybe<Types.ServiceFeedbacksStatusEnum>;
  type?: Types.InputMaybe<Types.ServiceFeedbackTypeEnum>;
}>;

export type PartnerGetServiceFeedbacksQueryResponse = { __typename?: 'Query' } & {
  partnerGetServiceFeedbacks: { __typename?: 'ServiceFeedbackConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ServiceFeedbackEntity' } & Pick<
          Types.ServiceFeedbackEntity,
          'answer' | 'content' | 'createAt' | 'id' | 'status' | 'type' | 'updateAt'
        >
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const PartnerGetServiceFeedbacksDocument = gql`
  query partnerGetServiceFeedbacks(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $status: ServiceFeedbacksStatusEnum
    $type: ServiceFeedbackTypeEnum
  ) {
    partnerGetServiceFeedbacks(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      status: $status
      type: $type
    ) {
      items {
        answer
        content
        createAt
        id
        status
        type
        updateAt
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
export function usePartnerGetServiceFeedbacksQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PartnerGetServiceFeedbacksQueryResponse,
    PartnerGetServiceFeedbacksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetServiceFeedbacksQueryResponse, PartnerGetServiceFeedbacksQueryVariables>(
    PartnerGetServiceFeedbacksDocument,
    options,
  );
}
export function usePartnerGetServiceFeedbacksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerGetServiceFeedbacksQueryResponse,
    PartnerGetServiceFeedbacksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetServiceFeedbacksQueryResponse, PartnerGetServiceFeedbacksQueryVariables>(
    PartnerGetServiceFeedbacksDocument,
    options,
  );
}
export type PartnerGetServiceFeedbacksQueryHookResult = ReturnType<typeof usePartnerGetServiceFeedbacksQuery>;
export type PartnerGetServiceFeedbacksLazyQueryHookResult = ReturnType<typeof usePartnerGetServiceFeedbacksLazyQuery>;
export type PartnerGetServiceFeedbacksQueryResult = Apollo.QueryResult<
  PartnerGetServiceFeedbacksQueryResponse,
  PartnerGetServiceFeedbacksQueryVariables
>;
