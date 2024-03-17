import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { MinusSVG, PlusSVG } from '../../../svg';
import { tw } from '../../tw';

type Props = {
  onMinus: () => void;
  onPlus: () => void;
  value: number;
};

export const ECommerceCartCountInput = ({ onMinus, onPlus, value }: Props) => {
  return (
    <View style={tw`flex-row gap-3 border p-2 rounded-3px border-[#EEE]`}>
      <TouchableOpacity onPress={onMinus}>
        <MinusSVG />
      </TouchableOpacity>
      <Text style={tw`text-3 font-semibold`}>{value}</Text>
      <TouchableOpacity onPress={onPlus}>
        <PlusSVG />
      </TouchableOpacity>
    </View>
  );
};
