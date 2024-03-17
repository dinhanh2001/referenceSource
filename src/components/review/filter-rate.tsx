import React, { useCallback } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { tw } from '../tw';
import { StarInfo } from '../../graphql/type.interface';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  starInfo?: StarInfo[];
  current: number;
  setCurrent: (value: number) => void;
};

export const FilterRate = ({ containerStyle, starInfo = [], current, setCurrent }: Props) => {
  const renderItem = useCallback(
    (it: number) => {
      const count = starInfo.find((item: StarInfo) => item.star === it)?.total || 0;
      const textCount = count ? `(${count})` : '';

      return (
        <Chip key={it} title={`${it} sao ${textCount}`} value={it} onPress={setCurrent} selected={current === it} />
      );
    },
    [current, setCurrent, starInfo],
  );

  return (
    <View style={[tw`py-2 flex-row flex-wrap gap-2`, containerStyle]}>
      <Chip title="Tất cả" value={6} onPress={setCurrent} selected={current === 6} />
      {[5, 4, 3, 2, 1].map(renderItem)}
    </View>
  );
};

type ChipProps = {
  title: string;
  value: number;
  onPress: (value: number) => void;
  selected: boolean;
};

const Chip = ({ title, value, onPress, selected }: ChipProps) => (
  <TouchableOpacity
    key={value}
    style={[
      tw`border py-6px px-3 rounded-full gap-2px flex-row items-center border-[#EEE]`,
      selected && tw`bg-primary-light border-primary-light`,
    ]}
    onPress={() => onPress?.(value)}
  >
    <Text style={[tw`text-13px`, selected && tw`font-semibold`]}>{title}</Text>
  </TouchableOpacity>
);
