import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { MaintenanceAccessoryEntity, MaintenancesAccessoryEntity } from '../../graphql/type.interface';
import { tw } from '../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item: MaintenancesAccessoryEntity;
  available: MaintenanceAccessoryEntity[];
  index: number;
};

export const FieldSupplies = ({ containerStyle, item, index, available }: Props) => {
  const { name, quantity, unit, id } = item || {};
  const isAvailable = available?.find((i) => i.accessoryId === id)?.isAvailable;

  return (
    <View style={[tw`mt-4 mx-4 border border-[#EEE] rounded-1 overflow-hidden`, containerStyle]}>
      <View style={tw`flex-row justify-between px-4 py-3 bg-[#EAECFF] items-center`}>
        <Text style={tw`font-medium`}>{`${index + 1}. ${name}`}</Text>
        <Text style={tw`text-13px`}>{`x${quantity} ${unit}`}</Text>
      </View>
      <Text style={tw`text-center my-4`}>{isAvailable ? 'Có sẵn' : 'Không có sẵn'}</Text>
    </View>
  );
};
