import { View, Text } from 'react-native';
import React, { useState } from 'react';

import { tw } from '../tw';
import { DEVICE_WIDTH } from '../../utils';
type ShortListProps = {
  data?: string[];
  showAll?: boolean;
};
export const ShortList = React.memo(({ data = [], showAll }: ShortListProps) => {
  const [slicedIndex, setSlicedIndex] = useState(data.length);

  return (
    <View style={[tw`flex-row items-center overflow-hidden`, showAll && tw`flex-wrap`]}>
      {data.slice(0, showAll ? data?.length : slicedIndex).map((item, index) => (
        <View
          key={index}
          style={[tw`border rounded-sm border-grayscale-border px-4 py-2 mr-2`, showAll && tw`mb-2`]}
          onLayout={(e) => {
            const viewport = (DEVICE_WIDTH - 32) * 0.8;
            const { layout } = e.nativeEvent;
            if (layout.x < viewport && layout.x + layout.width > viewport) {
              setSlicedIndex(index);
            }
          }}
        >
          <Text style={tw`text-[13px]`}>{item}</Text>
        </View>
      ))}
      {!showAll && data.length - slicedIndex > 0 && (
        <View style={tw`border rounded-sm border-grayscale-border px-4 py-2 mr-2`}>
          <Text style={tw`text-[13px]`}>+{data.length - slicedIndex}</Text>
        </View>
      )}
    </View>
  );
});
