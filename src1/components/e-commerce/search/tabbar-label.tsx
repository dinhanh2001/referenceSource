import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

import { tw } from '../../tw';

type Props = {
  badge?: number;
  focused?: boolean;
  title?: string;
  colorFocused?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ECommerceSeachResultTabbarLabel = ({
  title,
  focused,
  colorFocused = 'primary-dark',
  containerStyle,
}: Props) => {
  return (
    <View
      style={[tw`py-2 mx-3 flex-row items-center`, focused && tw` border-b-2 border-b-${colorFocused}`, containerStyle]}
    >
      <Text
        style={[
          tw`text-14px font-normal`,
          focused ? tw`font-semibold ` : tw`px-2px pt-1px`,
          focused ? tw`text-${colorFocused}` : tw`text-grayscale-gray`,
        ]}
      >
        {title}
      </Text>
    </View>
  );
};
