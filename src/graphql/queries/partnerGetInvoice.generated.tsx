import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerGetInvoiceQueryVariables = Types.Exact<{
  settlementId: Types.Scalars['String'];
}>;

export type PartnerGetInvoiceQueryResponse = { __typename?: 'Query' } & {
  partnerGetInvoice: { __typename?: 'Media' } & Pick<
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
  >;
};

export const PartnerGetInvoiceDocument = gql`
  query partnerGetInvoice($settlementId: String!) {
    partnerGetInvoice(settlementId: $settlementId) {
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
  }
`;
export function usePartnerGetInvoiceQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerGetInvoiceQueryResponse, PartnerGetInvoiceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerGetInvoiceQueryResponse, PartnerGetInvoiceQueryVariables>(
    PartnerGetInvoiceDocument,
    options,
  );
}
export function usePartnerGetInvoiceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerGetInvoiceQueryResponse, PartnerGetInvoiceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerGetInvoiceQueryResponse, PartnerGetInvoiceQueryVariables>(
    PartnerGetInvoiceDocument,
    options,
  );
}
export type PartnerGetInvoiceQueryHookResult = ReturnType<typeof usePartnerGetInvoiceQuery>;
export type PartnerGetInvoiceLazyQueryHookResult = ReturnType<typeof usePartnerGetInvoiceLazyQuery>;
export type PartnerGetInvoiceQueryResult = Apollo.QueryResult<
  PartnerGetInvoiceQueryResponse,
  PartnerGetInvoiceQueryVariables
>;
