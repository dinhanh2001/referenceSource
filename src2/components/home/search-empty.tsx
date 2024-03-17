import { View, Text } from 'react-native';
import React from 'react';

import { tw } from '../tw';
import { EmptyOrder } from '../../svg';

export const SearchEmpty = () => {
  return (
    <View style={tw`items-center mt-4`}>
      <EmptyOrder />
      <Text style={tw`mt-2 text-grayscale-gray`}>Không tìm thấy kết quả nào</Text>
    </View>
  );
};
