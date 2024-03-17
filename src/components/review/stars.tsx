import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { tw } from '../tw';

import { StarFill } from './star';

type Props = {
  value: number;
  width?: number;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export const Stars = ({ value = 0, width, height, containerStyle }: Props) => {
  return (
    <View style={[tw`flex-row mb-4px`, containerStyle]}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarFill key={index} width={width} height={height} fill={(value - index) * 100} />
      ))}
    </View>
  );
};
