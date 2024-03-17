import { View, Text, ViewStyle, StyleProp } from 'react-native';
import React from 'react';
import { Image } from '@rneui/themed';
import dayjs from 'dayjs';

import { tw } from '../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

export const MyOrderPayment = ({ containerStyle }: Props) => {
  return (
    <View style={containerStyle}>
      <Text style={tw`font-semibold`}>Phương thức thanh toán</Text>
      <View style={tw`flex-row mt-16px`}>
        <Image source={{ uri: BANK_URI }} style={tw`w-40px h-40px rounded-8px`} />
        <View style={tw`ml-12px flex-1`}>
          <Text>**** **** **** 1121</Text>
          <Text style={tw`text-12px text-grayscale-gray`}>TPbank</Text>
        </View>
      </View>
      <View style={tw`bg-grayscale-bg mt-16px px-12px py-8px flex-row justify-between items-center`}>
        <Text style={tw`text-13px text-grayscale-gray`}>Thời gian thanh toán</Text>
        <Text style={tw`text-13px text-grayscale-gray`}>{dayjs().format('DD/MM/YYYY HH:mm')}</Text>
      </View>
    </View>
  );
};

const BANK_URI =
  'https://play-lh.googleusercontent.com/tvOeQt4JnRE7HWeUEgakVM7rnrNNv3JTik39R0V34m5se35ao66Txth_4FKrp33xug';
