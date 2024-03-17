import { View, Text, TouchableOpacity, LayoutAnimation, StyleProp, ViewStyle } from 'react-native';
import React, { useState } from 'react';

import { tw } from '../../tw';
import { Space } from '../../spacer';
import { ArrowDown, ArrowUp } from '../../../svg';

type Props = {
  title: string;
  right?: React.ReactNode;
  data: string[];
  collapse?: boolean;
  onPress?: (val: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  min?: number;
};

export const ECommerceSearchSection = ({
  title,
  right,
  data,
  collapse = false,
  onPress,
  containerStyle,
  min = 5,
}: Props) => {
  const [toggleCollapse, _setToggleCollapse] = useState(collapse);

  const onToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    _setToggleCollapse(!toggleCollapse);
  };

  const renderItem = (item: string, idx: number) => (
    <TouchableOpacity key={idx} onPress={() => onPress?.(item)}>
      <Text style={tw`my-12px`}>{item}</Text>
      <Space size={1} backgroundColor={'#EEE'} />
    </TouchableOpacity>
  );

  if (data?.length === 0) return null;

  return (
    <View style={containerStyle}>
      <View style={tw`flex-row justify-between items-center mb-1`}>
        <Text style={tw`font-semibold`}>{title}</Text>
        {right}
      </View>
      {data?.slice?.(0, toggleCollapse ? 3 : undefined)?.map?.(renderItem)}
      {collapse && min < data?.length && (
        <TouchableOpacity style={tw`flex-row mt-3 items-center`} onPress={onToggle}>
          <Text style={tw`text-12px text-grayscale-gray mr-1`}>{toggleCollapse ? 'Nhiều hơn' : 'Ít hơn'}</Text>
          {toggleCollapse ? <ArrowDown /> : <ArrowUp />}
        </TouchableOpacity>
      )}
    </View>
  );
};
