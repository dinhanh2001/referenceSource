import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback } from 'react';
import { Linking, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ActivityIndicator,
  ECommerceButtonOrder,
  ECommerceMyOrderAddressItem,
  ECommerceMyOrderInfo,
  ECommerceMyOrderProductInfo,
  ECommerceMyOrderStatus,
  tw,
} from '../../../components';
import { Space } from '../../../components/spacer';
import { useOrderQuery } from '../../../graphql/queries/order.generated';
import { OrderAddressEntity, OrderEntity, OrderStatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';
import { ShopSVG } from '../../../svg';

import { ECommerceMyOrderDetailRouteProp, ECommerceMyOrderNavigationProp } from './type';

export const ECommerceMyOrderDetail = () => {
  const { bottom } = useSafeAreaInsets();
  const {
    params: { orderId },
  } = useRoute<ECommerceMyOrderDetailRouteProp>();
  const navigation = useNavigation<ECommerceMyOrderNavigationProp>();

  const { data, loading, refetch } = useOrderQuery({ variables: { id: orderId } });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { partnerId, status, address, partner } = data?.order || {};

  const onStoreDetail = useCallback(() => {
    navigation.push('e-commerce/store-detail', { storeId: partnerId as string });
  }, [partnerId, navigation]);

  const onContact = useCallback(() => {
    try {
      const url = `tel:${partner?.phone}`;
      Linking.openURL(url);
    } catch (error) {
      console.log('error', error);
    }
  }, [partner]);

  if (loading && !data?.order) {
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`flex-1`}>
      <ScrollView refreshControl={<RefreshControl onRefresh={refetchByUser} refreshing={isRefetchingByUser} />}>
        <ECommerceMyOrderStatus type={status as OrderStatusEnum} />
        <ECommerceMyOrderAddressItem containerStyle={tw`m-4`} address={address as OrderAddressEntity} />

        <Space size={6} backgroundColor={'#EEE'} />

        <ECommerceMyOrderProductInfo containerStyle={tw`m-4`} order={data?.order as OrderEntity} />

        <Space size={6} backgroundColor={'#EEE'} />

        {/* <ECommerceMyOrderPayment containerStyle={tw`m-4`} />

        <Space size={6} backgroundColor={'#EEE'} /> */}

        <ECommerceMyOrderInfo containerStyle={tw`m-4`} order={data?.order as OrderEntity} />
      </ScrollView>
      <View style={tw`flex-row pt-8px pb-${bottom + 16}px px-16px items-center gap-3`}>
        <TouchableOpacity style={tw`items-center `} onPress={onStoreDetail}>
          <ShopSVG />
          <Text style={tw`mt-1 text-11px`}>Gian hàng</Text>
        </TouchableOpacity>
        <Button
          title={'Liên hệ'}
          containerStyle={tw`flex-1`}
          type="outline"
          buttonStyle={tw`border-grayscale-disabled`}
          onPress={onContact}
        />
        <ECommerceButtonOrder item={data?.order as OrderEntity} containerStyle={tw`flex-1`} />
      </View>
    </View>
  );
};
