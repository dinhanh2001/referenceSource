import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { useCallback } from 'react';

import { DiscountCodeEntity, DiscountCodeUnitEnum } from '../../../graphql/type.interface';
import { tw } from '../../tw';
import { CallMeSVG, CheckSVG } from '../../../svg';
import { thousandSeparator } from '../../../utils';

type Props = {
  item: DiscountCodeEntity;
  onSelect: (item: DiscountCodeEntity) => void;
  selected?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ECommerceCartDiscountItem = ({ item, onSelect, selected, containerStyle }: Props) => {
  const { name, minOrderValue, unit, value } = item || {};
  const isPercent = unit === DiscountCodeUnitEnum?.PERCENTAGE;

  const handleSelect = useCallback(() => {
    onSelect(item);
  }, [onSelect, item]);

  return (
    <TouchableOpacity style={[tw`flex-row mt-4 mx-4`, containerStyle]} onPress={handleSelect}>
      <View style={tw`w-90px h-90px bg-primary rounded-1 items-center justify-center`}>
        <CallMeSVG />
      </View>
      <View style={tw`flex-1 mx-3`}>
        <Text style={tw`font-semibold text-13px text-grayscale-black`} numberOfLines={2}>
          {name}
        </Text>
        <Text style={tw`text-11px mt-2`}>{`Đơn tối thiểu ${thousandSeparator(minOrderValue)} đ`}</Text>
        <Text style={tw`text-11px mt-0.5`}>{`Giá trị giảm ${isPercent ? value : thousandSeparator(value)} ${
          isPercent ? '%' : 'đ'
        }`}</Text>
        <Text style={tw`mt-2 text-primary text-11px`}>Chi tiết</Text>
      </View>
      <View
        style={[
          tw`w-5 h-5 rounded-full items-center justify-center self-center`,
          selected ? tw`bg-primary` : tw`border border-grayscale-disabled`,
        ]}
      >
        {selected && <CheckSVG width={10} />}
      </View>
    </TouchableOpacity>
  );
};
