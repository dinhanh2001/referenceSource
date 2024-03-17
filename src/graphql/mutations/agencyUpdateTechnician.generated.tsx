import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { PartnerFragmentFragmentDoc } from '../fragments/partner.fragment.generated';

const defaultOptions = {} as const;
export type AgencyUpdateTechnicianMutationVariables = Types.Exact<{
  input: Types.AgencyUpdateTechnicianInput;
}>;

export type AgencyUpdateTechnicianMutationResponse = { __typename?: 'Mutation' } & {
  agencyUpdateTechnician: { __typename?: 'PartnerEntity' } & Pick<
    Types.PartnerEntity,
    | 'addressMoreInfo'
    | 'avatarId'
    | 'bank'
    | 'birthday'
    | 'cardNumber'
    | 'citizenId'
    | 'description'
    | 'email'
    | 'fullname'
    | 'hotline'
    | 'id'
    | 'isActive'
    | 'isApproved'
    | 'latitude'
    | 'longitude'
    | 'mapAddress'
    | 'phone'
    | 'type'
    | 'star'
    | 'parentId'
    | 'menus'
  > & {
      avatar?: Types.Maybe<
        { __typename?: 'Media' } & Pick<
          Types.Media,
          | 'createdAt'
          | 'fileSize'
          | 'fullOriginalUrl'
          | 'fullThumbUrl'
          | 'id'
          | 'isDeleted'
          | 'mimeType'
          | 'name'
          | 'originalUrl'
          | 'ownerId'
          | 'thumbUrl'
          | 'type'
          | 'updatedAt'
          | 'videoUrl'
        >
      >;
      education?: Types.Maybe<
        { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
      >;
      level?: Types.Maybe<
        { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
      >;
      parentInfo?: Types.Maybe<
        { __typename?: 'PartnerEntity' } & {
          avatar?: Types.Maybe<
            { __typename?: 'Media' } & Pick<
              Types.Media,
              | 'createdAt'
              | 'fileSize'
              | 'fullOriginalUrl'
              | 'fullThumbUrl'
              | 'id'
              | 'isDeleted'
              | 'mimeType'
              | 'name'
              | 'originalUrl'
              | 'ownerId'
              | 'thumbUrl'
              | 'type'
              | 'updatedAt'
              | 'videoUrl'
            >
          >;
        }
      >;
      qualifications?: Types.Maybe<
        Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
      >;
    };
};

export const AgencyUpdateTechnicianDocument = gql`
  mutation agencyUpdateTechnician($input: AgencyUpdateTechnicianInput!) {
    agencyUpdateTechnician(input: $input) {
      ...PartnerFragment
    }
  }
  ${PartnerFragmentFragmentDoc}
`;
export function useAgencyUpdateTechnicianMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AgencyUpdateTechnicianMutationResponse,
    AgencyUpdateTechnicianMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AgencyUpdateTechnicianMutationResponse, AgencyUpdateTechnicianMutationVariables>(
    AgencyUpdateTechnicianDocument,
    options,
  );
}
export type AgencyUpdateTechnicianMutationHookResult = ReturnType<typeof useAgencyUpdateTechnicianMutation>;
export type AgencyUpdateTechnicianMutationResult = Apollo.MutationResult<AgencyUpdateTechnicianMutationResponse>;
export type AgencyUpdateTechnicianMutationOptions = Apollo.BaseMutationOptions<
  AgencyUpdateTechnicianMutationResponse,
  AgencyUpdateTechnicianMutationVariables
>;
