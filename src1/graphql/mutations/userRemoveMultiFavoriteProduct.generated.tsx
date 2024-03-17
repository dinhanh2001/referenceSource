import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserRemoveMultiFavoriteProductMutationVariables = Types.Exact<{
  input: Types.UserRemoveMultiFavoriteProductInput;
}>;

export type UserRemoveMultiFavoriteProductMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userRemoveMultiFavoriteProduct'
>;

export const UserRemoveMultiFavoriteProductDocument = gql`
  mutation userRemoveMultiFavoriteProduct($input: UserRemoveMultiFavoriteProductInput!) {
    userRemoveMultiFavoriteProduct(input: $input)
  }
`;
export function useUserRemoveMultiFavoriteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserRemoveMultiFavoriteProductMutationResponse,
    UserRemoveMultiFavoriteProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UserRemoveMultiFavoriteProductMutationResponse,
    UserRemoveMultiFavoriteProductMutationVariables
  >(UserRemoveMultiFavoriteProductDocument, options);
}
export type UserRemoveMultiFavoriteProductMutationHookResult = ReturnType<
  typeof useUserRemoveMultiFavoriteProductMutation
>;
export type UserRemoveMultiFavoriteProductMutationResult =
  Apollo.MutationResult<UserRemoveMultiFavoriteProductMutationResponse>;
export type UserRemoveMultiFavoriteProductMutationOptions = Apollo.BaseMutationOptions<
  UserRemoveMultiFavoriteProductMutationResponse,
  UserRemoveMultiFavoriteProductMutationVariables
>;
