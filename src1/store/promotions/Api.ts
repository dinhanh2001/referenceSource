import { createApi } from '@reduxjs/toolkit/query/react';

import axiosClient from 'utils/axios';
import { API_ENDPOINT } from 'utils';
import { Data, IMetaDataResponse, IPromotionListItem } from 'types';
import Config from 'react-native-config';

const baseQuery = async <T = any>(requestOptions) => {
  const rs = await axiosClient.request<Data<T>>({
    baseURL: Config.API_HOST,
    ...requestOptions,
  });

  return {
    data: rs,
    meta: requestOptions.meta,
  };
};

const promotionApi = createApi({
  reducerPath: 'promotionApi',
  baseQuery: baseQuery,

  endpoints: builder => {
    return {
      getAllPromotions: builder.mutation<
        IMetaDataResponse<IPromotionListItem>,
        unknown
      >({
        query: () => {
          return {
            url: `${API_ENDPOINT.HOME.PROMOTION}?`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useGetAllPromotionsMutation } = promotionApi;

export default promotionApi;
