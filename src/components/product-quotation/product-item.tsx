import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
import { Image } from '@rneui/base';

import { ProductEntity } from '../../graphql/type.interface';
import { tw } from '../tw';

type Props = {
  product: ProductEntity;
  quantity: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ProductQuotationProductItem = ({ product, quantity, containerStyle }: Props) => {
  const { isNew, avatar, name } = product || {};

  const renderStatus = useMemo(() => {
    const bg = isNew ? 'blue' : 'grayscale-gray';

    return (
      <View style={tw`bg-${bg} m-4px py-2px px-6px rounded-9999`}>
        <Text style={tw`text-white text-9px`}>{isNew ? 'Mới' : 'Qua sử dụng'}</Text>
      </View>
    );
  }, [isNew]);

  return (
    <View style={[tw`mt-16px mb-12px flex-row`, containerStyle]}>
      <Image source={{ uri: avatar?.fullThumbUrl as string }} style={tw`w-80px h-80px rounded-4`} />
      <View style={tw`absolute `}>{renderStatus}</View>
      <View style={tw`flex-1 ml-12px`}>
        <Text style={tw`text-13px text-grayscale-black`}>{name}</Text>
        <Text style={tw`font-semibold mt-2`}>Thương lượng</Text>
        <Text style={tw`text-12px text-grayscale-gray text-right mt-2`}>Số lượng: {quantity}</Text>
      </View>
    </View>
  );
};
