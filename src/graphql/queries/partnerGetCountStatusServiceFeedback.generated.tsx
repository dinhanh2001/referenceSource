import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetCountStatusServiceFeedbackQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PartnerGetCountStatusServiceFeedbackQueryResponse = { __typename?: 'Query' } & {
  partnerGetCountStatusServiceFeedback: Array<
    { __typename?: 'ServiceFeedbackStatusAndItemCount' } & Pick<
      Types.ServiceFeedbackStatusAndItemCount,
      'quantity' | 'status'
    >
  >;
};

export const PartnerGetCountStatusServiceFeedbackDocument = gql`
  query partnerGetCountStatusServiceFeedback {
    partnerGetCountStatusServiceFeedback {
      quantity
      status
    }
  }
`;
export function usePartnerGetCountStatusServiceFeedbackQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PartnerGetCountStatusServiceFeedbackQueryResponse,
    PartnerGetCountStatusServiceFeedbackQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PartnerGetCountStatusServiceFeedbackQueryResponse,
    PartnerGetCountStatusServiceFeedbackQueryVariables
  >(PartnerGetCountStatusServiceFeedbackDocument, options);
}
export function usePartnerGetCountStatusServiceFeedbackLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerGetCountStatusServiceFeedbackQueryResponse,
    PartnerGetCountStatusServiceFeedbackQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PartnerGetCountStatusServiceFeedbackQueryResponse,
    PartnerGetCountStatusServiceFeedbackQueryVariables
  >(PartnerGetCountStatusServiceFeedbackDocument, options);
}
export type PartnerGetCountStatusServiceFeedbackQueryHookResult = ReturnType<
  typeof usePartnerGetCountStatusServiceFeedbackQuery
>;
export type PartnerGetCountStatusServiceFeedbackLazyQueryHookResult = ReturnType<
  typeof usePartnerGetCountStatusServiceFeedbackLazyQuery
>;
export type PartnerGetCountStatusServiceFeedbackQueryResult = Apollo.QueryResult<
  PartnerGetCountStatusServiceFeedbackQueryResponse,
  PartnerGetCountStatusServiceFeedbackQueryVariables
>;
