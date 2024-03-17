import { memo } from 'react';
import { View } from 'react-native';

import { tw } from '../tw';

import { ActivityIndicator } from './loading-indicator';

export const LoadingScreen = memo(() => {
  return (
    <View style={tw`flex-row justify-center items-center h-300px`}>
      <ActivityIndicator />
    </View>
  );
});
