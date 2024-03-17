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

import { Checkbox, ErrorBox, TextInput, tw } from '../../../components';
import { ACCESS_TOKEN, KEYCHAIN_CREDENTIAL, REFRESH_TOKEN } from '../../../constants';
import { useAuth } from '../../../contexts';
import { usePartnerLoginMutation } from '../../../graphql/mutations/partnerLogin.generated';
import { MePartnerDocument, MePartnerQueryResponse } from '../../../graphql/queries/mePartner.generated';
import { PartnerEntity } from '../../../graphql/type.interface';
import { REGEXP, extractGraphQLErrorMessage } from '../../../helpers';
import { AuthStackNavigatorParamList, AppRoutes } from '../../../navigator-params';
import { Header } from '../components';
import { AppVersionText } from '../components/version';

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

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      remember: true,
    },
  });

  const { login: appAuthLogin, deviceId } = useAuth();

  const [loginPartner, { loading: isLoggingIn, error }] = usePartnerLoginMutation();

  const onClickSignUp = useCallback(() => {
    navigation.navigate(AppRoutes.FREELANCER_REGISTER);
  }, [navigation]);

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

  const handleLogin = useCallback(
    async ({ credential, password, remember }: FormData) => {
      await loginPartner({
        variables: {
          input: {
            email: REGEXP.email.test(credential) ? credential : undefined,
            password,
            phone: REGEXP.phone.test(credential) ? credential : undefined,
            deviceId,
          },
        },
        onCompleted: async (res) => {
          client.writeQuery<MePartnerQueryResponse>({
            query: MePartnerDocument,
            data: {
              mePartner: res.partnerLogin.partner,
            },
          });
          await AsyncStorage.setItem(ACCESS_TOKEN, res.partnerLogin.accessToken);
          await AsyncStorage.setItem(REFRESH_TOKEN, res.partnerLogin.refreshToken);

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

          appAuthLogin(res.partnerLogin.partner as PartnerEntity);
        },
      });
    },
    [appAuthLogin, client, loginPartner],
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
      <KeyboardAwareScrollView contentContainerStyle={tw`flex-grow`}>
        <View style={styles.container}>
          <Header />

          <View style={styles.formContainer}>
            <Controller
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={(val) => onChange(val.trim())}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  errorMessage={isCredentialError ? 'Số điện thoại hoặc email chưa đúng định dạng' : undefined}
                  placeholder="Nhập số điện thoại hoặc email"
                />
              )}
              name="credential"
            />
            <Controller
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={(val) => onChange(val.trim())}
                  onBlur={onBlur}
                  placeholder="Nhập mật khẩu"
                  secureTextEntry
                  toggleSecureTextIcon
                />
              )}
              name="password"
            />
            <View style={tw`self-stretch justify-between flex-row`}>
              <Controller
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Checkbox value={value} onChange={onChange} onBlur={onBlur} title="Ghi nhớ" />
                )}
                name="remember"
              />
              <Pressable onPress={() => navigation.navigate(AppRoutes.FORGOT_PASSWORD)}>
                <Text style={tw`underline`}>Quên mật khẩu?</Text>
              </Pressable>
            </View>

            {error != null && <ErrorBox message={extractGraphQLErrorMessage(error)} containerStyle={tw`my-16px`} />}

            <Button
              title="Đăng nhập"
              onPress={handleSubmit(handleLogin)}
              loading={isLoggingIn}
              disabled={isLoggingIn || !isFormValid}
              containerStyle={tw`mt-16px`}
            />
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.registerGuide}>
              <Text>Bạn là Kỹ thuật viên?</Text>
              <Pressable onPress={onClickSignUp}>
                <Text style={[styles.registerGuideText, tw`text-blue`]}>Đăng ký</Text>
              </Pressable>
            </View>
            <AppVersionText />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  bottomSection: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
});
