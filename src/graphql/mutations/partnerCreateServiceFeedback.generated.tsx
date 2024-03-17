import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCreateServiceFeedbackMutationVariables = Types.Exact<{
  input: Types.CreateServiceFeedbackInput;
}>;

export type PartnerCreateServiceFeedbackMutationResponse = { __typename?: 'Mutation' } & {
  partnerCreateServiceFeedback: { __typename?: 'ServiceFeedbackEntity' } & Pick<Types.ServiceFeedbackEntity, 'id'>;
};

export const PartnerCreateServiceFeedbackDocument = gql`
  mutation partnerCreateServiceFeedback($input: CreateServiceFeedbackInput!) {
    partnerCreateServiceFeedback(input: $input) {
      id
    }
  }
`;
export function usePartnerCreateServiceFeedbackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerCreateServiceFeedbackMutationResponse,
    PartnerCreateServiceFeedbackMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    PartnerCreateServiceFeedbackMutationResponse,
    PartnerCreateServiceFeedbackMutationVariables
  >(PartnerCreateServiceFeedbackDocument, options);
}
export type PartnerCreateServiceFeedbackMutationHookResult = ReturnType<typeof usePartnerCreateServiceFeedbackMutation>;
export type PartnerCreateServiceFeedbackMutationResult =
  Apollo.MutationResult<PartnerCreateServiceFeedbackMutationResponse>;
export type PartnerCreateServiceFeedbackMutationOptions = Apollo.BaseMutationOptions<
  PartnerCreateServiceFeedbackMutationResponse,
  PartnerCreateServiceFeedbackMutationVariables
>;
