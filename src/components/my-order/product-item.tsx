import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
import { Image } from '@rneui/themed';

import { tw } from '../tw';
import { thousandSeparator } from '../../helpers';
import { OrderProductEntity } from '../../graphql/type.interface';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  product: OrderProductEntity;
  linesName?: number;
};

export const MyOrderProductItem = ({ containerStyle, product, linesName }: Props) => {
  const { avatar, isNew, unitPrice, name, quantity } = product;

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
        <Text style={tw`text-13px text-grayscale-black`} numberOfLines={linesName}>
          {name}
        </Text>
        <Text style={tw`text-12px text-grayscale-gray text-right mt-2px`}>x{quantity}</Text>
        <Text style={tw`text-13px text-grayscale-black text-right mt-4px`}>{thousandSeparator(unitPrice)} đ</Text>
      </View>
    </View>
  );
};
