import { View, Text } from 'react-native';
import React from 'react';

import { tw } from '../tw';

type EmptyViewProps = {
  icon?: React.ReactNode;
  text?: string;
  action?: React.ReactNode;
};

export const EmptyView = ({ icon, text, action }: EmptyViewProps) => {
  return (
    <View style={tw`flex-1 items-center pt-32px`}>
      {icon}
      {!!text && <Text style={tw`text-14px text-grayscale-gray pt-16px`}>{text}</Text>}
      {action}
    </View>
  );
};
