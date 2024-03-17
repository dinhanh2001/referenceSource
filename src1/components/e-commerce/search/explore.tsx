import { View, Text } from 'react-native';
import React from 'react';

import { tw } from '../../tw';

type Props = {
  label: string;
  icon: React.ReactNode;
};

export const ECommerceSearchExplore = ({ label, icon }: Props) => {
  return (
    <View style={tw`flex-1 flex-row bg-grayscale-bg p-10px rounded-4px justify-between items-center`}>
      <Text style={tw`font-semibold text-13px`}>{label}</Text>
      {icon}
    </View>
  );
};
