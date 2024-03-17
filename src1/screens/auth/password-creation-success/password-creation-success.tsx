import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Text } from '@rneui/themed';
import { memo, useEffect, useState } from 'react';
import { View } from 'react-native';

import { tw } from '../../../components';
import { useBackHandler } from '../../../hooks';
import { AuthStackNavigatorParamList } from '../../../navigator-params';
import { Sent } from '../../../svg';

type ScreenNavigationProp = StackNavigationProp<AuthStackNavigatorParamList>;

export const PasswordGenerationSuccessScreen = memo(() => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [count, setCount] = useState(5);
  const route = useRoute<RouteProp<AuthStackNavigatorParamList, 'passwordGenerationSuccess'>>();
  useBackHandler(() => {
    navigation.popToTop();
    return true;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (count === 0) {
        navigation.popToTop();
      }
      setCount((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [count, navigation]);

  return (
    <View style={tw`flex-1 items-center px-24px`}>
      <Sent width={54} height={54} style={tw`self-center`} />
      <Text style={tw`mt-24px px font-bold	text-17px text-center`}>Thành công</Text>
      <Text style={tw`mt-12px mb-24px text-14px text-[#676E72] text-center`}>{route.params.message}</Text>
      <View style={tw`self-stretch`}>
        <Button onPress={() => navigation.popToTop()}>Về trang Đăng nhập</Button>
        <Text style={tw`text-center mt-20px text-grayscale-gray text-13px`}>Tự động chuyển sau {`00:0${count}`}</Text>
      </View>
    </View>
  );
});
