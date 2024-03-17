import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { tw } from '../tw';
import { ArrowLeftSVG } from '../../svg';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  iconColor?: string;
};

export const BackButton = React.memo(({ containerStyle, iconColor }: Props) => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tw`h-36px w-36px rounded-full bg-white items-center justify-center shadow-md`, containerStyle]}
    >
      <ArrowLeftSVG width={20} height={20} stroke={iconColor || 'black'} />
    </TouchableOpacity>
  );
});
