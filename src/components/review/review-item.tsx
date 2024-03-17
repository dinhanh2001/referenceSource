import { Image } from '@rneui/themed';
import dayjs from 'dayjs';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { tw } from '../tw';
import { ReviewEntity } from '../../graphql/type.interface';

import { Stars } from './stars';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item?: ReviewEntity;
};

export const ReviewItem = ({ containerStyle, item }: Props) => {
  const { star, userAssessor, comment } = item || {};
  const { avatar, fullname } = userAssessor || {};

  return (
    <View style={containerStyle}>
      <View style={tw`flex-row items-center`}>
        <Image source={{ uri: avatar?.fullThumbUrl as string }} style={tw`h-12 w-12 rounded-full`} />
        <View style={tw`ml-3 gap-1`}>
          <Text style={tw`text-13px font-semibold text-grayscale-black`}>{fullname}</Text>
          <Text style={tw`text-3 text-grayscale-gray`}>{dayjs().format('DD/MM/YYYY')}</Text>
        </View>
      </View>
      <View style={tw`pl-4 border-l mt-4 border-l-[#EEE] gap-2`}>
        <Stars value={star as number} />
        <Text style={tw`text-13px text-grayscale-black`}>{comment}</Text>
      </View>
    </View>
  );
};
