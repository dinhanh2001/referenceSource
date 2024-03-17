import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { tw } from '../../../components';
import { MarkerCircleDark } from '../../../svg';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  addressMoreInfo: string;
  mapAddress: string;
};

export const LocationIssue = ({ containerStyle, addressMoreInfo, mapAddress }: Props) => {
  return (
    <View style={[tw`flex-row items-center`, containerStyle]}>
      <MarkerCircleDark />
      <View style={tw`ml-12px`}>
        <Text style={tw`text-white text-opacity-70 text-12px`}>Vị trí xe gặp sự cố</Text>
        <Text style={tw`text-white mt-2px`}>{`${addressMoreInfo} ${mapAddress}`}</Text>
      </View>
    </View>
  );
};
