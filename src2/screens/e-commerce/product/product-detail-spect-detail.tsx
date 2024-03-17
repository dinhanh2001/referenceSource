import { useRoute } from '@react-navigation/native';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import { ActivityIndicator, tw } from '../../../components';
import { Table } from '../../../components/table';
import { useUserProductQuery } from '../../../graphql/queries/userProduct.generated';
import { useRefreshByUser } from '../../../hooks';

import { ECommerceProductDetailSpecsTabRouteProp } from './type';

export const ECommerceProductDetailSpecsDetail = () => {
  const {
    params: { productId },
  } = useRoute<ECommerceProductDetailSpecsTabRouteProp>();

  const { data, loading, refetch } = useUserProductQuery({
    variables: {
      id: productId,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const {
    vehicleRegistrationPlate,
    ordinalNumber,
    productType,
    model,
    serialNumber,
    vinNumber,
    origin,
    yearOfManufacture,
    isNew,
    detail,
  } = data?.userProduct || {};

  if (loading && !data?.userProduct) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      contentContainerStyle={tw`p-4`}
      refreshControl={<RefreshControl onRefresh={refetchByUser} refreshing={isRefetchingByUser} />}
    >
      <Table
        data={[
          { 'Biển số': vehicleRegistrationPlate },
          { 'Số thứ tự': ordinalNumber },
          { 'Chủng loại máy': productType?.name },
          { Model: model?.name },
          { 'Số serial': serialNumber },
          { 'Số VIN': vinNumber },
          { 'Xuất xứ': origin?.name },
          { 'Năm sản xuất': yearOfManufacture },
          { 'Tình trạng': isNew ? 'Mới' : 'Đã qua sử dụng' },
          { 'Chi tiết': detail },
        ]}
      />
    </ScrollView>
  );
};
