import * as Linking from 'expo-linking';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { CallSVG } from '../../svg';
import { tw } from '../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  phone: string | number | undefined;
};

export const CallButton = React.memo(({ phone, containerStyle, width, height }: Props) => {
  const onCall = () => {
    try {
      const url = `tel:${phone}`;
      Linking.openURL(url);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={onCall}
      style={[tw`h-36px w-36px rounded-full bg-white items-center justify-center shadow-md`, containerStyle]}
    >
      <CallSVG width={width} height={height} />
    </TouchableOpacity>
  );
});
