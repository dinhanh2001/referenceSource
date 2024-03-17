import { View, Text, ViewStyle, StyleProp } from 'react-native';
import React from 'react';
import { Image } from '@rneui/themed';

import { tw } from '../../../components';
import { VehicleEntity } from '../../../graphql/type.interface';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item: VehicleEntity;
};

const DotView = () => <View style={tw`h-4px w-4px rounded-full bg-grayscale-disabled mx-8px`} />;

export const VehicleView = ({ containerStyle, item }: Props) => {
  return (
    <View style={[tw`bg-[#293847] flex-row rounded-4px p-16px`, containerStyle]}>
      <Image
        source={{
          uri: item?.avatar?.fullThumbUrl as string,
        }}
        style={tw`h-72px w-72px rounded  flex-shrink-0`}
      />
      <View style={tw`flex-1 ml-16px`}>
        <Text style={tw`text-white font-medium text-14px leading-22px`} numberOfLines={2}>
          {item?.name}
        </Text>
        <View style={tw`mt-6px flex-row`}>
          <Text style={tw`text-12px text-white`}>{item?.vinNumber}</Text>
          {!!item?.vehicleRegistrationPlate && (
            <View style={tw`flex-row items-center`}>
              <DotView />
              <Text style={tw`text-12px text-white`}>{item?.ordinalNumber}</Text>
            </View>
          )}
          {!!item?.ordinalNumber && (
            <View style={tw`flex-row items-center`}>
              <DotView />
              <Text style={tw`text-12px text-white`}>{item?.vehicleRegistrationPlate}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
