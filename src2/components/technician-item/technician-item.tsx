import { Image, Text } from '@rneui/themed';
import React, { memo } from 'react';
import { View } from 'react-native';

import { tw } from '../tw';
import { StarIcon } from '../../svg';
import { PartnerEntity, PartnerTypeEnum } from '../../graphql/type.interface';
import { getQualification } from '../../utils';

type Props = {
  technician: PartnerEntity;
};

export const TechnicianItem: React.FC<Props> = memo(({ technician }: Props) => {
  const { reviewSummary, type, description, qualifications } = technician || {};

  return (
    <View
      style={tw.style('flex-row', 'items-center', 'py-3', 'border', 'p-16px', 'border-grayscale-border', 'rounded-4px')}
    >
      <View style={tw`flex-row items-center flex-1`}>
        <View style={tw`relative`}>
          <View style={tw`bottom-5px w-48px h-48px rounded-full border border-grayscale-border`}>
            <Image source={{ uri: technician.avatar?.fullThumbUrl ?? '' }} style={tw`w-full h-full rounded-full`} />
          </View>
        </View>
        <View style={tw`ml-16px flex-1`}>
          <Text style={tw`text-14px font-semibold`}>{technician.fullname}</Text>
          <View style={tw`flex-row items-center`}>
            <StarIcon />
            <Text style={tw`text-12px`}>{reviewSummary?.starAverage?.toFixed?.(1) || 0}</Text>
            <Text style={tw`text-grayscale-light text-12px ml-4px`}>{`${reviewSummary?.total || 0} đánh giá`}</Text>
          </View>
          <Text style={tw`text-13px text-grayscale-gray`} numberOfLines={2}>
            {type === PartnerTypeEnum.AGENCY ? description : getQualification(qualifications ?? [], 'Đơn vị sửa chữa')}
          </Text>
        </View>
      </View>
    </View>
  );
});
