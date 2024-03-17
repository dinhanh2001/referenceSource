import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as zod from 'zod';

import { AppHeader, DeleteAccount, Screen, TextInput, UploadImage, tw } from '../../components';
import { validationMessage } from '../../constants';
import { useFullScreenLoading } from '../../contexts';
import { useUpdateUserInfoMutation } from '../../graphql/mutations/updateUserInfo.generated';
import { MeUserDocument, useMeUserQuery } from '../../graphql/queries/meUser.generated';
import { useUserCheckEmailOrPhoneIsUsedLazyQuery } from '../../graphql/queries/userCheckEmailOrPhoneIsUsed.generated';
import { REGEXP, showFlashMessageError } from '../../helpers';
import { useUploadImage } from '../../hooks';
import { AppStackNavigatorParamList, RootNavigatorParamList } from '../../navigator-params';
import { ArrowRight, LockSvg } from '../../svg';

import { BiometricLogin } from './biometric-login';
import { ConnectSocialAccount } from './connect-social-account';

type FormData = {
  avatarId?: string;
  fullname: string;
  phone: string;
  email: string;
  linkedGoogle: boolean;
  linkedFb: boolean;
  linkedApple: boolean;
  file?: ImagePicker.ImagePickerAsset;
};

export const AccountEditting = React.memo(
  ({ navigation }: NativeStackScreenProps<AppStackNavigatorParamList & RootNavigatorParamList, 'account-editting'>) => {
    const [checkInfoUser, { loading: checking }] = useUserCheckEmailOrPhoneIsUsedLazyQuery({});

    const { data: user } = useMeUserQuery({ fetchPolicy: 'cache-and-network', onError: showFlashMessageError });

    const validationSchema = useMemo(
      () =>
        zod.object({
          file: zod.any().optional(),
          avatarId: zod.string().optional(),
          phone: zod
            .string({ required_error: validationMessage.required })
            .startsWith('0')
            .regex(REGEXP.phone)
            .nonempty({ message: validationMessage.required }),
          fullname: zod
            .string({ required_error: validationMessage.required })
            .nonempty({ message: validationMessage.required }),
          email: zod
            .string({ required_error: validationMessage.required })
            .nonempty({ message: validationMessage.required })
            .regex(REGEXP.email, { message: 'Email không đúng định dạng' })
            .refine(async (email) => {
              const res = await checkInfoUser({
                variables: {
                  input: {
                    email: email.trim(),
                    userId: user?.meUser.id,
                  },
                },
              });

              return !res.data?.userCheckEmailOrPhoneIsUsed;
            }, 'Email đã tồn tại'),
        }),
      [checkInfoUser, user?.meUser.id],
    );
    const { showFullscreenLoading } = useFullScreenLoading();
    const { uploadImage } = useUploadImage();

    const [updateUserInfo, { loading }] = useUpdateUserInfoMutation({
      onError: showFlashMessageError,
    });
    const {
      control,
      handleSubmit,
      setValue,
      trigger,
      formState: { errors },
    } = useForm<FormData>({
      defaultValues: {
        avatarId: user?.meUser?.avatar?.fullThumbUrl ?? undefined,
        fullname: user?.meUser?.fullname || '',
        phone: user?.meUser?.phone || '',
        email: user?.meUser?.email || '',
      },
      mode: 'onChange',
      criteriaMode: 'firstError',
      resolver: zodResolver(validationSchema),
    });

    const onSubmit = useCallback(
      async ({ file, fullname, email }: FormData) => {
        try {
          const media = file != null ? await uploadImage(file) : null;

          const input = {
            avatarId: media?.id ?? user?.meUser?.avatar?.id,
            fullname,
            email,
          };

          await updateUserInfo({
            variables: { input },
            refetchQueries: [MeUserDocument],
          });
          showMessage({
            message: 'Thay đổi thông tin thành công',
            type: 'success',
          });
          navigation.goBack();
        } catch (error) {
          showMessage({
            message: 'Có lỗi xảy ra',
            type: 'danger',
          });
        }
      },
      [navigation, updateUserInfo, uploadImage, user?.meUser?.avatar?.id],
    );

    const onChangePW = useCallback(() => {
      navigation.navigate('change-password');
    }, [navigation]);

    useEffect(() => {
      showFullscreenLoading(loading);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Chỉnh sửa tài khoản" />
        <KeyboardAwareScrollView
          contentContainerStyle={tw`py-28px px-16px`}
          scrollIndicatorInsets={{ right: 1 }}
          keyboardShouldPersistTaps={'handled'}
        >
          <Controller
            name="avatarId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <UploadImage
                rounded
                errorMessage={errors.avatarId?.message}
                onChange={([asset]) => {
                  if (asset.uri) {
                    onChange(asset.uri);
                    setValue('file', asset);
                    trigger('avatarId');
                  }
                }}
                value={value}
              />
            )}
          />
          <Controller
            name="fullname"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                maxLength={255}
                containerStyle={tw`mt-28px mb-16px`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Tên"
                clearButtonMode="while-editing"
                borderVisibleIfValue={false}
                renderErrorMessage={!!errors.fullname}
                errorMessage={errors.fullname !== undefined ? 'Tên là trường bắt buộc' : undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onBlur, onChange } }) => (
              <TextInput
                placeholder="Số điện thoại (bắt buộc)"
                containerStyle={tw`mb-16px`}
                value={value}
                maxLength={10}
                editable={false}
                onBlur={onBlur}
                keyboardType="phone-pad"
                clearButtonMode="while-editing"
                onChangeText={onChange}
                borderVisibleIfValue={false}
                renderErrorMessage={!!errors.phone}
                inputContainerStyle={tw`bg-gray-100`}
                errorMessage={
                  errors.phone !== undefined
                    ? 'Định dạng số điện thoại phải gồm 10 kí tự số và bắt đầu bằng số 0'
                    : undefined
                }
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                value={value}
                containerStyle={tw`mb-16px`}
                onChangeText={onChange}
                onBlur={onBlur}
                maxLength={255}
                placeholder="Email"
                clearButtonMode="while-editing"
                borderVisibleIfValue={false}
                renderErrorMessage={!!errors.email}
                errorMessage={errors.email?.message}
                isLoading={checking}
                autoCapitalize="none"
              />
            )}
          />
          <TouchableOpacity
            onPress={onChangePW}
            style={tw`flex-row items-center border border-grayscale-border rounded px-10px py-16px`}
          >
            <LockSvg width={16} height={16} />
            <Text style={tw`flex-1 mx-16px text-grayscale-black`}>Đổi mật khẩu </Text>
            <ArrowRight width={10} height={12} />
          </TouchableOpacity>

          <View style={tw`mt-32px`}>
            <Text style={tw`text-14px font-medium text-grayscale-black  mb-16px`}>Đã liên kết tài khoản</Text>

            <ConnectSocialAccount />
            <BiometricLogin />
          </View>
          <DeleteAccount />
        </KeyboardAwareScrollView>
        <Button title={'Lưu'} containerStyle={tw`mb-5 mx-4 mt-2`} onPress={handleSubmit(onSubmit)} />
      </Screen>
    );
  },
);
