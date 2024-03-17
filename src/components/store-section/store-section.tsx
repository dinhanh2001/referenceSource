import { Image, Text } from '@rneui/themed';
import React, { memo } from 'react';
import { View } from 'react-native';

import { Space } from '../spacer';
import { tw } from '../tw';
import { StarSVG } from '../../svg';
import { PartnerEntity, PartnerTypeEnum } from '../../graphql/type.interface';
import { getQualification } from '../../utils';

type Props = {
  store: PartnerEntity;
};

export const StoreSection = memo(({ store }: Props) => {
  const { avatar, fullname, storeReviewSummary, type, description, qualifications } = store || {};

  return (
    <View style={tw`flex-row`}>
      <Image source={{ uri: avatar?.fullThumbUrl as string }} style={tw`rounded-4px h-36px w-36px`} />
      <Space horizontal size={12} />
      <View style={tw`flex-1 justify-between`}>
        <Text style={tw`font-semibold text-black overflow-hidden`}>{fullname}</Text>
        <Space size={4} />
        <View style={tw`flex-row items-center`}>
          <StarSVG />
          <Space horizontal size={4} />
          <Text style={tw`text-12px`}>{storeReviewSummary?.starAverage?.toFixed?.(1) || 0}</Text>
          <Space horizontal size={4} />
          <Text style={tw`text-grayscale-light text-12px`}>{`${storeReviewSummary?.total || 0} đánh giá`}</Text>
        </View>
        <Space size={4} />
        <Text numberOfLines={1}>
          {type === PartnerTypeEnum.AGENCY ? description : getQualification(qualifications ?? [])}
        </Text>
      </View>
    </View>
  );
});
