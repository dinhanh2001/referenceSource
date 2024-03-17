import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { client } from '../../../apollo/apollo';
import { AppHeader, ECommerceStatusProduct, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { useFullScreenLoading } from '../../../contexts';
import { useCreateOrdersMutation } from '../../../graphql/mutations/createOrders.generated';
import { useAddressesQuery } from '../../../graphql/queries/addresses.generated';
import { CountOrderItemForEachStatusDocument } from '../../../graphql/queries/countOrderItemForEachStatus.generated';
import { MyCartDocument } from '../../../graphql/queries/myCart.generated';
import {
  AddressEntity,
  CartItemEntity,
  DiscountCodeEntity,
  DiscountCodeUnitEnum,
  OrderEntity,
} from '../../../graphql/type.interface';
import { showFlashMessageError } from '../../../helpers';
import { ArrowRight } from '../../../svg';
import { thousandSeparator } from '../../../utils';

import { ECommerceCartNavigationProp, ECommerceCartPaymentRouteProps } from './type';

export const ECommerceCartPayment = () => {
  const {
    params: { carts, note },
  } = useRoute<ECommerceCartPaymentRouteProps>();
  const navigation = useNavigation<ECommerceCartNavigationProp>();

  const { data } = useAddressesQuery();
  const { showFullscreenLoading } = useFullScreenLoading();

  const [address, setAddress] = useState<AddressEntity | undefined>();
  const [discount, setDiscount] = useState<DiscountCodeEntity | undefined>();

  const totalPayment = useMemo(() => {
    const { isAssignAllProduct, products, unit, value = 0 } = discount || {};
    const isPercent = unit === DiscountCodeUnitEnum.PERCENTAGE;
    let total = 0;

    carts?.forEach?.((it) => {
      const val = it?.product?.unitPrice * it?.quantity;
      total += val;
      const code = products?.find((product) => product?.id === it?.product?.id);
      if (code || isAssignAllProduct) {
        if (isPercent) {
          total -= (val * value) / 100;
        } else {
          total -= value;
        }
      }
    });

    return Math.floor(total);
  }, [carts, discount]);

  const [createOrder, { loading: loadingCreateOrder }] = useCreateOrdersMutation({
    onCompleted: (res) => {
      client.refetchQueries({
        include: [MyCartDocument, CountOrderItemForEachStatusDocument],
      });
      navigation.navigate('e-commerce/cart-payment-success', {
        result: res?.createOrders as OrderEntity[],
        address,
        totalPayment,
      });
    },
    onError: showFlashMessageError,
  });

  useEffect(() => {
    if (!address && data?.addresses?.length) {
      setAddress(data?.addresses?.find((it) => it.isDefault) || data?.addresses?.[0]);
    }
  }, [address, data?.addresses]);

  useEffect(() => {
    showFullscreenLoading(loadingCreateOrder);
  }, [loadingCreateOrder, showFullscreenLoading]);

  const onChangeAddress = useCallback(() => {
    navigation.navigate('e-commerce/cart-address', { address, onSelectAddress: setAddress });
  }, [address, navigation]);

  const onSelectDiscount = useCallback(() => {
    navigation.navigate('e-commerce/cart-discount-select', {
      productIds: carts?.map?.((it) => it?.product?.id),
      onSelectDiscount: setDiscount,
      currentDiscount: discount,
    });
  }, [carts, discount, navigation]);

  const onSubmit = useCallback(() => {
    const { products, isAssignAllProduct, unit, value = 0 } = discount || {};
    const isPercent = unit === DiscountCodeUnitEnum.PERCENTAGE;

    const groupCart: CartItemEntity[][] = Object.values(
      carts?.reduce?.((acc: any, item) => {
        const storeId = item?.store?.id || '';
        if (!acc[storeId]) {
          acc[storeId] = [];
        }
        acc[storeId].push(item);
        return acc;
      }, []),
    );

    const input = {
      totalPayment,
      addressId: address?.id as string,
      orders: groupCart?.map?.((its: CartItemEntity[]) => {
        let total = 0,
          payment = 0;

        its?.forEach?.((it: CartItemEntity) => {
          const codeAvailabel = !!products?.find?.((product) => product?.id === it?.product?.id) || isAssignAllProduct;
          const val = it?.product?.unitPrice * it?.quantity;
          total += val;
          payment += codeAvailabel ? (isPercent ? Math.floor((val * (100 - value)) / 100) : val - value) : val;
        });

        return {
          shippingFee: 0,
          cartItemIds: its?.map?.((it: CartItemEntity) => it?.id),
          total,
          totalPayment: payment,
          discountCodeId: total !== totalPayment ? discount?.id : '',
          note,
        };
      }),
    };

    createOrder({
      variables: {
        input,
      },
    });
  }, [address?.id, carts, createOrder, discount, note, totalPayment]);

  const renderCartItem = useCallback((item: CartItemEntity) => {
    const { product, quantity } = item || {};

    return (
      <View key={item?.id} style={tw`flex-row`}>
        <View>
          <Image source={{ uri: product?.avatar?.fullThumbUrl as string }} style={tw`w-20 h-20 rounded-1`} />
          <ECommerceStatusProduct isNew={product?.isNew} containerStyle={tw`absolute`} />
        </View>
        <View style={tw`flex-1 ml-3`}>
          <Text style={tw`text-13px text-grayscale-black`}>{product?.name}</Text>
          {/* <View style={tw`flex-row mt-2 items-center`}>
            <Protection />
            <Text style={tw`ml-1 text-11px text-grayscale-gray`}>Call me kiểm định</Text>
          </View> */}
          <Text style={tw`text-3 mt-2px text-right`}>x{quantity}</Text>
          <Text style={tw`text-13px text-grayscale-black text-right mt-1`}>{`${thousandSeparator(
            product?.unitPrice,
          )} đ`}</Text>
        </View>
      </View>
    );
  }, []);

  const renderDiscount = useMemo(() => {
    const { unit, value } = discount || {};
    const isPercent = unit === DiscountCodeUnitEnum.PERCENTAGE;

    return (
      <TouchableOpacity
        onPress={onSelectDiscount}
        style={tw`mt-3 flex-row items-center justify-between border border-[#EEE] rounded-1 gap-3 py-10px px-4`}
      >
        {discount ? (
          <View style={tw`py-6px px-2 border border-[#FF9D0A] rounded-2`}>
            <Text style={tw`text-[#FF9D0A]`}>{`Mã giảm ${isPercent ? value : thousandSeparator(value as number)} ${
              isPercent ? '%' : 'đ'
            }`}</Text>
          </View>
        ) : (
          <Text style={tw`text-grayscale-black`}>Chọn mã giảm giá</Text>
        )}
        <ArrowRight />
      </TouchableOpacity>
    );
  }, [discount, onSelectDiscount]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <AppHeader title="Thanh toán" />
      <ScrollView contentContainerStyle={tw`p-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-grayscale-gray`}>Địa chỉ nhận hàng</Text>
          <TouchableOpacity onPress={onChangeAddress}>
            <Text style={tw`text-13px font-semibold text-primary-dark`}>Thay đổi</Text>
          </TouchableOpacity>
        </View>

        {!!address && (
          <View style={tw`border mt-3 border-[#EEE] p-3 rounded-1 gap-1`}>
            <Text style={tw`font-semibold text-13px text-grayscale-black`}>{address?.contactName}</Text>
            <Text style={tw`text-13px text-grayscale-gray`}>{address?.contactPhone}</Text>
            <Text style={tw`text-13px text-grayscale-gray`}>{address?.mapAddress}</Text>
          </View>
        )}

        <Space size={6} backgroundColor={'#EEE'} style={tw`my-4`} />
        <View style={tw`gap-3`}>{carts?.map?.(renderCartItem)}</View>
        <Space size={6} backgroundColor={'#EEE'} style={tw`my-4`} />

        <Text style={tw`text-grayscale-gray`}>Tổng tiền thanh toán</Text>
        <View style={tw`mt-3 px-4 py-3 bg-grayscale-bg rounded-1`}>
          <Text style={tw`text-17px font-semibold`}>{`${thousandSeparator(totalPayment)} đ`}</Text>
        </View>

        <Space size={6} backgroundColor={'#EEE'} style={tw`my-4`} />

        <Text style={tw`text-grayscale-gray`}>Mã giảm giá</Text>
        {renderDiscount}

        {/* <Text style={tw`mt-6 text-grayscale-gray`}>Phương thức thanh toán</Text>
        <Checkbox
          isNormal
          iconRight
          isRadioCheckbox
          colorUnChecked="grayscale-gray"
          containerStyle={tw`p-4 border border-[#EEE] mt-3`}
          title={
            <View style={tw`flex-row flex-1`}>
              <Image
                style={tw`h-10 w-10 rounded-2`}
                source={{ uri: 'https://cdn6.aptoide.com/imgs/b/8/a/b8a69f77c2b017c387307e690eeb45fa_icon.jpg' }}
              />
              <View style={tw`flex-1 ml-3 mr-4 gap-2px`}>
                <Text style={tw`font-medium text-grayscale-black`}>**** **** **** 1121</Text>
                <Text style={tw`text-3 text-grayscale-gray`}>TPbank</Text>
              </View>
            </View>
          }
          onChange={setSelected}
        /> */}
      </ScrollView>
      <Button
        title={'Xác nhận'}
        containerStyle={tw`px-4 pb-4`}
        // onPress={() => navigation.navigate('e-commerce/cart-payment-success')}
        onPress={onSubmit}
      />
    </SafeAreaView>
  );
};
