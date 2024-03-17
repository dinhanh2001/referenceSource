import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

import { tw } from '../tw';
import { LocationLineSVG } from '../../svg';
import { Space } from '../spacer';
import { OrderAddressEntity, UserEntity } from '../../graphql/type.interface';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  address: OrderAddressEntity;
  user: UserEntity;
};

export const MyOrderAddressDetail = ({ containerStyle, address, user }: Props) => {
  const { fullname, phone } = user || {};
  const { mapAddress, addressDetail } = address || {};

  return (
    <View style={[tw`border border-[#eee] p-12px rounded-4px`, containerStyle]}>
      <View style={tw`flex-row items-center mb-12px`}>
        <LocationLineSVG />
        <Text style={tw`ml-8px font-semibold text-grayscale-black`}>Địa chỉ nhận hàng</Text>
      </View>
      <Space size={1} backgroundColor={'#eee'} />
      <View style={tw`mt-12px`}>
        <Text style={tw`text-13px text-grayscale-black font-semibold`}>{fullname}</Text>
        <Text style={tw`mt-4px text-13px text-grayscale-gray`}>{phone}</Text>
        <Text style={tw`mt-4px text-13px text-grayscale-gray`}>{`${addressDetail ?? ''} ${mapAddress ?? ''}`}</Text>
      </View>
    </View>
  );
};
