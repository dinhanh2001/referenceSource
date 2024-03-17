import { memo, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@rneui/themed';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ErrorBox, TextInput, tw } from '../../../components';
import { REGEXP, extractGraphQLErrorMessage } from '../../../helpers';
import { AuthStackNavigatorParamList } from '../../../navigator-params';
import { useUserForgotPasswordMutation } from '../../../graphql/mutations/userForgotPassword.generated';
import { validationMessage } from '../../../constants';

type FormData = {
  emailOrPhone: string;
};

type ScreenNavigationProp = StackNavigationProp<AuthStackNavigatorParamList>;

export const ForgotPasswordScreen = memo(() => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const credentialValidationSchema = useMemo(
    () =>
      zod.object({
        emailOrPhone: zod.union([
          zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required)
            .regex(REGEXP.email, 'Email/SĐT không đúng định dạng'),
          zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required)
            .startsWith('0', 'Email/SĐT không đúng định dạng')
            .regex(REGEXP.phone, 'Email/SĐT không đúng định dạng'),
        ]),
      }),
    [],
  );

  const {
    control,
    getValues,
    handleSubmit: onSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(credentialValidationSchema),
    mode: 'onChange',
  });

  const [requestForgotPassword, { loading, error }] = useUserForgotPasswordMutation({
    onCompleted: (resp) => {
      if (resp.userForgotPassword) {
        const message = REGEXP.email.test(getValues('emailOrPhone'))
          ? 'Mật khẩu đã được gửi về email của bạn. Vui lòng kiểm tra trong Hộp thư đến hoặc mục Spam'
          : 'Mật khẩu đã được gửi về số điện thoại của bạn. Vui lòng kiểm tra trong Tin nhắn thư đến hoặc mục Người gửi không xác định';
        navigation.navigate('passwordGenerationSuccess', { message });
      }
    },
  });

  const handleRequestPassword = useCallback(
    async ({ emailOrPhone }: FormData) => {
      await requestForgotPassword({
        variables: {
          input: {
            emailOrPhone,
          },
        },
      });
    },
    [requestForgotPassword],
  );

  return (
    <View style={tw`flex-1 justify-between px-24px mt-24px`}>
      {error && <ErrorBox message={extractGraphQLErrorMessage(error)} containerStyle={tw`mb-8px`} />}
      <View style={tw`flex-1 mt-8px`}>
        <Controller
          control={control}
          name="emailOrPhone"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              clearButtonMode="while-editing"
              errorMessage={errors?.emailOrPhone?.message}
              placeholder="Nhập số điện thoại hoặc email"
            />
          )}
        />
        <Button
          containerStyle={tw`mb-60px`}
          disabled={!isValid || loading}
          loading={loading}
          onPress={onSubmit(handleRequestPassword)}
        >
          Tiếp theo
        </Button>
      </View>
    </View>
  );
});
