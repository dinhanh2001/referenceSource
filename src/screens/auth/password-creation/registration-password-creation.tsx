import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Text } from '@rneui/themed';
import { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { ErrorBox, KeyboardAwareScrollViewComponent, TextInput, tw } from '../../../components';
import { useOverlay } from '../../../contexts';
import { REGEXP, extractGraphQLErrorMessage } from '../../../helpers';
import { useBackHandler } from '../../../hooks';
import { AuthStackNavigatorParamList, AppRoutes } from '../../../navigator-params';
import { Sent, TickCircle } from '../../../svg';
import { useRegisterFreelancerTechnicianMutation } from '../../../graphql/mutations/registerFreelancerTechnician.generated';

type ScreenRouteProp = RouteProp<AuthStackNavigatorParamList, AppRoutes.REGISTRATION_PASSWORD_CREATION>;
type ScreenNavigationProp = StackNavigationProp<AuthStackNavigatorParamList>;

export const RegistrationPasswordCreationScreen = memo(() => {
  const { params: routeParams } = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();

  const [password, setPassword] = useState<string>();
  const isMinValid = useMemo(() => password != null && password.length >= 6, [password]);
  const isFormatValid = useMemo(() => password?.match(REGEXP.at_least_one_number_and_one_letter), [password]);
  const isNotIncludeSpace = useMemo(() => password?.indexOf(' ') === -1, [password]);

  const { showDialog } = useOverlay();

  const [registerFreelancer, { error, loading }] = useRegisterFreelancerTechnicianMutation({
    onCompleted: async () => {
      await showDialog({
        type: 'ALERT',
        icon: (
          <View>
            <Sent />
          </View>
        ),
        title: 'Tạo tài khoản thành công',
        message: '',
      });
      navigation.popToTop();
    },
  });

  useBackHandler(() => true);

  const handleRegister = useCallback(() => {
    if (password) {
      const { address, ...rest } = routeParams;

      registerFreelancer({
        variables: {
          input: {
            ...rest,
            password,
            latitude: address.lat,
            longitude: address.lng,
            mapAddress: address.mapAddress,
          },
        },
      });
    }
  }, [password, registerFreelancer, routeParams]);

  const isPasswordValid = useMemo(
    () => isMinValid && isFormatValid && isNotIncludeSpace,
    [isFormatValid, isMinValid, isNotIncludeSpace],
  );

  return (
    <View style={tw`flex-1 justify-between`}>
      <View style={tw`px-24px`}>
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
          {error && <ErrorBox message={extractGraphQLErrorMessage(error)} containerStyle={tw`mb-8px`} />}
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
      </View>

      <KeyboardAwareScrollViewComponent style={tw`mx-24px my-8px`}>
        <Button disabled={!isPasswordValid || loading} loading={loading} onPress={handleRegister}>
          Xác nhận
        </Button>
      </KeyboardAwareScrollViewComponent>
    </View>
  );
});
