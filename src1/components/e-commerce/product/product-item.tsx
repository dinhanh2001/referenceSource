import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/themed';
import React, { useCallback } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { ProductEntity } from '../../../graphql/type.interface';
import { ECommerceProductNavigationProp } from '../../../screens/e-commerce/product/type';
import { thousandSeparator } from '../../../utils';
import { tw } from '../../tw';

import { ECommerceStatusProduct } from './status';

type Props = {
  onPress?: (item: ProductEntity) => void;
  data: ProductEntity;
  containerStyle?: StyleProp<ViewStyle>;
  infoStyle?: StyleProp<ViewStyle>;
  size?: number;
};

export const ProductItem = ({ onPress, data, containerStyle, size = 148, infoStyle }: Props) => {
  const navigation = useNavigation<ECommerceProductNavigationProp>();

  const { id, name, isFixedCost, unitPrice, avatar, isNew } = data || {};

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress(data);
    } else {
      navigation.push('e-commerce/product-detail', { productId: id });
    }
  }, [data, id, navigation, onPress]);

  return (
    <TouchableOpacity onPress={handlePress} style={containerStyle}>
      <View style={tw`gap-1.5 w-${size}px`}>
        <Image
          source={{ uri: avatar?.fullThumbUrl as string }}
          style={tw`w-${size}px h-${size}px rounded-tl-1 rounded-tr-1`}
        />
        <View style={tw`absolute`}>
          <ECommerceStatusProduct isNew={isNew} />
        </View>
        <View style={infoStyle}>
          <View style={tw`h-9`}>
            <Text numberOfLines={2} style={tw`text-13px leading-18px`}>
              {name}
            </Text>
          </View>
          {/* {verified && (
          <View style={tw`flex-row items-center`}>
          <Protection />
          <Text style={tw`text-[11px]/[14px] text-grayscale-gray`}> Call me kiểm định</Text>
          </View>
        )} */}
          <Text style={tw`font-semibold text-sm`}>
            {isFixedCost ? `${thousandSeparator(unitPrice ?? 0)} đ` : 'Thương lượng'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
