import React from 'react';
import { StyleSheet, View } from 'react-native';

import { StarCustom } from '../../svg';
import { tw } from '../tw';

type Props = {
  width?: number;
  height?: number;
  fill?: number;
  colorFill?: string;
  colorUnFill?: string;
};

export const StarFill = ({
  width = 13.335,
  height = 12.668,
  fill = 100,
  colorFill = '#F5B102',
  colorUnFill = '#A6ABAD',
}: Props) => {
  const value = fill > 100 ? 100 : fill < 0 ? 0 : fill;

  return (
    <View style={tw`w-${width}px h-${height}px`}>
      <StarCustom fill={colorFill} width={width} height={height} />
      <View style={[tw` absolute right-0  w-${((100 - value) * width) / 100}px overflow-hidden`, styles.rotate]}>
        <StarCustom fill={colorUnFill} width={width} height={height} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rotate: {
    transform: [{ rotateY: '180deg' }],
  },
});
