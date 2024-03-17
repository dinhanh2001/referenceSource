import { Image } from '@rneui/themed';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CategoryEntity, PartnerEntity } from '../../graphql/type.interface';
import { StarPrimary } from '../../svg';
import { getQualification } from '../../utils';
import { tw } from '../tw';

type Props = {
  item: PartnerEntity;
  onPress: (item: PartnerEntity) => void;
};

export const PartnerItem = ({ item, onPress }: Props) => {
  const { avatar, fullname, qualifications, reviewSummary } = item || {};
  const { starAverage, total } = reviewSummary || {};

  return (
    <TouchableOpacity style={tw`p-4 flex-row gap-4`} onPress={() => onPress(item)}>
      <Image source={{ uri: avatar?.fullThumbUrl || '' }} style={tw`w-22 h-22 rounded-1`} />
      <View style={tw`flex-1`}>
        <Text style={tw`font-semibold`}>{fullname}</Text>
        <Text style={tw`text-13px mt-2px`}>{getQualification(qualifications as CategoryEntity[])}</Text>
        <View style={tw`flex-row items-center mt-2`}>
          <StarPrimary />
          <Text style={tw`text-3 mx-1`}>{starAverage?.toFixed?.(1) || 0}</Text>
          <Text style={tw`text-3 text-grayscale-light`}>{`(${total} đánh giá)`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
