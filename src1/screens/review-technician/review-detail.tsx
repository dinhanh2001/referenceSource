import { Divider, Image, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';

import { tw } from '../../components';
import { ReviewEntity } from '../../graphql/type.interface';
import { Stars } from '../../components/stars';

type Props = {
  item: ReviewEntity;
};

export const ReviewDetail = ({ item }: Props) => {
  const { comment, userAssessor, createdAt, star } = item || {};
  const { avatar, fullname } = userAssessor || {};

  return (
    <View style={tw`mb-32px`}>
      <View style={tw`flex-row items-center`}>
        <View style={tw`w-48px h-48px mr-12px`}>
          <Image style={[tw`h-48px rounded-full`]} source={{ uri: avatar?.fullThumbUrl || '' }} />
        </View>
        <View>
          <Text style={tw`font-semibold leading-18px text-13px`}>{fullname}</Text>
          <Text style={tw`font-normal text-grayscale-gray leading-16px text-12px`}>
            {dayjs(createdAt).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>
      <View style={tw`flex-row mt-16px`}>
        <Divider orientation="vertical" style={tw`mr-16px`} />
        <View>
          <Stars value={star} />
          <Text style={tw`font-normal leading-18px text-13px mt-8px mr-16px`}>{comment}</Text>
        </View>
      </View>
    </View>
  );
};
