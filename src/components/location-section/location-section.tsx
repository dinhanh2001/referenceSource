import { Text } from '@rneui/themed';
import React, { memo } from 'react';
import { View } from 'react-native';

import { LocationSVG } from '../../svg';
import { Space } from '../spacer';
import { tw } from '../tw';

type Prop = {
  location: string;
};

export const LocationSection = memo(({ location }: Prop) => {
  return (
    <View style={tw`bg-grayscale-bg rounded-md flex-row px-3 py-2`}>
      <LocationSVG />
      <Space horizontal size={12} />
      <Text numberOfLines={1} style={tw`flex-1`}>
        {location}
      </Text>
    </View>
  );
});
