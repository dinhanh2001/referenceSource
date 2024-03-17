import { Image } from '@rneui/themed';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, useWindowDimensions } from 'react-native';

import { CourseEntity } from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';
import { tw } from '../tw';

type Props = {
  item: CourseEntity;
  onDetail: (id: string) => void;
};

export const CourseItem = ({ item, onDetail }: Props) => {
  const { width } = useWindowDimensions();
  const w = (width - 16 * 3) / 2;
  const { id, banner, name, price } = item || {};

  const handleDetail = useCallback(() => {
    onDetail(id);
  }, [id, onDetail]);

  return (
    <TouchableOpacity style={tw`mt-6 mb-1 mx-2 w-${w}px `} onPress={handleDetail}>
      <Image
        source={{
          uri: banner?.fullThumbUrl ?? '',
        }}
        style={tw`w-[100%] h-${w * RATIO}px rounded-tl-1 rounded-tr-1`}
      />
      <Text style={tw`font-semibold text-sm mt-3`} numberOfLines={2}>
        {name}
      </Text>
      <Text style={tw`font-semibold text-sm mt-1`}>{thousandSeparator(price || 0)} đ</Text>
    </TouchableOpacity>
  );
};

const RATIO = 0.56;
