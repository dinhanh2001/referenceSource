import { View, Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import React, { useState } from 'react';

import { StarCustom } from '../../../svg';
import { tw } from '../../../components';

type Props = {
  onChange: (value: number) => void;
  max?: number;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const Rate = ({ onChange, max = 5, label, containerStyle }: Props) => {
  const [rated, setRated] = useState(0);

  const onRate = (value: number) => () => {
    setRated(value);
    onChange?.(value);
  };

  return (
    <View style={containerStyle}>
      {!!label && <Text style={tw`text-14px font-semibold`}>{label}</Text>}
      <View style={tw`flex-row items-center mt-10px`}>
        {Array(max)
          .fill(0)
          .map((_, index) => (
            <Pressable key={index} onPress={onRate(index + 1)}>
              <StarCustom fill={index < rated ? '#F5B102' : '#A6ABAD'} width={32} height={32} />
            </Pressable>
          ))}
      </View>
    </View>
  );
};
