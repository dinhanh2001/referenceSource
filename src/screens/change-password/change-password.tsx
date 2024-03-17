import { View, Text } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@rneui/themed';
import * as zod from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePartnerUpdatePasswordMutation } from '../../graphql/mutations/partnerUpdatePassword.generated';
import { AppHeader, Screen, TextInput, tw } from '../../components';
import { REGEXP, extractGraphQLErrorMessage } from '../../helpers';
import { TickCircle } from '../../svg';
import { useAuth, useOverlay } from '../../contexts';
import { validationMessage } from '../../constants';

type FormData = {
  oldPassword: string;
  confirmPassword: string;
  newPassword: string;
};

export const ChangePassword = () => {
  const { showDialog } = useOverlay();

  const { logout } = useAuth();

  const [changePwAsync, { loading: changing }] = usePartnerUpdatePasswordMutation({
    onError: async (err) => {
      await showDialog({
        type: 'ALERT',
        title: 'Đổi mật khẩu thất bại!',
        message: extractGraphQLErrorMessage(err),
      });
    },
    onCompleted: async () => {
      await showDialog({
        type: 'ALERT',
        title: 'Đổi mật khẩu thành công!',
        message: 'Bạn cần đăng nhập lại với mật khẩu mới để tiếp tục sử dụng CALLME App',
      });
      logout();
    },
  });

  const validationSchema: zod.ZodType<FormData> = useMemo(
    () =>
      zod
        .object({
          oldPassword: zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required)
            .min(6, 'Mật khẩu cũ tối thiểu 6 ký tự'),
          newPassword: zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required)
            .min(6, 'Mật khẩu mới tối thiểu 6 ký tự')
            .regex(REGEXP.at_least_one_number_and_one_letter, 'Mật khẩu mới bao gồm chữ cái và số')
            .refine((value: string) => {
              const isExistTrim = value.search(' ');
              if (isExistTrim > 0) return false;
              return true;
            }, 'Mật khẩu mới không chứ khoảng trắng'),
          confirmPassword: zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required)
            .min(6, 'Mật khẩu mới tối thiểu 6 ký tự')
            .regex(REGEXP.at_least_one_number_and_one_letter, 'Mật khẩu mới bao gồm chữ cái và số'),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
          message: 'Mật khẩu xác nhận không trùng khớp',
          path: ['confirmPassword'],
        }),
    [],
  );

  const {
    getValues,
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {},
  });
  const newPw = getValues('newPassword');

  const onSubmit = useCallback(
    async ({ oldPassword, newPassword }: FormData) => {
      await changePwAsync({ variables: { input: { oldPassword, newPassword } } });
    },
    [changePwAsync],
  );

  return (
    <Screen>
      <AppHeader title="Đổi mật khẩu" />
      <KeyboardAwareScrollView contentContainerStyle={tw`grow py-28px px-16px`}>
        <>
          <Text style={tw`text-14px font-medium mb-8px`}>
            <Text style={tw`text-error`}>* </Text> Mật khẩu cũ
          </Text>
          <Controller
            name="oldPassword"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                placeholder="Nhập mật khẩu cũ"
                value={value}
                onBlur={onBlur}
                clearButtonMode="while-editing"
                onChangeText={onChange}
                secureTextEntry
                toggleSecureTextIcon
                errorMessage={errors.oldPassword?.message}
              />
            )}
          />
        </>

        <>
          <Text style={tw`text-14px font-medium mb-8px`}>
            <Text style={tw`text-error`}>* </Text>Mật khẩu mới
          </Text>
          <Controller
            name="newPassword"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                placeholder="Nhập mật khẩu mới"
                value={value}
                clearButtonMode="while-editing"
                onChangeText={onChange}
                secureTextEntry
                onBlur={onBlur}
                toggleSecureTextIcon
                errorMessage={errors.newPassword?.message}
              />
            )}
          />
        </>

        <Text style={tw`text-12px my-8px text-[#676773]`}> Mật khẩu được tạo hợp lệ bao gồm</Text>
        <View style={tw`flex items-center flex-row mb-6px`}>
          <TickCircle
            fill={
              newPw && !(errors.newPassword?.type === 'too_small')
                ? tw.color('status-success')
                : tw.color('grayscale-disabled')
            }
            style={tw`mr-4px`}
          />
          <Text style={tw`text-12px text-[#676773]`}>Tối thiểu 6 ký tự</Text>
        </View>
        <View style={tw`flex items-center flex-row mb-6px`}>
          <TickCircle
            fill={
              newPw && !(errors.newPassword?.type === 'invalid_string')
                ? tw.color('status-success')
                : tw.color('grayscale-disabled')
            }
            style={tw`mr-4px`}
          />
          <Text style={tw`text-12px text-[#676773]`}>Bao gồm chữ cái và số</Text>
        </View>
        <View style={tw`flex items-center flex-row mb-6px`}>
          <TickCircle
            fill={
              newPw && !(errors.newPassword?.type === 'custom')
                ? tw.color('status-success')
                : tw.color('grayscale-disabled')
            }
            style={tw`mr-4px`}
          />
          <Text style={tw`text-12px text-[#676773]`}>Không chứ khoảng trắng</Text>
        </View>

        <>
          <Text style={tw`text-14px font-medium mt-26px mb-8px`}>
            <Text style={tw`text-error`}>* </Text>Xác nhận mật khẩu
          </Text>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                placeholder="Xác nhận mật khẩu mới"
                value={value}
                clearButtonMode="while-editing"
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                toggleSecureTextIcon
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />
        </>
        <View style={tw`flex-1 justify-end`}>
          <Button title="Lưu" onPress={handleSubmit(onSubmit)} disabled={!isValid} loading={changing} />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
