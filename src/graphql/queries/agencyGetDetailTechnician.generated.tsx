import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { PartnerFragmentFragmentDoc } from '../fragments/partner.fragment.generated';

const defaultOptions = {} as const;
export type AgencyGetDetailTechnicianQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type AgencyGetDetailTechnicianQueryResponse = { __typename?: 'Query' } & {
  agencyGetDetailTechnician: { __typename?: 'PartnerEntity' } & Pick<
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

export const AgencyGetDetailTechnicianDocument = gql`
  query agencyGetDetailTechnician($id: String!) {
    agencyGetDetailTechnician(id: $id) {
      ...PartnerFragment
    }
  }
  ${PartnerFragmentFragmentDoc}
`;
export function useAgencyGetDetailTechnicianQuery(
  baseOptions: Apollo.QueryHookOptions<AgencyGetDetailTechnicianQueryResponse, AgencyGetDetailTechnicianQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AgencyGetDetailTechnicianQueryResponse, AgencyGetDetailTechnicianQueryVariables>(
    AgencyGetDetailTechnicianDocument,
    options,
  );
}
export function useAgencyGetDetailTechnicianLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AgencyGetDetailTechnicianQueryResponse,
    AgencyGetDetailTechnicianQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AgencyGetDetailTechnicianQueryResponse, AgencyGetDetailTechnicianQueryVariables>(
    AgencyGetDetailTechnicianDocument,
    options,
  );
}
export type AgencyGetDetailTechnicianQueryHookResult = ReturnType<typeof useAgencyGetDetailTechnicianQuery>;
export type AgencyGetDetailTechnicianLazyQueryHookResult = ReturnType<typeof useAgencyGetDetailTechnicianLazyQuery>;
export type AgencyGetDetailTechnicianQueryResult = Apollo.QueryResult<
  AgencyGetDetailTechnicianQueryResponse,
  AgencyGetDetailTechnicianQueryVariables
>;
