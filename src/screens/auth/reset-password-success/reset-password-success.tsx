import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@rneui/themed';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tw } from '../../../components';
import { useBackHandler } from '../../../hooks';
import { AppRoutes, AuthStackNavigatorParamList } from '../../../navigator-params';
import { Sent } from '../../../svg';

type ScreenNavigationProp = StackNavigationProp<AuthStackNavigatorParamList>;
type ScreenRouteProp = RouteProp<AuthStackNavigatorParamList, AppRoutes.RESET_PASSWORD_SUCCESS>;

export const ResetPasswordSuccessScreen = memo(() => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    params: { sendtoMail },
  } = useRoute<ScreenRouteProp>();

  useBackHandler(() => {
    navigation.popToTop();
    return true;
  });

  return (
    <SafeAreaView style={tw`flex-1 align-center px-24px`}>
      <Sent width={54} height={54} style={tw`self-center`} />
      <Text style={tw`mt-24px px font-bold	text-17px text-center`}>Thành công</Text>
      <Text style={tw`mt-12px mb-24px text-14px text-[#676E72] text-center`}>
        {sendtoMail
          ? 'Mật khẩu đã được gửi về email của bạn. Vui lòng kiểm tra trong Hộp thư đến hoặc mục Spam'
          : 'Mật khẩu đã được gửi về số điện thoại của bạn. Vui lòng kiểm tra trong tin nhắn'}
      </Text>
      <View style={tw`self-stretch`}>
        <Button onPress={() => navigation.popToTop()}>Về trang Đăng nhập</Button>
      </View>
    </SafeAreaView>
  );
});
