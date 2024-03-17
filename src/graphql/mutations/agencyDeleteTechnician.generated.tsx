import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type AgencyDeleteTechnicianMutationVariables = Types.Exact<{
  input: Types.AgencyDeleteTechnicianInput;
}>;

export type AgencyDeleteTechnicianMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'agencyDeleteTechnician'
>;

export const AgencyDeleteTechnicianDocument = gql`
  mutation agencyDeleteTechnician($input: AgencyDeleteTechnicianInput!) {
    agencyDeleteTechnician(input: $input)
  }
`;
export function useAgencyDeleteTechnicianMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AgencyDeleteTechnicianMutationResponse,
    AgencyDeleteTechnicianMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AgencyDeleteTechnicianMutationResponse, AgencyDeleteTechnicianMutationVariables>(
    AgencyDeleteTechnicianDocument,
    options,
  );
}
export type AgencyDeleteTechnicianMutationHookResult = ReturnType<typeof useAgencyDeleteTechnicianMutation>;
export type AgencyDeleteTechnicianMutationResult = Apollo.MutationResult<AgencyDeleteTechnicianMutationResponse>;
export type AgencyDeleteTechnicianMutationOptions = Apollo.BaseMutationOptions<
  AgencyDeleteTechnicianMutationResponse,
  AgencyDeleteTechnicianMutationVariables
>;
