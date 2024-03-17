import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerUpdateMenuConfigsMutationVariables = Types.Exact<{
  input: Types.PartnerUpdateMenuConfigsInput;
}>;

export type PartnerUpdateMenuConfigsMutationResponse = { __typename?: 'Mutation' } & {
  partnerUpdateMenuConfigs: { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'id'>;
};

export const PartnerUpdateMenuConfigsDocument = gql`
  mutation partnerUpdateMenuConfigs($input: PartnerUpdateMenuConfigsInput!) {
    partnerUpdateMenuConfigs(input: $input) {
      id
    }
  }
`;
export function usePartnerUpdateMenuConfigsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PartnerUpdateMenuConfigsMutationResponse,
    PartnerUpdateMenuConfigsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerUpdateMenuConfigsMutationResponse, PartnerUpdateMenuConfigsMutationVariables>(
    PartnerUpdateMenuConfigsDocument,
    options,
  );
}
export type PartnerUpdateMenuConfigsMutationHookResult = ReturnType<typeof usePartnerUpdateMenuConfigsMutation>;
export type PartnerUpdateMenuConfigsMutationResult = Apollo.MutationResult<PartnerUpdateMenuConfigsMutationResponse>;
export type PartnerUpdateMenuConfigsMutationOptions = Apollo.BaseMutationOptions<
  PartnerUpdateMenuConfigsMutationResponse,
  PartnerUpdateMenuConfigsMutationVariables
>;
