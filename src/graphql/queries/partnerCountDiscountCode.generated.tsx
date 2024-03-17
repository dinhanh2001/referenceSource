import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCountDiscountCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PartnerCountDiscountCodeQueryResponse = { __typename?: 'Query' } & {
  partnerCountDiscountCode: Array<
    { __typename?: 'DiscountStatusAndEachStatusCount' } & Pick<
      Types.DiscountStatusAndEachStatusCount,
      'isActivities' | 'totalItem'
    >
  >;
};

export const PartnerCountDiscountCodeDocument = gql`
  query partnerCountDiscountCode {
    partnerCountDiscountCode {
      isActivities
      totalItem
    }
  }
`;
export function usePartnerCountDiscountCodeQuery(
  baseOptions?: Apollo.QueryHookOptions<PartnerCountDiscountCodeQueryResponse, PartnerCountDiscountCodeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerCountDiscountCodeQueryResponse, PartnerCountDiscountCodeQueryVariables>(
    PartnerCountDiscountCodeDocument,
    options,
  );
}
export function usePartnerCountDiscountCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerCountDiscountCodeQueryResponse,
    PartnerCountDiscountCodeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerCountDiscountCodeQueryResponse, PartnerCountDiscountCodeQueryVariables>(
    PartnerCountDiscountCodeDocument,
    options,
  );
}
export type PartnerCountDiscountCodeQueryHookResult = ReturnType<typeof usePartnerCountDiscountCodeQuery>;
export type PartnerCountDiscountCodeLazyQueryHookResult = ReturnType<typeof usePartnerCountDiscountCodeLazyQuery>;
export type PartnerCountDiscountCodeQueryResult = Apollo.QueryResult<
  PartnerCountDiscountCodeQueryResponse,
  PartnerCountDiscountCodeQueryVariables
>;
