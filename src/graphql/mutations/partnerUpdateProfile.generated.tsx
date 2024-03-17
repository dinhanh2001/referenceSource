import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { MediaFragmentFragmentDoc } from '../fragments/avatar.fragment.generated';

const defaultOptions = {} as const;
export type PartnerUpdateProfileMutationVariables = Types.Exact<{
  input: Types.UpdatePartnerBasicInfoInput;
}>;

export type PartnerUpdateProfileMutationResponse = { __typename?: 'Mutation' } & {
  partnerUpdateProfile: { __typename?: 'PartnerEntity' } & Pick<
    Types.PartnerEntity,
    | 'addressMoreInfo'
    | 'avatarId'
    | 'bank'
    | 'birthday'
    | 'cardNumber'
    | 'citizenId'
    | 'createdAt'
    | 'deletedAt'
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
    | 'parentId'
    | 'phone'
    | 'suggestionPoint'
    | 'type'
    | 'updatedAt'
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
        { __typename?: 'CategoryEntity' } & Pick<
          Types.CategoryEntity,
          'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
        >
      >;
      expenseInfo?: Types.Maybe<{ __typename?: 'Expense' } & Pick<Types.Expense, 'cost' | 'distance' | 'time'>>;
      level?: Types.Maybe<
        { __typename?: 'CategoryEntity' } & Pick<
          Types.CategoryEntity,
          'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
        >
      >;
      parentInfo?: Types.Maybe<
        { __typename?: 'PartnerEntity' } & Pick<
          Types.PartnerEntity,
          | 'addressMoreInfo'
          | 'avatarId'
          | 'bank'
          | 'birthday'
          | 'cardNumber'
          | 'citizenId'
          | 'createdAt'
          | 'deletedAt'
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
          | 'parentId'
          | 'phone'
          | 'suggestionPoint'
          | 'type'
          | 'updatedAt'
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
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >;
            expenseInfo?: Types.Maybe<{ __typename?: 'Expense' } & Pick<Types.Expense, 'cost' | 'distance' | 'time'>>;
            level?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >;
            parentInfo?: Types.Maybe<
              { __typename?: 'PartnerEntity' } & Pick<
                Types.PartnerEntity,
                | 'addressMoreInfo'
                | 'avatarId'
                | 'bank'
                | 'birthday'
                | 'cardNumber'
                | 'citizenId'
                | 'createdAt'
                | 'deletedAt'
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
                | 'parentId'
                | 'phone'
                | 'suggestionPoint'
                | 'type'
                | 'updatedAt'
              >
            >;
            qualifications?: Types.Maybe<
              Array<
                { __typename?: 'CategoryEntity' } & Pick<
                  Types.CategoryEntity,
                  'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                >
              >
            >;
            reviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
            >;
            starInfo: Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>;
          }
      >;
      qualifications?: Types.Maybe<
        Array<
          { __typename?: 'CategoryEntity' } & Pick<
            Types.CategoryEntity,
            'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
          >
        >
      >;
      reviewSummary?: Types.Maybe<
        { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
      >;
      starInfo: Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>;
    };
};

export const PartnerUpdateProfileDocument = gql`
  mutation partnerUpdateProfile($input: UpdatePartnerBasicInfoInput!) {
    partnerUpdateProfile(input: $input) {
      addressMoreInfo
      avatar {
        ...MediaFragment
      }
      avatarId
      bank
      birthday
      cardNumber
      citizenId
      createdAt
      deletedAt
      description
      education {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
      email
      expenseInfo {
        cost
        distance
        time
      }
      fullname
      hotline
      id
      isActive
      isApproved
      latitude
      level {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
      longitude
      mapAddress
      parentId
      parentInfo {
        addressMoreInfo
        avatar {
          createdAt
          fileSize
          fullOriginalUrl
          fullThumbUrl
          id
          isDeleted
          mimeType
          name
          originalUrl
          ownerId
          thumbUrl
          type
          updatedAt
          videoUrl
        }
        avatarId
        bank
        birthday
        cardNumber
        citizenId
        createdAt
        deletedAt
        description
        education {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        email
        expenseInfo {
          cost
          distance
          time
        }
        fullname
        hotline
        id
        isActive
        isApproved
        latitude
        level {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        longitude
        mapAddress
        parentId
        parentInfo {
          addressMoreInfo
          avatarId
          bank
          birthday
          cardNumber
          citizenId
          createdAt
          deletedAt
          description
          email
          fullname
          hotline
          id
          isActive
          isApproved
          latitude
          longitude
          mapAddress
          parentId
          phone
          suggestionPoint
          type
          updatedAt
        }
        phone
        qualifications {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        reviewSummary {
          percent
          starAverage
          total
        }
        starInfo {
          star
          total
        }
        suggestionPoint
        type
        updatedAt
      }
      phone
      qualifications {
        createdAt
        deletedAt
        id
        isActive
        name
        type
        updatedAt
      }
      reviewSummary {
        percent
        starAverage
        total
      }
      starInfo {
        star
        total
      }
      suggestionPoint
      type
      updatedAt
    }
  }
  ${MediaFragmentFragmentDoc}
`;
export function usePartnerUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerUpdateProfileMutationResponse, PartnerUpdateProfileMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerUpdateProfileMutationResponse, PartnerUpdateProfileMutationVariables>(
    PartnerUpdateProfileDocument,
    options,
  );
}
export type PartnerUpdateProfileMutationHookResult = ReturnType<typeof usePartnerUpdateProfileMutation>;
export type PartnerUpdateProfileMutationResult = Apollo.MutationResult<PartnerUpdateProfileMutationResponse>;
export type PartnerUpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  PartnerUpdateProfileMutationResponse,
  PartnerUpdateProfileMutationVariables
>;
