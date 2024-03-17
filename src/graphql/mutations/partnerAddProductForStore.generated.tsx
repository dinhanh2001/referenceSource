import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerAddProductForStoreMutationVariables = Types.Exact<{
  input: Types.CreateStoreProductHistoryInput;
}>;

export type PartnerAddProductForStoreMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'partnerAddProductForStore'
>;

export const PartnerAddProductForStoreDocument = gql`
  mutation partnerAddProductForStore($input: CreateStoreProductHistoryInput!) {
    partnerAddProductForStore(input: $input)
  }
`;
export function usePartnerAddProductForStoreMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerAddProductForStoreMutationResponse,
    PartnerAddProductForStoreMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerAddProductForStoreMutationResponse, PartnerAddProductForStoreMutationVariables>(
    PartnerAddProductForStoreDocument,
    options,
  );
}
export type PartnerAddProductForStoreMutationHookResult = ReturnType<typeof usePartnerAddProductForStoreMutation>;
export type PartnerAddProductForStoreMutationResult = Apollo.MutationResult<PartnerAddProductForStoreMutationResponse>;
export type PartnerAddProductForStoreMutationOptions = Apollo.BaseMutationOptions<
  PartnerAddProductForStoreMutationResponse,
  PartnerAddProductForStoreMutationVariables
>;
