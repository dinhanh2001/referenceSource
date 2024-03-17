import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { PartnerFragmentFragmentDoc } from '../fragments/partner.fragment.generated';

const defaultOptions = {} as const;
export type AgencyCreateTechnicianMutationVariables = Types.Exact<{
  input: Types.AgencyCreateTechnicianInput;
}>;

export type AgencyCreateTechnicianMutationResponse = { __typename?: 'Mutation' } & {
  agencyCreateTechnician: { __typename?: 'PartnerEntity' } & Pick<
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

export const AgencyCreateTechnicianDocument = gql`
  mutation agencyCreateTechnician($input: AgencyCreateTechnicianInput!) {
    agencyCreateTechnician(input: $input) {
      ...PartnerFragment
    }
  }
  ${PartnerFragmentFragmentDoc}
`;
export function useAgencyCreateTechnicianMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AgencyCreateTechnicianMutationResponse,
    AgencyCreateTechnicianMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AgencyCreateTechnicianMutationResponse, AgencyCreateTechnicianMutationVariables>(
    AgencyCreateTechnicianDocument,
    options,
  );
}
export type AgencyCreateTechnicianMutationHookResult = ReturnType<typeof useAgencyCreateTechnicianMutation>;
export type AgencyCreateTechnicianMutationResult = Apollo.MutationResult<AgencyCreateTechnicianMutationResponse>;
export type AgencyCreateTechnicianMutationOptions = Apollo.BaseMutationOptions<
  AgencyCreateTechnicianMutationResponse,
  AgencyCreateTechnicianMutationVariables
>;
