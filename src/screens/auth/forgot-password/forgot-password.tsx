import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@rneui/themed';
import { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';
import { showMessage } from 'react-native-flash-message';

import { ErrorBox, TextInput, tw } from '../../../components';
import { usePartnerForgotPasswordMutation } from '../../../graphql/mutations/partnerForgotPassword.generated';
import { REGEXP, extractGraphQLErrorMessage } from '../../../helpers';
import { AppRoutes, AuthStackNavigatorParamList } from '../../../navigator-params';

type FormData = {
  credential: string;
};

type ScreenNavigationProp = StackNavigationProp<AuthStackNavigatorParamList>;

export const ForgotPasswordScreen = memo(() => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [isFocused, setIsFocused] = useState(false);
  // const [generateNewPassword, { loading: isGeneratingNewPassword, error: generatePasswordError }] = useSendOtpMutation({
  //   onCompleted: () => navigation.popToTop(),
  // });
  const handleFocus = () => {
    setIsFocused(true);
  };

  const [requestForgotPassword, { loading, error }] = usePartnerForgotPasswordMutation({
    onError(errors) {
      showMessage({
        message: 'Đã có lỗi xảy ra',
        description: errors?.message,
      });
    },
    onCompleted: (resp) => {
      if (resp.partnerForgotPassword) {
        const sendtoMail = REGEXP.email.test(credential);
        navigation.navigate(AppRoutes.RESET_PASSWORD_SUCCESS, { sendtoMail });
      }
    },
  });

  const { control, handleSubmit: onSubmit, watch } = useForm<FormData>({});
  const { credential } = watch();

  // const [isNonExistedCredential, setIsNonExistedCredential] = useState(false);
  // useEffect(() => {
  //   if (isNonExistedCredential) {
  //     setIsNonExistedCredential(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [credential]);

  const credentialValidationSchema = useMemo(
    () => z.union([z.string().startsWith('0').regex(REGEXP.phone), z.string().regex(REGEXP.email)]),
    [],
  );

  const isValidCredential = useMemo(
    () => credentialValidationSchema.safeParse(credential).success === true,
    [credential, credentialValidationSchema],
  );

  const handleRequestPassword = useCallback(async () => {
    await requestForgotPassword({
      variables: {
        input: {
          emailOrPhone: credential,
        },
      },
    });
  }, [credential, requestForgotPassword]);

  return (
    <View style={tw`flex-1 px-24px mt-24px`}>
      {error && <ErrorBox message={extractGraphQLErrorMessage(error)} containerStyle={tw`mb-8px`} />}

      <View>
        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={(val) => onChange(val.trim())}
              onBlur={onBlur}
              onFocus={handleFocus}
              clearButtonMode="while-editing"
              errorMessage={
                !value
                  ? undefined
                  : isFocused && isValidCredential !== true
                  ? 'Số điện thoại hoặc email chưa đúng định dạng'
                  : undefined
              }
              placeholder="Nhập số điện thoại hoặc email"
              autoCapitalize="none"
            />
          )}
          name="credential"
        />
      </View>
      <Button disabled={!isValidCredential || loading} loading={loading} onPress={onSubmit(handleRequestPassword)}>
        Tiếp theo
      </Button>
    </View>
  );
});
