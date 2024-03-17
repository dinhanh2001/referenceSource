import { Image, Text } from '@rneui/themed';
import React, { memo } from 'react';
import { View } from 'react-native';

import { VehicleEntity } from '../../graphql/type.interface';
import { Space } from '../spacer';
import { tw } from '../tw';

type Props = {
  data?: VehicleEntity;
};

export const VehicleSection = memo(({ data }: Props) => {
  return (
    <View style={tw`flex-row`}>
      <Image source={{ uri: data?.avatar?.fullThumbUrl ?? '' }} style={tw`rounded-4px h-64px w-64px`} />
      <Space horizontal size={16} />
      <View style={tw`flex-1 justify-between`}>
        <Text style={tw`font-medium text-black overflow-hidden`} numberOfLines={2}>
          {data?.name}
        </Text>
        <Text style={tw`text-grayscale-gray`}>
          {data?.vinNumber} • {data?.vehicleRegistrationPlate} • {data?.serialNumber}
        </Text>
      </View>
    </View>
  );
});
