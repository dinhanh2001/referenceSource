import { View, Text, ViewStyle, StyleProp } from 'react-native';
import React from 'react';
import { Image } from '@rneui/themed';

import { tw } from '../../tw';
import { ECommerceStatusProduct } from '../product';
import { thousandSeparator } from '../../../utils';
import { OrderProductEntity } from '../../../graphql/type.interface';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  product?: OrderProductEntity;
};

export const ECommerceProductOrder = ({ containerStyle, product }: Props) => {
  const { avatar, name, quantity, unitPrice, isNew } = product || {};

  return (
    <View style={[tw`flex-row`, containerStyle]}>
      <Image source={{ uri: avatar?.fullThumbUrl as string }} style={tw`h-20 w-20 rounded-1`} />
      <View style={tw`absolute`}>
        <ECommerceStatusProduct isNew={isNew} />
      </View>
      <View style={tw`flex-1 ml-3`}>
        <Text style={tw`text-13px text-grayscale-black`} numberOfLines={2}>
          {name}
        </Text>
        <Text style={tw`text-3 text-right mt-0.5 text-grayscale-gray`}>x{quantity}</Text>
        <Text style={tw`text-13px mt-1 text-right text-grayscale-black`}>{`${thousandSeparator(
          unitPrice as number,
        )} đ`}</Text>
      </View>
    </View>
  );
};
