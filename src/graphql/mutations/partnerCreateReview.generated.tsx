import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCreateReviewMutationVariables = Types.Exact<{
  input: Types.CreateReviewInput;
}>;

export type PartnerCreateReviewMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerCreateReview'
>;

export const PartnerCreateReviewDocument = gql`
  mutation partnerCreateReview($input: CreateReviewInput!) {
    partnerCreateReview(input: $input)
  }
`;
export function usePartnerCreateReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerCreateReviewMutationResponse, PartnerCreateReviewMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerCreateReviewMutationResponse, PartnerCreateReviewMutationVariables>(
    PartnerCreateReviewDocument,
    options,
  );
}
export type PartnerCreateReviewMutationHookResult = ReturnType<typeof usePartnerCreateReviewMutation>;
export type PartnerCreateReviewMutationResult = Apollo.MutationResult<PartnerCreateReviewMutationResponse>;
export type PartnerCreateReviewMutationOptions = Apollo.BaseMutationOptions<
  PartnerCreateReviewMutationResponse,
  PartnerCreateReviewMutationVariables
>;
