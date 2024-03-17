import { Image } from '@rneui/themed';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { tw } from '../../tw';
import { StarIcon } from '../../../svg';
import { CategoryEntity, PartnerEntity } from '../../../graphql/type.interface';
import { getQualification } from '../../../utils';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  data?: PartnerEntity;
};

export const ECommerceStoreInfo = ({ containerStyle, data }: Props) => {
  const { avatar, fullname, storeReviewSummary, qualifications } = data || {};

  return (
    <View style={containerStyle}>
      <View style={tw`flex-row `}>
        <Image
          source={{
            uri: avatar?.fullThumbUrl as string,
          }}
          style={tw`w-9 h-9 rounded-4px`}
        />
        <View style={tw`flex-1 ml-3`}>
          <Text style={tw`text-grayscale-black font-semibold`}>{fullname}</Text>
          <View style={tw`flex-row items-center mt-2`}>
            <StarIcon />
            <Text style={tw`text-grayscale-black mx-1 opacity-80`}>
              {storeReviewSummary?.starAverage?.toFixed?.(1)}
            </Text>
            <Text style={tw`text-grayscale-gray opacity-60`}>{`(${storeReviewSummary?.total} đánh giá)`}</Text>
          </View>
          <Text numberOfLines={2} style={tw`text-grayscale-black text-11px mt-2`}>
            {getQualification(qualifications as CategoryEntity[])}
          </Text>
        </View>
      </View>
    </View>
  );
};
