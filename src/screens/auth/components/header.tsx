import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { tw } from '../../../components';
import { AuthStackNavigatorParamList, AppRoutes } from '../../../navigator-params';
import { LogoPrimarySVG } from '../../../svg';

export const Header = memo(() => {
  const route = useRoute<RouteProp<AuthStackNavigatorParamList>>();

  return (
    <View style={styles.root}>
      <LogoPrimarySVG width={70} height={70} />
      <Text style={styles.title}>{route.name === AppRoutes.LOGIN ? 'Đăng nhập' : 'Đăng ký'}</Text>
      {route.name === AppRoutes.LOGIN && <Text style={tw`mt-8px`}>Dành cho Đại lý & Kỹ thuật viên</Text>}
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
    marginTop: 24,
  },
});
