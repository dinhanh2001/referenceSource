import React, { memo } from 'react';
import { View, Text, ViewStyle, TextStyle, StyleProp, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { tw } from '../tw';
import { ArrowLeftSVG } from '../../svg';
import { hitSlop } from '../../helpers';

type Props = {
  backButtonShown?: boolean;
  title?: string;
  rightView?: React.ReactNode;
  centerView?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  titlePosition?: 'center';
  leftIcon?: React.ReactNode;
  numberOfLines?: number;
};

export const AppHeader = memo(
  ({
    backButtonShown = true,
    title,
    rightView,
    containerStyle,
    titlePosition,
    titleStyle,
    leftIcon,
    centerView,
    numberOfLines,
  }: Props) => {
    const navigation = useNavigation();

    return (
      <View
        style={[
          tw`flex-row items-center px-16px py-10px`,
          titlePosition === 'center' && tw`justify-between`,
          containerStyle,
        ]}
      >
        {backButtonShown && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={tw`mr-16px`}
            hitSlop={hitSlop(6)}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          >
            {leftIcon ?? <ArrowLeftSVG />}
          </TouchableOpacity>
        )}
        {centerView}
        {!!title && (
          <Text
            numberOfLines={numberOfLines}
            style={[tw`px-16px text-17px font-semibold`, titlePosition !== 'center' && tw`flex-1`, titleStyle]}
          >
            {title}
          </Text>
        )}
        {rightView ?? (titlePosition === 'center' && <View style={tw`w-24px`} />)}
      </View>
    );
  },
);
