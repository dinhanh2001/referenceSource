import { Text } from '@rneui/themed';
import React, { memo } from 'react';
import { View } from 'react-native';

import { Space } from '../spacer';
import { tw } from '../tw';

type TabBarLabelType = {
  focused: boolean;
  title: string;
  badge?: number | string;
  width?: number;
};

export const TabBarLabel1 = memo(({ focused, title, badge }: TabBarLabelType) => {
  return (
    <View
      style={[
        tw.style(
          'items-center',
          'justify-center',
          'p-2',
          'flex-row',
          `rounded-2xl`,
          focused ? 'bg-primary-light' : 'bg-white',
        ),
      ]}
    >
      <Text style={focused ? tw`font-semibold` : tw`px-1`}>{title}</Text>
      {focused && <Space size={3} horizontal />}
      <Space size={1} horizontal />
      {badge != null && (
        <View
          style={tw.style(
            focused ? 'px-1.5' : 'px-0',
            'flex-row',
            `rounded-full`,
            focused ? 'bg-primary' : 'bg-white',
            'items-center',
            'justify-center',
          )}
        >
          <Text style={focused ? tw`font-semibold` : tw``}>{focused ? badge : `(${badge})`}</Text>
        </View>
      )}
    </View>
  );
});
