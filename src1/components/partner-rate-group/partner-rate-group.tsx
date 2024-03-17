import { memo } from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/themed';

import { tw } from '../tw';
import { StarSVG } from '../../svg';
import { ReviewSummary } from '../../graphql/type.interface';

type Props = {
  reviewSummary: ReviewSummary;
};

export const PartnerRateGroup = memo(({ reviewSummary }: Props) => {
  const { total, starAverage } = reviewSummary || {};

  return (
    <View style={tw`flex flex-row gap-1 mt-1 items-center`}>
      <StarSVG />
      <Text style={tw`text-12px`}>{starAverage?.toFixed?.(1)}</Text>
      <Text style={tw`text-12px text-grayscale-light`}>{`(${total} đánh giá)`}</Text>
    </View>
  );
});
