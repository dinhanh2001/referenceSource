import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { Image } from '@rneui/themed';

import { VehicleEntity } from '../../graphql/type.interface';
import { tw } from '../tw';
import { Checkbox } from '../checkbox';

type VehicleCardProps = {
  viewType?: 'GRID' | 'LIST';
  item: VehicleEntity;
  onPress?(): void;
  borderVisible?: boolean;
  selectable?: boolean;
  selected?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  hideCheckbox?: boolean;
};

export const ITEM_HEIGHT = 96;

const DotView = () => <View style={tw`h-4px w-4px rounded-full bg-grayscale-disabled mr-8px`} />;

export const VehicleCard = React.memo(
  ({
    viewType = 'LIST',
    item,
    onPress,
    borderVisible = false,
    selectable,
    selected,
    containerStyle,
    hideCheckbox,
  }: VehicleCardProps) => {
    if (viewType === 'LIST')
      return (
        <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={onPress != null ? 0.5 : 1}>
          <View style={[tw`flex-row items-center`, { height: ITEM_HEIGHT }]}>
            <Image
              style={tw`h-72px w-72px rounded border flex-shrink-0 border-grayscale-border mr-16px`}
              source={{ uri: item?.avatar?.fullOriginalUrl || undefined }}
              resizeMode="cover"
            />
            <View style={[tw`w-full flex-row justify-between shrink`]}>
              <View style={tw`pr-16px shrink`}>
                <Text style={tw`font-medium text-14px leading-22px`} numberOfLines={2}>
                  {item?.name}
                </Text>
                <View style={tw`flex-row  items-center mt-6px`}>
                  <Text style={tw`text-13px text-grayscale-gray mr-8px`}>{item?.vinNumber}</Text>
                  {item?.vehicleRegistrationPlate && (
                    <>
                      <DotView />
                      <Text style={tw`text-13px text-grayscale-gray mr-8px`}>{item?.vehicleRegistrationPlate}</Text>
                    </>
                  )}
                  {!!item?.ordinalNumber && (
                    <>
                      <DotView />
                      <Text style={tw`text-13px text-grayscale-gray mr-8px`}>{item?.ordinalNumber}</Text>
                    </>
                  )}
                </View>
              </View>
              {!hideCheckbox && selectable && (
                <View style={tw`justify-center p-4 flex-shrink-0`}>
                  <Checkbox value={selected} controlled />
                </View>
              )}
            </View>
          </View>
          {borderVisible && <View style={tw`ml-88px border-b border-grayscale-border`} />}
        </TouchableOpacity>
      );

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={onPress != null ? 0.5 : 1}>
        <Image
          style={[tw`h-110px rounded border border-grayscale-border`]}
          source={{ uri: item?.avatar?.fullThumbUrl || undefined }}
          resizeMode="cover"
        />
        <View style={tw`mt-8px`}>
          <Text style={tw`font-medium text-14px leading-22px`} numberOfLines={2}>
            {item?.name}
          </Text>
          <View style={tw`mt-8px`}>
            <View style={tw`flex-row items-center`}>
              <DotView />
              <Text style={tw`text-12px text-grayscale-gray`}>{item?.vinNumber}</Text>
            </View>
            {!!item?.vehicleRegistrationPlate && (
              <View style={tw`flex-row items-center`}>
                <DotView />
                <Text style={tw`text-12px text-grayscale-gray`}>{item?.vehicleRegistrationPlate}</Text>
              </View>
            )}
            {!!item?.ordinalNumber && (
              <View style={tw`flex-row items-center`}>
                <DotView />
                <Text style={tw`text-12px text-grayscale-gray`}>{item?.ordinalNumber}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);
