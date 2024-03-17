import { Image } from '@rneui/themed';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { OrderProductEntity } from '../../../graphql/type.interface';
import { tw } from '../../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  product: OrderProductEntity;
};

export const ECommerceMyOrderProductReview = ({ containerStyle, product }: Props) => {
  const { avatar, name, quantity } = product || {};
  return (
    <View style={[tw` mt-2 mb-3 flex-row items-center`, containerStyle]}>
      <Image
        style={tw`h-12 w-12 rounded-1`}
        source={{
          uri: avatar?.fullThumbUrl as string,
        }}
      />
      <View style={tw`flex-1 ml-3 gap-2`}>
        <Text style={tw`text-13px`}>{name}</Text>
        <Text style={tw`text-13px text-grayscale-gray`}>{quantity} sản phẩm</Text>
      </View>
    </View>
  );
};
