import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Text } from '@rneui/themed';
import { memo } from 'react';
import { View } from 'react-native';

import { tw } from '../../../components';
import { useBackHandler } from '../../../hooks';
import { AuthStackNavigatorParamList } from '../../../navigator-params';
import { Sent } from '../../../svg';

type ScreenNavigationProp = StackNavigationProp<AuthStackNavigatorParamList>;

export const FreelancerRegisterSuccessScreen = memo(() => {
  const navigation = useNavigation<ScreenNavigationProp>();

  useBackHandler(() => {
    navigation.popToTop();
    return true;
  });

  return (
    <View style={tw`flex-1 align-center px-24px`}>
      <Sent width={54} height={54} style={tw`self-center`} />
      <Text style={tw`mt-12px mb-24px text-14px text-[#676E72] text-center`}>
        Tạo tài khoản thành công. Tài khoản của bạn đang chờ Admin của hệ thống duyệt
      </Text>
      <View style={tw`self-stretch`}>
        <Button onPress={() => navigation.popToTop()}>Về trang Đăng nhập</Button>
      </View>
    </View>
  );
});
