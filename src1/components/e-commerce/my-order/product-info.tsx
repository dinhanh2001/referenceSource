import { Image } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { OrderEntity, OrderProductEntity } from '../../../graphql/type.interface';
import { ArrowRight } from '../../../svg';
import { Space } from '../../spacer';
import { tw } from '../../tw';
import { thousandSeparator } from '../../../utils';
import { ECommerceMyOrderNavigationProp } from '../../../screens/e-commerce/my-order/type';

import { ECommerceProductOrder } from './product-order';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  order: OrderEntity;
};

export const ECommerceMyOrderProductInfo = ({ containerStyle, order }: Props) => {
  const navigation = useNavigation<ECommerceMyOrderNavigationProp>();
  const { product, partner, total } = order || {};
  const { avatar, fullname } = partner || {};

  const quatity = useMemo(() => product?.reduce?.((acc, cur) => acc + cur?.quantity, 0), [product]);

  const renderProductItem = useCallback(
    (it: OrderProductEntity) => {
      return (
        <TouchableOpacity
          key={it?.id}
          onPress={() => navigation.push('e-commerce/product-detail', { productId: it?.id || '' })}
        >
          <ECommerceProductOrder containerStyle={tw`mb-0`} product={it} />
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  return (
    <View style={[tw``, containerStyle]}>
      <TouchableOpacity
        style={tw`flex-row items-center gap-2`}
        onPress={() => navigation.push('e-commerce/store-detail', { storeId: partner?.id || '' })}
      >
        <Image
          style={tw`h-6 w-6 rounded-1`}
          source={{
            uri: avatar?.fullThumbUrl as string,
          }}
        />
        <Text style={tw`text-grayscale-black font-semibold`}>{fullname}</Text>
        <ArrowRight />
      </TouchableOpacity>
      <Space size={1} backgroundColor={'#EEE'} style={tw`my-4`} />
      <View style={tw`gap-4`}>{product?.map?.(renderProductItem)}</View>
      <Space size={1} backgroundColor={'#EEE'} style={tw`mt-12px`} />
      <View style={tw`flex-row items-center justify-between mt-12px`}>
        <Text style={tw`text-13px text-grayscale-gray`}>{quatity} sản phẩm</Text>
        <Text style={tw`text-blue font-semibold`}>{`${thousandSeparator(total)} đ`}</Text>
      </View>
    </View>
  );
};
