import React, { useCallback, useState } from 'react';
import { LayoutAnimation, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { MaintenanceAccessoryEntity, MaintenancesAccessoryEntity } from '../../graphql/type.interface';
import { ArrowDown, ArrowUp } from '../../svg';
import { tw } from '../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  accessories: MaintenancesAccessoryEntity[];
  operatingNumber: number;
  available: MaintenanceAccessoryEntity[];
};

export const RoutineMaintenance = ({ containerStyle, accessories, available, operatingNumber }: Props) => {
  const [collapsed, setCollapsed] = useState(true);

  const onToggleCollapse = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setCollapsed((p) => !p);
  }, []);

  const renderAccessory = useCallback(
    (item: MaintenancesAccessoryEntity, index: number) => {
      const { id, name, unit, quantity } = item || {};
      const isOdd = index % 2 === 0;

      const isAvailable = available?.find?.((i) => i?.accessoryId === id)?.isAvailable;

      return (
        <View
          key={id}
          style={tw`mt-4 border border-[#EEE] bg-${
            isOdd ? '[#EAECFF]' : 'grayscale-bg'
          } rounded-1 overflow-hidden px-4 py-3 `}
        >
          <View style={tw`flex-row justify-between  items-center`}>
            <Text style={tw`font-medium`}>{`${index + 1}. ${name}`}</Text>
            <Text style={tw`text-13px`}>{`x${quantity} ${unit}`}</Text>
          </View>
          <Text style={tw`mt-2px`}>{isAvailable ? 'Có sẵn' : 'Không có sẵn'}</Text>
        </View>
      );
    },
    [available],
  );

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={tw`flex-row items-center`} onPress={onToggleCollapse}>
        <View style={tw`flex-1`}>
          <Text style={tw`font-medium`}>Định kỳ (giờ vận hành {operatingNumber}h)</Text>
          <Text style={tw`text-grayscale-gray text-3 mt-2px`}>Hạng mục & vật tư bảo dưỡng</Text>
        </View>

        {collapsed ? <ArrowUp /> : <ArrowDown />}
      </TouchableOpacity>

      {collapsed && <View>{accessories?.map?.(renderAccessory)}</View>}
    </View>
  );
};
