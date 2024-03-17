import { Image } from '@rneui/themed';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ProductEntity } from '../../graphql/type.interface';
import { thousandSeparator } from '../../utils';
import { tw } from '../tw';

type Props = {
  item: ProductEntity;
  renderRight: JSX.Element;
  onPress?: (item: ProductEntity) => void;
};

export const FavoriteProductItem = ({ item, renderRight, onPress }: Props) => {
  const { isNew, name, isFixedCost, unitPrice } = item || {};

  return (
    <View style={tw`flex-row mt-4`}>
      <TouchableOpacity style={tw`flex-row flex-1 content-around`} onPress={() => onPress?.(item)}>
        <Image source={{ uri: item?.avatar?.fullThumbUrl ?? '' }} style={tw`w-90px h-90px rounded-1`} />
        <View
          style={[tw`px-6px py-2px rounded-full mt-1 ml-1 absolute`, isNew ? tw`bg-blue  ` : tw`bg-grayscale-gray `]}
        >
          <Text style={tw`text-white text-10px`}> {item.isNew ? 'Mới' : 'Qua sử dụng'}</Text>
        </View>
        <View style={tw`mx-3 flex-1`}>
          <Text style={tw`text-13px leading-18px`} numberOfLines={2}>
            {name}
          </Text>
          <Text style={tw`font-semibold mt-2`}>
            {isFixedCost ? `${thousandSeparator(unitPrice)} đ` : 'Thương lượng'}
          </Text>
        </View>
      </TouchableOpacity>
      {renderRight}
    </View>
  );
};
