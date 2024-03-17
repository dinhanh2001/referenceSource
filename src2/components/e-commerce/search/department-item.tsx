import { Image } from '@rneui/themed';
import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { CategoryEntity, PartnerEntity } from '../../../graphql/type.interface';
import { StarIcon } from '../../../svg';
import { getQualification } from '../../../utils';
import { tw } from '../../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item?: PartnerEntity;
  onPress?: (id: string) => void;
  isGrid?: boolean;
  width?: number;
};

export const ECommerceDepartmentItem = ({ containerStyle, item, onPress, isGrid, width }: Props) => {
  const { avatar, fullname, storeReviewSummary, qualifications, id } = item || {};

  const handlePress = () => onPress?.(id as string);

  if (isGrid) {
    return (
      <View style={[tw`w-${width as number}px bg-white shadow-md rounded-1 `, containerStyle]}>
        <Image
          style={tw`w-${width as number}px h-${width as number}px rounded-tl-1 rounded-tr-1`}
          source={{
            uri: avatar?.fullThumbUrl as string,
          }}
        />
        <View style={tw`m-2`}>
          <Text numberOfLines={2} style={tw`text-grayscale-black font-semibold`}>
            {fullname}
          </Text>
          <View style={tw`flex-row items-center mt-1`}>
            <StarIcon />
            <Text style={tw`text-grayscale-black mx-1 opacity-80`}>{storeReviewSummary?.starAverage?.toFixed(1)}</Text>
            <Text style={tw`text-grayscale-gray opacity-60`}>{`(${storeReviewSummary?.total} đánh giá)`}</Text>
          </View>
          <Text numberOfLines={1} style={tw`text-grayscale-black text-11px`}>
            {getQualification(qualifications as CategoryEntity[])}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity style={[tw``, containerStyle]} onPress={handlePress}>
      <View style={tw`flex-row `}>
        <Image
          source={{
            uri: avatar?.fullThumbUrl as string,
          }}
          style={tw`w-9 h-9 rounded-4px`}
        />
        <View style={tw`flex-1 ml-3`}>
          <Text style={tw`text-grayscale-black font-semibold`}>{fullname}</Text>
          <View style={tw`flex-row items-center mt-1`}>
            <StarIcon />
            <Text style={tw`text-grayscale-black mx-1 opacity-80`}>
              {storeReviewSummary?.starAverage?.toFixed(1) || 0}
            </Text>
            <Text style={tw`text-grayscale-gray opacity-60`}>{`(${storeReviewSummary?.total || 0} đánh giá)`}</Text>
          </View>
          <Text numberOfLines={1} style={tw`text-grayscale-black text-11px`}>
            {getQualification(qualifications as CategoryEntity[])}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
