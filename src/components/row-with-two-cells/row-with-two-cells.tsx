import { Text } from '@rneui/themed';
import React, { ReactNode, memo } from 'react';
import { ColorValue, View, ViewStyle } from 'react-native';

import { tw } from '../tw';
import { Space } from '../spacer';

type Props = {
  leftValue: string | ReactNode;
  rightValue: string | ReactNode;
  spacerColor?: ColorValue;
  bgColorLeft?: ViewStyle;
  bgColorRight?: ViewStyle;
  isAlignEnd?: boolean;
};

export const RowWithTwoCells: React.FC<Props> = memo(
  ({ leftValue, rightValue, bgColorLeft, bgColorRight, spacerColor, isAlignEnd }: Props) => {
    return (
      <View style={tw`flex flex-row border-b border-grayscale-border`}>
        <View style={[tw`w-1/2 text-12px justify-center bg-grayscale-light`, bgColorLeft]}>
          {typeof leftValue === 'string' ? <Text style={tw.style('mx-16px my-10px')}>{leftValue}</Text> : leftValue}
        </View>
        <Space backgroundColor={spacerColor || tw.color('bg-grayscale-border')} size={1} horizontal />
        <View style={[tw`w-1/2 justify-center`, bgColorRight, isAlignEnd && tw`items-end`]}>
          {typeof rightValue === 'string' ? (
            <Text style={tw`text-text text-12px mx-16px my-10px items-end`}>{rightValue}</Text>
          ) : (
            rightValue
          )}
        </View>
      </View>
    );
  },
);
