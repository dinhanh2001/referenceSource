import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

import { tw } from '../tw';
import { ReviewSummary } from '../../graphql/type.interface';

import { Stars } from './stars';

type Props = {
  summary: ReviewSummary;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ReviewSummaryComponent = ({ summary, containerStyle }: Props) => {
  const { percent, starAverage, total } = summary || {};

  return (
    <View style={[tw`flex-row mt-4`, containerStyle]}>
      <Text style={tw`text-31px font-semibold`}>{starAverage?.toFixed?.(1) || 0}</Text>
      <Text style={tw`text-17px font-medium mt-4px`}>/ 5</Text>
      <View style={tw`ml-4`}>
        <Stars value={starAverage} />

        <Text style={tw`text-3 text-grayscale-gray`}>{`${total || 0} đánh giá, ${percent || 0}% hài lòng`}</Text>
      </View>
    </View>
  );
};
