import { Image } from '@rneui/themed';
import React, { useCallback } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { StarIcon } from '../../../svg';
import { tw } from '../../tw';
import { ProductEntity } from '../../../graphql/type.interface';
import { thousandSeparator } from '../../../utils';

import { ECommerceStatusProduct } from './status';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item?: ProductEntity;
  onPress?: (id: string) => void;
};

export const ECommerceRowProduct = ({ containerStyle, item, onPress }: Props) => {
  const { id, avatar, name, isFixedCost, unitPrice, isNew, reviewSummary } = item || {};

  const handlePress = useCallback(() => {
    onPress?.(id as string);
  }, [id, onPress]);

  return (
    <TouchableOpacity style={[tw`flex-row`, containerStyle]} onPress={handlePress}>
      <Image source={{ uri: avatar?.fullThumbUrl as string }} style={tw`w-110px h-110px rounded-4px`} />
      <View style={tw`absolute`}>
        <ECommerceStatusProduct isNew={isNew} />
      </View>
      <View style={tw`ml-3 flex-1`}>
        <Text style={tw`text-grayscale-black text-13px`}>{name}</Text>
        <View style={tw`flex-row items-center mt-1`}>
          <StarIcon />
          <Text style={tw`text-grayscale-black mx-1`}>{reviewSummary?.starAverage?.toFixed?.(1)}</Text>
          <Text style={tw`text-grayscale-light`}>({reviewSummary?.total} đánh giá)</Text>
        </View>
        <Text style={tw`mt-2 text-grayscale-black font-semibold`}>
          {isFixedCost ? `${thousandSeparator(unitPrice || 0)} đ` : 'Thương lượng'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
