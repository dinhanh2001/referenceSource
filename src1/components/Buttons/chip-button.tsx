import React, { memo } from 'react';
import { TouchableOpacity, ViewStyle, Text, StyleProp } from 'react-native';

import { tw } from '../tw';

interface Props {
  leftIcon?: React.ReactNode;
  onPress?: () => void;
  text?: string | React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ChipButton = memo((props: Props) => {
  const { text, leftIcon, onPress, style } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[tw`flex flex-row gap-2 bg-grayscale-bg px-4 py-2 rounded-full items-center self-start`, style]}
    >
      {leftIcon}
      {typeof text === 'string' ? <Text>{text}</Text> : text}
    </TouchableOpacity>
  );
});
