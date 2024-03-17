import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CheckTechnicianExistedQueryVariables = Types.Exact<{
  citizenId?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  phone?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type CheckTechnicianExistedQueryResponse = { __typename?: 'Query' } & Pick<
  Types.Query,
  'checkTechnicianExisted'
>;

export const CheckTechnicianExistedDocument = gql`
  query checkTechnicianExisted($citizenId: String, $email: String, $phone: String) {
    checkTechnicianExisted(citizenId: $citizenId, email: $email, phone: $phone)
  }
`;
export function useCheckTechnicianExistedQuery(
  baseOptions?: Apollo.QueryHookOptions<CheckTechnicianExistedQueryResponse, CheckTechnicianExistedQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CheckTechnicianExistedQueryResponse, CheckTechnicianExistedQueryVariables>(
    CheckTechnicianExistedDocument,
    options,
  );
}
export function useCheckTechnicianExistedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CheckTechnicianExistedQueryResponse, CheckTechnicianExistedQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CheckTechnicianExistedQueryResponse, CheckTechnicianExistedQueryVariables>(
    CheckTechnicianExistedDocument,
    options,
  );
}
export type CheckTechnicianExistedQueryHookResult = ReturnType<typeof useCheckTechnicianExistedQuery>;
export type CheckTechnicianExistedLazyQueryHookResult = ReturnType<typeof useCheckTechnicianExistedLazyQuery>;
export type CheckTechnicianExistedQueryResult = Apollo.QueryResult<
  CheckTechnicianExistedQueryResponse,
  CheckTechnicianExistedQueryVariables
>;
