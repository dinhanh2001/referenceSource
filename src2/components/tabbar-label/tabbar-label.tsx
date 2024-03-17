import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '../tw';

type Props = {
  badge?: number | string;
  focused?: boolean;
  title?: string;
};

export const TabbarLabel = ({ badge, title, focused }: Props) => {
  return (
    <View
      style={[tw`py-2 px-3 rounded-full flex-row items-center ${focused ? 'bg-primary-light justify-center' : ''}`]}
    >
      <Text style={[tw`text-grayscale-black text-14px font-normal`, focused && tw`font-semibold`]}>{title}</Text>
      <View
        style={tw`rounded-full items-center justify-center px-4px py-2px min-w-24px ml-2px ${
          focused ? 'bg-primary' : ''
        } `}
      >
        <Text style={tw`text-grayscale-black text-14px ${focused ? 'font-bold' : 'font-normal'}`}>
          {focused ? badge : `(${badge})`}
        </Text>
      </View>
    </View>
  );
};
