import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerSubmitSurveyMutationVariables = Types.Exact<{
  input: Types.CreateSurveyHistoryInput;
}>;

export type PartnerSubmitSurveyMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerSubmitSurvey'
>;

export const PartnerSubmitSurveyDocument = gql`
  mutation partnerSubmitSurvey($input: CreateSurveyHistoryInput!) {
    partnerSubmitSurvey(input: $input)
  }
`;
export function usePartnerSubmitSurveyMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerSubmitSurveyMutationResponse, PartnerSubmitSurveyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerSubmitSurveyMutationResponse, PartnerSubmitSurveyMutationVariables>(
    PartnerSubmitSurveyDocument,
    options,
  );
}
export type PartnerSubmitSurveyMutationHookResult = ReturnType<typeof usePartnerSubmitSurveyMutation>;
export type PartnerSubmitSurveyMutationResult = Apollo.MutationResult<PartnerSubmitSurveyMutationResponse>;
export type PartnerSubmitSurveyMutationOptions = Apollo.BaseMutationOptions<
  PartnerSubmitSurveyMutationResponse,
  PartnerSubmitSurveyMutationVariables
>;
