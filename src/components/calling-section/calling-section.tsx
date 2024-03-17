import { Image, Text } from '@rneui/themed';
import React, { memo } from 'react';
import { View } from 'react-native';

import { UserEntity } from '../../graphql/type.interface';
import { StarSVG } from '../../svg';
import { CallButton } from '../call-button';
import { Space } from '../spacer';
import { tw } from '../tw';

type Props = {
  user: UserEntity;
};

export const CallingSection = memo(({ user }: Props) => {
  return (
    <View style={tw`flex-row items-center py-3`}>
      <View style={tw`flex-row items-center flex-1`}>
        <View style={tw`relative`}>
          <View style={tw`bottom-5px p-2px border rounded-full border-grayscale-border`}>
            <Image source={{ uri: user.avatar?.fullThumbUrl ?? '' }} style={tw`w-40px h-40px rounded-full`} />
          </View>
          <View style={tw`-bottom-5px flex-row absolute items-center self-center bg-white px-4px py-1px rounded-full`}>
            <StarSVG />
            <Space size={4} horizontal />
            <Text style={tw`font-semibold text-12px`}>{user?.star?.toFixed?.(1) || 0}</Text>
          </View>
        </View>
        <Space horizontal size={12} />
        <View>
          <Text style={tw`text-12px`}>Khách hàng</Text>
          <Text style={tw`text-14px font-medium`}>{user.fullname}</Text>
        </View>
      </View>
      <CallButton phone={user?.phone} />
    </View>
  );
});
