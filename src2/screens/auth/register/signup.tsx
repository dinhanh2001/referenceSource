import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as zod from 'zod';

import { ErrorBox, TextInput, tw } from '../../../components';
import { useUserRegisterMutation } from '../../../graphql/mutations/userRegister.generated';
import { ActiveCodeEnum } from '../../../graphql/type.interface';
import { REGEXP, extractGraphQLErrorMessage } from '../../../helpers';
import { RootNavigatorParamList } from '../../../navigator-params';
import { Header } from '../components';

type ScreenNavigationProp = NavigationProp<RootNavigatorParamList>;

type FormData = {
  phone: string;
  email?: string;
};

export const RegisterScreen = memo(() => {
  const validationSchema = useMemo(
    () =>
      zod.object({
        phone: zod.string().regex(REGEXP.phone, 'Số điện thoại chưa đúng định dạng'),
        email: zod.string().regex(REGEXP.email, 'Email chưa đúng định dạng').optional().or(zod.literal('')),
      }),
    [],
  );

  const {
    control,
    handleSubmit: onSubmit,
    watch,
    formState: { errors, isValid: isFormValid },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    criteriaMode: 'firstError',
  });

  const { phone, email } = watch();

  const [registerUser, { loading, error: registerError }] = useUserRegisterMutation({
    onCompleted: (resp) => {
      if (resp.userRegister) {
        navigation.navigate('verifyOtp', {
          phone: phone,
          type: ActiveCodeEnum.ACTIVATE,
          email: email,
        });
      }
    },
  });

  const navigation = useNavigation<ScreenNavigationProp>();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      await registerUser({
        variables: {
          input: {
            phone: data.phone,
            email: data.email != null && data.email.length !== 0 ? data.email : undefined,
          },
        },
      });
    },
    [registerUser],
  );

  return (
    <KeyboardAwareScrollView style={tw`flex-1`}>
      <View style={styles.container}>
        <Header />
        <View style={tw`mt-24px w-full`}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onBlur, onChange } }) => (
              <TextInput
                placeholder="Số điện thoại (bắt buộc)"
                value={value}
                onBlur={onBlur}
                clearButtonMode="while-editing"
                onChangeText={onChange}
                keyboardType="numeric"
                errorMessage={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onBlur, onChange } }) => (
              <TextInput
                placeholder="Nhập email (không bắt buộc)"
                clearButtonMode="while-editing"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                // isLoading={isCheckingEmail}
              />
            )}
          />

          <Button
            title="Tiếp theo"
            onPress={onSubmit(handleSubmit)}
            disabled={!isFormValid || loading}
            loading={loading}
          />

          {registerError && (
            <ErrorBox message={extractGraphQLErrorMessage(registerError)} containerStyle={tw`mt-12px`} />
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10,
    paddingHorizontal: 24,
  },
});
