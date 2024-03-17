import { useApolloClient } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import * as SecureStore from 'expo-secure-store';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { ErrorBox, TextInput, tw } from '../../../components';
import { ACCESS_TOKEN, KEYCHAIN_CREDENTIAL, OTP_SIGN_UP_BLOCKED_TIME, REFRESH_TOKEN } from '../../../constants';
import { useAuth, useOverlay } from '../../../contexts';
import { SocialLoginMutationResponse } from '../../../graphql/mutations/socialLogin.generated';
import { useUserLoginMutation } from '../../../graphql/mutations/userLogin.generated';
import { MeUserDocument, MeUserQueryResponse } from '../../../graphql/queries/meUser.generated';
import { UserEntity } from '../../../graphql/type.interface';
import { REGEXP, extractGraphQLErrorMessage } from '../../../helpers';
import { AuthStackNavigatorParamList } from '../../../navigator-params';
import { AuthDivider, Header, SocialAuthOptions } from '../components';
import { AppVersionText } from '../components/version';

import { BiometricButton } from './biometric-button';

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  return await SecureStore.getItemAsync(key);
}

type FormData = {
  credential: string;
  password: string;
  remember: boolean;
};

export const LoginScreen = memo(() => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigatorParamList>>();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { dirtyFields },
  } = useForm<FormData>({
    defaultValues: {
      remember: true,
    },
  });

  const { login: appAuthLogin, deviceId } = useAuth();

  const [loginApollo, { loading: isLoggingIn, error }] = useUserLoginMutation();

  const { showDialog } = useOverlay();

  const onClickSignUp = useCallback(async () => {
    const wrongOTPCountSignUpBlockTime = await AsyncStorage.getItem(OTP_SIGN_UP_BLOCKED_TIME);

    if (wrongOTPCountSignUpBlockTime != null) {
      const disableTime = new Date(wrongOTPCountSignUpBlockTime).getTime();
      const timeLeft = Math.floor((disableTime - new Date().getTime()) / 1000);
      if (timeLeft > 0) {
        await showDialog({
          type: 'ALERT',
          title: 'Thông báo',
          message: `Bạn đã bị hạn chế đăng ký trong 2 phút, vui lòng thử đăng ký lại sau`,
        });
        return;
      }
    }
    navigation.navigate('register');
  }, [navigation, showDialog]);

  useEffect(() => {
    (async () => {
      const credential = await getValueFor(KEYCHAIN_CREDENTIAL);

      if (credential) {
        const result = JSON.parse(credential);
        setValue('credential', result?.credential);
        setValue('password', result?.password);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const client = useApolloClient();

  const internalLogin = useCallback(
    async (user: UserEntity, accessToken: string, refreshToken: string) => {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);

      client.writeQuery<MeUserQueryResponse>({
        query: MeUserDocument,
        data: {
          meUser: user,
        },
      });

      appAuthLogin(user);
    },
    [appAuthLogin, client],
  );

  const handleLogin = useCallback(
    async ({ credential, password, remember }: FormData) => {
      await loginApollo({
        variables: {
          input: {
            email: REGEXP.email.test(credential) ? credential : undefined,
            password,
            phone: REGEXP.phone.test(credential) ? credential : undefined,
            deviceId,
          },
        },
        onCompleted: async (res) => {
          if (remember) {
            if (password && credential) {
              save(
                KEYCHAIN_CREDENTIAL,
                JSON.stringify({
                  credential,
                  password,
                }),
              );
            }
          } else {
            await SecureStore.deleteItemAsync(KEYCHAIN_CREDENTIAL);
          }
          await internalLogin(res.userLogin.user as UserEntity, res.userLogin.accessToken, res.userLogin.refreshToken);
        },
      });
    },
    [deviceId, internalLogin, loginApollo],
  );

  const handleSocialLogin = useCallback(
    async (data: SocialLoginMutationResponse) => {
      await internalLogin(
        data.socialLogin.user as UserEntity,
        data.socialLogin.accessToken,
        data.socialLogin.refreshToken,
      );
    },
    [internalLogin],
  );

  const { password, credential } = watch();

  const credentialValidationSchema = useMemo(
    () => z.union([z.string().startsWith('0').regex(REGEXP.phone), z.string().regex(REGEXP.email)]).optional(),
    [],
  );

  const isCredentialError = useMemo(
    () => credentialValidationSchema.safeParse(credential).success !== true,
    [credential, credentialValidationSchema],
  );

  const isFormValid = useMemo(
    () => !isCredentialError && password != null && password.length,
    [isCredentialError, password],
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <KeyboardAwareScrollView contentContainerStyle={tw`flex-1`}>
        <View style={styles.container}>
          <Header />

          <View style={styles.formContainer}>
            <Controller
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  maxLength={255}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={
                    dirtyFields.credential
                      ? !credential?.length
                        ? 'Vui lòng điền đầy đủ thông tin.'
                        : isCredentialError
                        ? 'Số điện thoại hoặc email chưa đúng định dạng'
                        : undefined
                      : undefined
                  }
                  clearButtonMode="while-editing"
                  placeholder="Nhập số điện thoại hoặc email"
                  autoCapitalize="none"
                />
              )}
              name="credential"
            />
            <Controller
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Nhập mật khẩu"
                  secureTextEntry
                  toggleSecureTextIcon
                />
              )}
              name="password"
            />
            <View style={tw`justify-end flex-row`}>
              {/* <Controller
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Checkbox value={value} onChange={onChange} onBlur={onBlur} title="Ghi nhớ" />
                )}
                name="remember"
              /> */}
              <Pressable onPress={() => navigation.navigate('forgotPassword')}>
                <Text style={tw`underline`}>Quên mật khẩu?</Text>
              </Pressable>
            </View>

            <View style={tw`mt-16px flex-row justify-between`}>
              <Button
                title="Đăng nhập"
                onPress={handleSubmit(handleLogin)}
                loading={isLoggingIn}
                disabled={isLoggingIn || !isFormValid}
                containerStyle={tw`flex-grow`}
              />
              <BiometricButton onLogin={internalLogin} />
            </View>

            {error != null && (
              <ErrorBox message={extractGraphQLErrorMessage(error)} containerStyle={tw`my-16px bg-rose-100`} />
            )}

            <AuthDivider />

            <SocialAuthOptions onLogin={handleSocialLogin} />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.registerGuide}>
          <Text>Chưa có tài khoản?</Text>
          <Pressable onPress={onClickSignUp}>
            <Text style={styles.registerGuideText}>Đăng ký</Text>
          </Pressable>
        </View>
        <AppVersionText />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  bottomSection: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  container: {
    // alignItems: 'center',
    flex: 1,
    // justifyContent: 'center',
    paddingBottom: 10,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  formContainer: {
    marginVertical: 24,
    width: '100%',
  },
  registerGuide: {
    flexDirection: 'row',
  },
  registerGuideText: {
    color: tw.color('blue'),
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
});
