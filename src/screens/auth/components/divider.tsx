import { RouteProp, useRoute } from '@react-navigation/native';
import { Divider, Text } from '@rneui/themed';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthStackNavigatorParamList, AppRoutes } from '../../../navigator-params';
import { tw } from '../../../components';

export const AuthDivider = memo(() => {
  const route = useRoute<RouteProp<AuthStackNavigatorParamList>>();

  return (
    <View style={styles.divider}>
      <Divider style={styles.dividerBar} />
      <Text style={[styles.dividerText, tw`text-grayscale-gray`]}>
        {route.name === AppRoutes.LOGIN ? 'Hoặc đăng nhập bằng' : 'Hoặc đăng kí bằng'}
      </Text>
      <Divider style={styles.dividerBar} />
    </View>
  );
});

const styles = StyleSheet.create({
  divider: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 24,
  },
  dividerBar: {
    flex: 1,
  },
  dividerText: {
    fontSize: 13,
    marginHorizontal: 16,
  },
});
