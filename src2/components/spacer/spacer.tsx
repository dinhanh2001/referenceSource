import React, { memo } from 'react';
import { ColorValue, View, ViewProps } from 'react-native';
import { ClassInput } from 'twrnc/dist/esm/types';

import { tw } from '../tw';

interface SpaceProps {
  size?: number;
  horizontal?: boolean;
  backgroundColor?: ColorValue;
}

export const Space: React.FC<SpaceProps & ViewProps> = memo(
  ({ size = 16, horizontal, backgroundColor, style, ...props }: SpaceProps & ViewProps) => {
    const calculatedStyle = horizontal ? { width: size, backgroundColor } : { height: size, backgroundColor };
    return <View {...props} style={tw.style(calculatedStyle, style as ClassInput)} />;
  },
);
