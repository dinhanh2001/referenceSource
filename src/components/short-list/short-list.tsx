import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React, { useState } from 'react';

import { tw } from '../tw';
import { DEVICE_WIDTH } from '../../utils';
type ShortListProps = {
  data?: string[];
  textStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
};
export const ShortList = React.memo(({ data = [], textStyle, itemStyle }: ShortListProps) => {
  const [slicedIndex, setSlicedIndex] = useState(data.length);
  return (
    <View style={tw`flex-row items-center overflow-hidden`}>
      {data.slice(0, slicedIndex).map((item, index) => (
        <View
          key={index}
          style={[tw`border rounded-sm border-[#FFFFFF19] px-4 py-2 mr-2`, itemStyle]}
          onLayout={(e) => {
            const viewport = (DEVICE_WIDTH - 32) * 0.8;
            const { layout } = e.nativeEvent;
            if (layout.x < viewport && layout.x + layout.width > viewport) {
              setSlicedIndex(index);
            }
          }}
        >
          <Text style={[tw`text-[13px] text-white`, textStyle]}>{item}</Text>
        </View>
      ))}
      {data.length - slicedIndex > 0 && (
        <View style={tw`border rounded-sm border-grayscale-border px-4 py-2 mr-2`}>
          <Text style={tw`text-[13px]`}>+{data.length - slicedIndex}</Text>
        </View>
      )}
    </View>
  );
});
