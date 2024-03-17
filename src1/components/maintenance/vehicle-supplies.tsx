import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import { Image } from '@rneui/themed';

import { tw } from '../tw';
import { MaintenanceLevelEnum, VehicleEntity } from '../../graphql/type.interface';

type Props = {
  vehicle?: VehicleEntity;
  maintenanceLevel?: MaintenanceLevelEnum;
  operatingNumber?: number;
};

export const VehicleSupplies = ({ vehicle, maintenanceLevel, operatingNumber }: Props) => {
  const { avatar, name } = vehicle || {};

  const text = useMemo(
    () =>
      maintenanceLevel === MaintenanceLevelEnum.INCURRED
        ? 'Bảo dưỡng phát sinh'
        : `Định kỳ (giờ vận hành ${operatingNumber}h)`,
    [operatingNumber, maintenanceLevel],
  );

  return (
    <View style={tw`px-4 py-3 bg-grayscale-bg gap-4 flex-row`}>
      <Image source={{ uri: avatar?.fullThumbUrl as string }} style={tw`h-14 w-14 rounded-1`} />
      <View style={tw`flex-1 gap-6px`}>
        <Text style={tw`font-medium`}>{name}</Text>
        <Text style={tw`text-3 text-grayscale-gray`}>{text}</Text>
      </View>
    </View>
  );
};
