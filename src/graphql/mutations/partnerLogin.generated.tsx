import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { PartnerFragmentFragmentDoc } from '../fragments/partner.fragment.generated';

const defaultOptions = {} as const;
export type PartnerLoginMutationVariables = Types.Exact<{
  input: Types.PartnerLoginInput;
}>;

export type PartnerLoginMutationResponse = { __typename?: 'Mutation' } & {
  partnerLogin: { __typename?: 'PartnerAuthConnection' } & Pick<
    Types.PartnerAuthConnection,
    'accessToken' | 'refreshToken'
  > & {
      partner: { __typename?: 'PartnerEntity' } & Pick<
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
          reviewSummary?: Types.Maybe<
            { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
          >;
          storeReviewSummary?: Types.Maybe<
            { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
          >;
          storeStarInfo?: Types.Maybe<Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>>;
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
};

export const PartnerLoginDocument = gql`
  mutation partnerLogin($input: PartnerLoginInput!) {
    partnerLogin(input: $input) {
      accessToken
      refreshToken
      partner {
        ...PartnerFragment
        reviewSummary {
          starAverage
          total
          percent
        }
        storeReviewSummary {
          starAverage
          total
          percent
        }
        storeStarInfo {
          star
          total
        }
      }
    }
  }
  ${PartnerFragmentFragmentDoc}
`;
export function usePartnerLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerLoginMutationResponse, PartnerLoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerLoginMutationResponse, PartnerLoginMutationVariables>(PartnerLoginDocument, options);
}
export type PartnerLoginMutationHookResult = ReturnType<typeof usePartnerLoginMutation>;
export type PartnerLoginMutationResult = Apollo.MutationResult<PartnerLoginMutationResponse>;
export type PartnerLoginMutationOptions = Apollo.BaseMutationOptions<
  PartnerLoginMutationResponse,
  PartnerLoginMutationVariables
>;
