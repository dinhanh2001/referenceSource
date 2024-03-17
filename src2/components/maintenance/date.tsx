import { View, Text, ViewStyle, StyleProp } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';

import { tw } from '../tw';
import { CalendarSVG } from '../../svg';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  date: string;
};

export const DateMaintenance = ({ containerStyle, title, date }: Props) => {
  return (
    <View style={[tw`gap-2`, containerStyle]}>
      <Text style={tw`font-medium`}>{title} </Text>
      <View style={tw`flex-row items-center justify-between border border-[#EEE] px-4 py-10px rounded-1`}>
        <Text>{dayjs(date).format('DD/MM/YYYY')}</Text>
        <CalendarSVG />
      </View>
    </View>
  );
};
