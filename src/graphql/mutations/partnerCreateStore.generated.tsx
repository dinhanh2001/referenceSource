import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCreateStoreMutationVariables = Types.Exact<{
  input: Types.CreateStoreInput;
}>;

export type PartnerCreateStoreMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerCreateStore'
>;

export const PartnerCreateStoreDocument = gql`
  mutation partnerCreateStore($input: CreateStoreInput!) {
    partnerCreateStore(input: $input)
  }
`;
export function usePartnerCreateStoreMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerCreateStoreMutationResponse, PartnerCreateStoreMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerCreateStoreMutationResponse, PartnerCreateStoreMutationVariables>(
    PartnerCreateStoreDocument,
    options,
  );
}
export type PartnerCreateStoreMutationHookResult = ReturnType<typeof usePartnerCreateStoreMutation>;
export type PartnerCreateStoreMutationResult = Apollo.MutationResult<PartnerCreateStoreMutationResponse>;
export type PartnerCreateStoreMutationOptions = Apollo.BaseMutationOptions<
  PartnerCreateStoreMutationResponse,
  PartnerCreateStoreMutationVariables
>;
