import { memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from '@rneui/themed';

import { tw } from '../tw';
import { CloseCircleSVG } from '../../svg';

type Props = {
  message: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ErrorBox = memo(({ message, containerStyle }: Props) => {
  return (
    <View style={[tw`py-12px px-16px rounded-4px bg-status-error flex-row items-center w-full`, containerStyle]}>
      <CloseCircleSVG style={tw`mr-12px`} />
      <Text style={tw`text-13px flex-shrink`}>{message}</Text>
    </View>
  );
});
