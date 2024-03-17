import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserAddMultipleFavoriteProductMutationVariables = Types.Exact<{
  input: Types.UserAddMultiFavoriteProductInput;
}>;

export type UserAddMultipleFavoriteProductMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userAddMultipleFavoriteProduct'
>;

export const UserAddMultipleFavoriteProductDocument = gql`
  mutation userAddMultipleFavoriteProduct($input: UserAddMultiFavoriteProductInput!) {
    userAddMultipleFavoriteProduct(input: $input)
  }
`;
export function useUserAddMultipleFavoriteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserAddMultipleFavoriteProductMutationResponse,
    UserAddMultipleFavoriteProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UserAddMultipleFavoriteProductMutationResponse,
    UserAddMultipleFavoriteProductMutationVariables
  >(UserAddMultipleFavoriteProductDocument, options);
}
export type UserAddMultipleFavoriteProductMutationHookResult = ReturnType<
  typeof useUserAddMultipleFavoriteProductMutation
>;
export type UserAddMultipleFavoriteProductMutationResult =
  Apollo.MutationResult<UserAddMultipleFavoriteProductMutationResponse>;
export type UserAddMultipleFavoriteProductMutationOptions = Apollo.BaseMutationOptions<
  UserAddMultipleFavoriteProductMutationResponse,
  UserAddMultipleFavoriteProductMutationVariables
>;
