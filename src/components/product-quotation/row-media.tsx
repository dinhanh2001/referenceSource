import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { useCallback } from 'react';

import { ClipSVG } from '../../svg';
import { tw } from '../tw';

type Props = {
  label: string;
  media?: any;
  onPress: (media?: any) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const RowMedia = ({ media, label, onPress, containerStyle }: Props) => {
  const { name, fileName } = media || {};

  const handlePress = useCallback(() => onPress(media), [media, onPress]);

  return (
    <View style={[tw`mt-2 p-5px pl-4 bg-grayscale-bg rounded-1 items-center flex-row`, containerStyle]}>
      <View style={tw`flex-1 flex-row items-center `}>
        <ClipSVG width={20} height={20} />
        <Text numberOfLines={1} style={tw`text-13px mx-2 flex-1`}>
          {name || fileName || 'Tài liệu đính kèm'}
        </Text>
      </View>
      <TouchableOpacity style={tw`bg-primary py-7px px-4 rounded-1`} onPress={handlePress}>
        <Text style={tw`font-semibold text-3 text-grayscale-black`}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
