import React from 'react';
import { ScrollView, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { ArrowDesc } from '../../../svg';
import { tw } from '../../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  value: FilterProdctEnum;
  onChange: (value: FilterProdctEnum) => void;
};

type ItemProps = {
  title: string;
  value: FilterProdctEnum;
  icon?: React.ReactNode;
};

export enum FilterProdctEnum {
  ALL = 'all',
  NEW = 'new',
  PRICE = 'price',
  RATE = 'rate',
}

const itemsFilter = [
  { value: FilterProdctEnum.ALL, title: 'Tất cả' },
  { value: FilterProdctEnum.NEW, title: 'Mới', icon: <ArrowDesc /> },
  { value: FilterProdctEnum.PRICE, title: 'Giá', icon: <ArrowDesc /> },
  { value: FilterProdctEnum.RATE, title: 'Lượt đánh giá', icon: <ArrowDesc /> },
];

export const ECommerceStoreFilterProduct = ({ containerStyle, value: current, onChange }: Props) => {
  const renderItem = ({ title, value, icon }: ItemProps) => (
    <TouchableOpacity
      key={value}
      style={tw`border py-6px px-3 rounded-999 gap-2px flex-row items-center`}
      onPress={() => onChange(value)}
    >
      <Text style={[tw`text-13px`, current === value && tw`font-semibold`]}>{title}</Text>
      {icon}
    </TouchableOpacity>
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[tw`px-4 py-2 flex-row gap-2`, containerStyle]}>{itemsFilter.map(renderItem)}</View>
    </ScrollView>
  );
};
