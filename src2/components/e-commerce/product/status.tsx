import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { tw } from '../../tw';

type Props = {
  isNew?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ECommerceStatusProduct = ({ isNew, containerStyle }: Props) => {
  const bg = isNew ? 'blue' : 'grayscale-gray';

  return (
    <View style={[tw`bg-${bg} m-4px py-2px px-6px rounded-9999`, containerStyle]}>
      <Text style={tw`text-white text-9px`}>{isNew ? 'Mới' : 'Qua sử dụng'}</Text>
    </View>
  );
};
