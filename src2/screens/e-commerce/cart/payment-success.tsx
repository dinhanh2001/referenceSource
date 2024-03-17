import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { TickCircleGreen } from '../../../svg';
import { thousandSeparator } from '../../../utils';

import { ECommerceCartPaymentSuccessNavigationProp, ECommerceCartPaymentSuccessRouteProps } from './type';

export const ECommerceCartPaymentSuccess = () => {
  const navigation = useNavigation<ECommerceCartPaymentSuccessNavigationProp>();
  const {
    params: { result, totalPayment, address },
  } = useRoute<ECommerceCartPaymentSuccessRouteProps>();

  const onMyCart = useCallback(() => {
    navigation.dispatch((state) => {
      const size = state?.routes?.length;

      return CommonActions.reset({
        ...state,
        routes: [
          ...state.routes.slice(0, size - 3),
          {
            name: 'e-commerce/cart',
          },
        ],
        index: size - 3,
      });
    });
  }, [navigation]);

  const onMyOrder = useCallback(() => {
    navigation.dispatch((state) => {
      const size = state?.routes?.length;

      return CommonActions.reset({
        ...state,
        routes: [
          ...state.routes.slice(0, size - 3),
          {
            name: 'e-commerce/my-order',
          },
        ],
        index: size - 3,
      });
    });
  }, [navigation]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`pt-14 px-4`}>
        <View style={tw`items-center`}>
          <TickCircleGreen />
          <Text style={tw`mt-5 text-17px font-semibold`}>Thanh toán thành công!</Text>
        </View>
        <View style={tw`border border-[#EEE] mt-3 py-3 px-4 rounded-1`}>
          <View style={tw`flex-row items-center justify-between `}>
            <Text style={tw`text-grayscale-gray`}>Mã đơn hàng</Text>
            <View>
              {result?.map?.((it) => (
                <Text key={it?.id}>{it?.code}</Text>
              ))}
            </View>
          </View>
          <Space size={1} backgroundColor={'#EEE'} style={tw`my-3`} />
          <View style={tw`flex-row items-center justify-between `}>
            <Text style={tw`text-grayscale-gray`}>Số tiền thanh toán</Text>
            <Text>{`${thousandSeparator(totalPayment)} đ`}</Text>
          </View>
          {/* <Space size={1} backgroundColor={'#EEE'} style={tw`my-3`} />
          <View style={tw`flex-row items-center justify-between `}>
            <Text style={tw`text-grayscale-gray`}>Phương thức thanh toán</Text>
            <Text>Thẻ tín dụng</Text>
          </View> */}
          <Space size={1} backgroundColor={'#EEE'} style={tw`my-3`} />
          <View style={tw`flex-row items-center justify-between `}>
            <Text style={tw`text-grayscale-gray`}>Thời gian thanh toán</Text>
            <Text>{dayjs(result?.[0]?.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
          </View>
          <Space size={1} backgroundColor={'#EEE'} style={tw`my-3`} />
          <View style={tw`flex-row items-center justify-between  py-2`}>
            <Text style={tw`text-grayscale-gray`}>Địa chỉ nhận hàng</Text>
            <Text>{address?.contactPhone}</Text>
          </View>
          <Text style={tw`text-center mt-10px`}>{address?.mapAddress}</Text>
        </View>

        <Button
          title={'Giỏ hàng của tôi'}
          containerStyle={tw`self-center mt-5`}
          buttonStyle={tw`px-50px border-grayscale-disabled`}
          type="outline"
          onPress={onMyCart}
        />
        <Button
          title={'Về trang Đơn hàng của tôi'}
          containerStyle={tw`self-center mt-3`}
          buttonStyle={tw`px-20px`}
          onPress={onMyOrder}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
