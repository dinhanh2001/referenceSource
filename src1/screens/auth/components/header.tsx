import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthStackNavigatorParamList } from '../../../navigator-params';
import { LogoPrimarySVG } from '../../../svg';

export const Header = memo(() => {
  const route = useRoute<RouteProp<AuthStackNavigatorParamList>>();

  return (
    <View style={styles.root}>
      <LogoPrimarySVG width={70} height={70} />
      <Text style={styles.title}>{route.name === 'login' ? 'Đăng nhập' : 'Đăng ký'}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 32,
    marginTop: 16,
  },
});
