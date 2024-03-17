import { Image } from '@rneui/themed';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { LocationPrimary } from '../../svg';
import { tw } from '../tw';
import { VehicleEntity } from '../../graphql/type.interface';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  vehicle?: VehicleEntity;
  address?: string;
};

const DotView = () => <View style={tw`h-4px w-4px rounded-full bg-grayscale-disabled mr-8px`} />;

export const VehicleMaintenance = ({ containerStyle, vehicle, address }: Props) => {
  const { avatar, name, vinNumber, vehicleRegistrationPlate, ordinalNumber } = vehicle || {};

  return (
    <View style={[tw``, containerStyle]}>
      <View style={tw`flex-row`}>
        <Image style={tw`h-16 w-16 rounded-1`} source={{ uri: avatar?.fullThumbUrl as string }} />
        <View style={tw`flex-1 ml-4`}>
          <Text numberOfLines={2} style={tw`font-medium`}>
            {name}
          </Text>
          <View style={tw`flex-row flex-wrap items-center mt-6px`}>
            <Text style={tw`text-13px text-grayscale-gray mr-8px`}>{vinNumber}</Text>
            {vehicleRegistrationPlate && (
              <>
                <DotView />
                <Text style={tw`text-13px text-grayscale-gray mr-8px`}>{vehicleRegistrationPlate}</Text>
              </>
            )}
            {!!ordinalNumber && (
              <>
                <DotView />
                <Text style={tw`text-13px text-grayscale-gray mr-8px`}>{ordinalNumber}</Text>
              </>
            )}
          </View>
          {/* <View style={tw`flex-row items-center mt-6px`}>
            <Text style={tw`text-13px text-grayscale-gray`}>XCMG</Text>
            <View style={tw`h-3px w-3px rounded-full bg-grayscale-disabled mx-2`} />
            <Text style={tw`text-13px text-grayscale-gray`}>2016</Text>
            <View style={tw`h-3px w-3px rounded-full bg-grayscale-disabled mx-2`} />
            <Text style={tw`text-13px text-grayscale-gray`}>LW500FN</Text>
          </View> */}
        </View>
      </View>
      {!!address && (
        <View style={tw`flex-row mt-2 px-3 py-2 bg-grayscale-bg rounded-1 items-center`}>
          <LocationPrimary />
          <View style={tw`flex-1 ml-3`}>
            <Text numberOfLines={1}>{address}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
