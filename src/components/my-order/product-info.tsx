import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { Space } from '../spacer';
import { tw } from '../tw';
import { OrderProductEntity } from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';

import { MyOrderProductItem } from './product-item';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  products: OrderProductEntity[];
  total: number;
};

export const MyOrderProductInfo = ({ containerStyle, products, total }: Props) => {
  const quantity = useMemo(
    () => products?.reduce?.((acc: number, cur: OrderProductEntity) => acc + cur?.quantity, 0),
    [products],
  );

  const renderProductItem = useCallback((it: OrderProductEntity) => {
    return <MyOrderProductItem key={it?.id} containerStyle={tw`mb-0`} product={it} />;
  }, []);

  return (
    <View style={[tw``, containerStyle]}>
      <Text style={tw`font-semibold mb-16px`}>Thông tin đơn hàng</Text>
      <Space size={1} backgroundColor={'#EEE'} />
      {products?.map?.(renderProductItem)}
      <Space size={1} backgroundColor={'#EEE'} style={tw`mt-12px`} />
      <View style={tw`flex-row items-center justify-between mt-12px`}>
        <Text style={tw`text-13px text-grayscale-gray`}>{`${quantity} sản phẩm`}</Text>
        <Text style={tw`text-blue font-semibold`}>{`${thousandSeparator(total)} đ`}</Text>
      </View>
    </View>
  );
};
