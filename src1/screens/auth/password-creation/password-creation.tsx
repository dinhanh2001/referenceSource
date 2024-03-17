import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Text } from '@rneui/themed';
import { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { ErrorBox, KeyboardAwareScrollViewComponent, TextInput, tw } from '../../../components';
import { useOverlay } from '../../../contexts';
import { REGEXP, extractGraphQLErrorMessage } from '../../../helpers';
import { useBackHandler } from '../../../hooks';
import { AuthStackNavigatorParamList } from '../../../navigator-params';
import { TickCircle } from '../../../svg';
import { useCreatePasswordNewUserMutation } from '../../../graphql/mutations/createPasswordNewUser.generated';
import { phoneWithAsterisks } from '../../../utils';

type ScreenRouteProp = RouteProp<AuthStackNavigatorParamList, 'passwordCreation'>;
type ScreenNavigationProp = StackNavigationProp<AuthStackNavigatorParamList>;

export const PasswordCreationScreen = memo(() => {
  const {
    params: { phone },
  } = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();

  const [password, setPassword] = useState<string>();

  const isMinValid = useMemo(() => password != null && password.length >= 6, [password]);
  const isFormatValid = useMemo(() => password?.match(REGEXP.at_least_one_number_and_one_letter), [password]);
  const isNotIncludeSpace = useMemo(() => password?.indexOf(' ') === -1, [password]);

  const { showDialog } = useOverlay();

  const [createPasswordNewUser, { loading, error }] = useCreatePasswordNewUserMutation({
    onCompleted: async () => {
      await showDialog({
        type: 'ALERT',
        title: 'Thành công',
        message: 'Đăng ký thành công, vui lòng đăng nhập để sử dụng dịch vụ',
        confirmText: 'Về trang Đăng nhập',
      });
      navigation.popToTop();
    },
  });

  useBackHandler(() => true);

  const handleRegister = useCallback(() => {
    if (password) {
      createPasswordNewUser({
        variables: {
          input: {
            password: password,
            phone: phone,
          },
        },
      });
    }
  }, [createPasswordNewUser, password, phone]);

  const isPasswordValid = useMemo(
    () => isMinValid && isFormatValid && isNotIncludeSpace,
    [isFormatValid, isMinValid, isNotIncludeSpace],
  );

  return (
    <View style={tw`flex-1 justify-between`}>
      <View style={tw`px-24px`}>
        <Text style={tw`text-center px-30px`}>
          Tạo mật khẩu đăng nhập cho số điện thoại <Text style={tw`font-bold`}>{phoneWithAsterisks(phone)}</Text>
        </Text>
        <View style={tw`mt-24px`}>
          <TextInput
            inputContainerStyle={tw`mb-0`}
            placeholder="Nhập mật khẩu"
            value={password}
            clearButtonMode="while-editing"
            onChangeText={setPassword}
            secureTextEntry
            toggleSecureTextIcon
          />
        </View>

        <View style={tw`-mt-12px`}>
          <Text style={tw`text-12px text-[#676773]`}> Mật khẩu được tạo hợp lệ bao gồm</Text>
          <View style={tw`flex items-center flex-row`}>
            <TickCircle
              fill={isMinValid ? tw.color('status-success') : tw.color('grayscale-disabled')}
              style={tw`mr-4px`}
            />
            <Text style={tw`text-12px text-[#676773]`}>Tối thiểu 6 ký tự</Text>
          </View>
          <View style={tw`flex items-center flex-row`}>
            <TickCircle
              fill={isFormatValid ? tw.color('status-success') : tw.color('grayscale-disabled')}
              style={tw`mr-4px`}
            />
            <Text style={tw`text-12px text-[#676773]`}>Bao gồm chữ cái và số</Text>
          </View>
          <View style={tw`flex items-center flex-row`}>
            <TickCircle
              fill={isNotIncludeSpace ? tw.color('status-success') : tw.color('grayscale-disabled')}
              style={tw`mr-4px`}
            />
            <Text style={tw`text-12px text-[#676773]`}>Không chứ khoảng trắng</Text>
          </View>
        </View>

        {error && <ErrorBox message={extractGraphQLErrorMessage(error)} containerStyle={tw`mt-8px bg-rose-100`} />}
      </View>

      <KeyboardAwareScrollViewComponent>
        <Button style={tw`px-24px`} disabled={!isPasswordValid || loading} loading={loading} onPress={handleRegister}>
          Xác nhận
        </Button>
      </KeyboardAwareScrollViewComponent>
    </View>
  );
});
