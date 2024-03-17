import { useRoute } from '@react-navigation/native';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ActivityIndicator,
  MyOrderAddressDetail,
  MyOrderBannerStatus,
  MyOrderButtonActions,
  MyOrderInfo,
  MyOrderProductInfo,
  Space,
  tw,
} from '../../../components';
import { usePartnerOrderQuery } from '../../../graphql/queries/partnerOrder.generated';
import {
  OrderAddressEntity,
  OrderEntity,
  OrderProductEntity,
  OrderStatusEnum,
  UserEntity,
} from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { MyOrderDetailRouteProp } from './type';

export const MyOrderDetailScreen = () => {
  const {
    params: { orderId },
  } = useRoute<MyOrderDetailRouteProp>();

  const { data, loading, refetch } = usePartnerOrderQuery({
    variables: {
      id: orderId,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { status, address, user, product, total } = data?.partnerOrder || {};

  if (loading && !data?.partnerOrder) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      >
        <MyOrderBannerStatus status={status as OrderStatusEnum} />
        <MyOrderAddressDetail
          containerStyle={tw`m-16px`}
          address={address as OrderAddressEntity}
          user={user as UserEntity}
        />
        <Space size={6} backgroundColor={'#EEE'} />
        <MyOrderProductInfo
          containerStyle={tw`m-16px`}
          products={product as OrderProductEntity[]}
          total={total as number}
        />
        <Space size={6} backgroundColor={'#EEE'} />
        {/* <MyOrderPayment containerStyle={tw`m-16px`} />
      <Space size={6} backgroundColor={'#EEE'} /> */}
        <MyOrderInfo containerStyle={tw`m-16px`} order={data?.partnerOrder as OrderEntity} />
      </ScrollView>
      <MyOrderButtonActions order={data?.partnerOrder as OrderEntity} refetch={refetch} />
    </SafeAreaView>
  );
};
