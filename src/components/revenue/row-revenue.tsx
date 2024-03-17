import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

import { tw } from '../tw';
import { thousandSeparator } from '../../helpers';
import { ActivityIndicator } from '../loading-indicator';

type Props = {
  icon: JSX.Element;
  title: string;
  value: number | string;
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
};

export const RowRevenue = ({ icon, title, value, containerStyle, loading }: Props) => {
  return (
    <View style={[tw`flex-row my-4`, containerStyle]}>
      {icon}
      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-13px`}>{title}</Text>
        <Text style={tw`mt-1 text-19px font-bold`}>
          {loading ? <ActivityIndicator /> : `${thousandSeparator(value)} đ`}
        </Text>
      </View>
    </View>
  );
};
