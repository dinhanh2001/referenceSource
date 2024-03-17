import { Text } from '@rneui/themed';
import React, { memo } from 'react';
import { View } from 'react-native';

import { tw } from '../tw';

type TabBarLabelType = {
  focused: boolean;
  title: string;
};

export const TabBarLabel2 = memo(({ focused, title }: TabBarLabelType) => {
  return (
    <View style={tw.style('items-center', 'justify-center', 'p-2', 'flex-row', `rounded-2xl`)}>
      <Text
        style={focused ? tw.style(['font-semibold', 'text-17px', 'text-primary']) : tw.style(['px-5', 'text-13px'])}
      >
        {title}
      </Text>
    </View>
  );
});
