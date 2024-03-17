import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { PartnerFragmentFragmentDoc } from '../fragments/partner.fragment.generated';

const defaultOptions = {} as const;
export type AdminCreateFreelancerTechnicianMutationVariables = Types.Exact<{
  input: Types.NewFreelancerTechnicianInput;
}>;

export type AdminCreateFreelancerTechnicianMutationResponse = { __typename?: 'Mutation' } & {
  adminCreateFreelancerTechnician: { __typename?: 'PartnerEntity' } & Pick<
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

export const AdminCreateFreelancerTechnicianDocument = gql`
  mutation adminCreateFreelancerTechnician($input: NewFreelancerTechnicianInput!) {
    adminCreateFreelancerTechnician(input: $input) {
      ...PartnerFragment
    }
  }
  ${PartnerFragmentFragmentDoc}
`;
export function useAdminCreateFreelancerTechnicianMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AdminCreateFreelancerTechnicianMutationResponse,
    AdminCreateFreelancerTechnicianMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AdminCreateFreelancerTechnicianMutationResponse,
    AdminCreateFreelancerTechnicianMutationVariables
  >(AdminCreateFreelancerTechnicianDocument, options);
}
export type AdminCreateFreelancerTechnicianMutationHookResult = ReturnType<
  typeof useAdminCreateFreelancerTechnicianMutation
>;
export type AdminCreateFreelancerTechnicianMutationResult =
  Apollo.MutationResult<AdminCreateFreelancerTechnicianMutationResponse>;
export type AdminCreateFreelancerTechnicianMutationOptions = Apollo.BaseMutationOptions<
  AdminCreateFreelancerTechnicianMutationResponse,
  AdminCreateFreelancerTechnicianMutationVariables
>;
