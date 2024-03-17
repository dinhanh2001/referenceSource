import { Image, Text } from '@rneui/themed';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

import { StarSVG } from '../../svg';
import { CallButton } from '../call-button';
import { Space } from '../spacer';
import { tw } from '../tw';
import { ReviewSummary } from '../../graphql/type.interface';

type Props = {
  name: string;
  phoneNumber: string;
  jobTitle: string;
  fullThumUrl?: string;
  onPress?: () => void;
  reviewSummary: ReviewSummary;
};

export const TechnicianItem: React.FC<Props> = memo(
  ({ name, phoneNumber, jobTitle, fullThumUrl, onPress, reviewSummary }: Props) => {
    return (
      <Pressable
        onPress={onPress}
        style={tw.style(
          'flex-row',
          'items-center',
          'py-3',
          'border',
          'p-16px',
          'border-grayscale-border',
          'rounded-4px',
        )}
      >
        <View style={tw`flex-row items-center flex-1`}>
          <View style={tw`relative`}>
            <View style={tw`bottom-5px p-2px border rounded-full border-white shadow-xl`}>
              <Image source={{ uri: fullThumUrl || '' }} style={tw`w-48px h-48px rounded-full`} />
            </View>
            <View
              style={tw`-bottom-5px flex-row absolute items-center self-center bg-white px-6px py-2px rounded-full`}
            >
              <StarSVG />
              <Space size={4} horizontal />
              <Text style={tw`font-semibold text-12px`}>{reviewSummary?.starAverage?.toFixed?.(1) || 0}</Text>
            </View>
          </View>
          <Space horizontal size={12} />
          <View style={tw`mr-64px`}>
            <Text style={tw`text-14px font-semibold`}>{name}</Text>
            <Text style={tw`text-13px text-grayscale-gray`}>{phoneNumber}</Text>
            <Text style={tw`text-13px text-grayscale-gray`} numberOfLines={1}>
              {jobTitle}
            </Text>
          </View>
        </View>
        <Space horizontal size={12} />
        <CallButton phone={phoneNumber} />
      </Pressable>
    );
  },
);
