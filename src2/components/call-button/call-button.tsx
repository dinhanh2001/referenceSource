import * as Linking from 'expo-linking';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { CallPrimary } from '../../svg';
import { tw } from '../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  phone: string | number | undefined;
  children?: React.ReactNode;
};

export const CallButton = React.memo(({ phone, containerStyle, width, height, children }: Props) => {
  const onCall = () => {
    try {
      const url = `tel:${phone}`;
      Linking.openURL(url);
    } catch (error) {
      console.log('error', error);
    }
  };

  if (children)
    return (
      <TouchableOpacity onPress={onCall} style={containerStyle}>
        {children}
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity
      onPress={onCall}
      style={[tw`h-36px w-36px rounded-full bg-white items-center justify-center shadow-md`, containerStyle]}
    >
      <CallPrimary width={width} height={height} />
    </TouchableOpacity>
  );
});
