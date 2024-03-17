import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

import { Location } from '../../../svg';
import { tw } from '../../tw';
import { Space } from '../../spacer';
import { OrderAddressEntity } from '../../../graphql/type.interface';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  address: OrderAddressEntity;
};

export const ECommerceMyOrderAddressItem = ({ containerStyle, address }: Props) => {
  const { contactName, contactPhone, mapAddress } = address || {};

  return (
    <View style={[tw`border border-[#eee] p-3 rounded-4px`, containerStyle]}>
      <View style={tw`flex-row items-center mb-3`}>
        <Location />
        <Text style={tw`ml-2 font-semibold text-grayscale-black`}>Địa chỉ nhận hàng</Text>
      </View>
      <Space size={1} backgroundColor={'#eee'} />
      <View style={tw`mt-3`}>
        <Text style={tw`text-13px text-grayscale-black font-semibold`}>{contactName}</Text>
        <Text style={tw`mt-1 text-13px text-grayscale-gray`}>{contactPhone}</Text>
        <Text style={tw`mt-1 text-13px text-grayscale-gray`}>{mapAddress}</Text>
      </View>
    </View>
  );
};
