import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerUpdateStoreMutationVariables = Types.Exact<{
  input: Types.UpdateStoreInput;
}>;

export type PartnerUpdateStoreMutationResponse = { __typename?: 'Mutation' } & {
  partnerUpdateStore: { __typename?: 'StoreEntity' } & Pick<Types.StoreEntity, 'id'>;
};

export const PartnerUpdateStoreDocument = gql`
  mutation partnerUpdateStore($input: UpdateStoreInput!) {
    partnerUpdateStore(input: $input) {
      id
    }
  }
`;
export function usePartnerUpdateStoreMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerUpdateStoreMutationResponse, PartnerUpdateStoreMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerUpdateStoreMutationResponse, PartnerUpdateStoreMutationVariables>(
    PartnerUpdateStoreDocument,
    options,
  );
}
export type PartnerUpdateStoreMutationHookResult = ReturnType<typeof usePartnerUpdateStoreMutation>;
export type PartnerUpdateStoreMutationResult = Apollo.MutationResult<PartnerUpdateStoreMutationResponse>;
export type PartnerUpdateStoreMutationOptions = Apollo.BaseMutationOptions<
  PartnerUpdateStoreMutationResponse,
  PartnerUpdateStoreMutationVariables
>;
