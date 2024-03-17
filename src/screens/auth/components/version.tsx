import { Text, TextProps } from '@rneui/themed';
import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { tw } from '../../../components';
import { getAppVersion } from '../../../helpers';

type Props = TextProps;

export const AppVersionText = memo(({ style, ...props }: Props) => {
  return (
    <Text style={[styles.version, style, tw`text-grayscale-gray`]} {...props}>
      Phiên bản ứng dụng v{getAppVersion()}
    </Text>
  );
});

const styles = StyleSheet.create({
  version: {
    fontSize: 12,
    marginTop: 16,
  },
});
