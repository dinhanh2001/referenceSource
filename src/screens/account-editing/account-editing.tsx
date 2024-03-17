import { Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@rneui/themed';

import { REGEXP, showFlashMessageError } from '../../helpers';
import { ArrowRightSVG, LockSVG } from '../../svg';
import { AppHeader, DeleteAccount, Screen, TextInput, tw, UploadImage } from '../../components';
import { useFullScreenLoading } from '../../contexts';
import { AppRoutes, AppStackNavigatorParamList, RootNavigatorParamList } from '../../navigator-params';
import { validationMessage } from '../../constants';
import { useUploadImage } from '../../hooks';
import { usePartnerCheckEmailOrPasswordIsUsedLazyQuery } from '../../graphql/queries/partnerCheckEmailOrPasswordIsUsed.generated';
import { useMePartnerQuery } from '../../graphql/queries/mePartner.generated';
import { usePartnerUpdateProfileMutation } from '../../graphql/mutations/partnerUpdateProfile.generated';

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

export const AccountEditing = React.memo(
  ({
    navigation,
  }: NativeStackScreenProps<AppStackNavigatorParamList & RootNavigatorParamList, AppRoutes.ACCOUNT_EDITING>) => {
    const [checkExistInfo, { loading: checking }] = usePartnerCheckEmailOrPasswordIsUsedLazyQuery({});

    const { data: user } = useMePartnerQuery({ fetchPolicy: 'cache-and-network', onError: showFlashMessageError });

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
              const res = await checkExistInfo({
                variables: {
                  input: {
                    email: email.trim(),
                    partnerId: user?.mePartner.id,
                  },
                },
              });

              return !res.data?.partnerCheckEmailOrPasswordIsUsed;
            }, 'Email đã tồn tại'),
        }),
      [checkExistInfo, user?.mePartner.id],
    );
    const { showFullscreenLoading } = useFullScreenLoading();
    const { uploadImage } = useUploadImage();

    const [updatePartnerInfo, { loading }] = usePartnerUpdateProfileMutation({
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
        avatarId: user?.mePartner?.avatar?.fullThumbUrl ?? undefined,
        fullname: user?.mePartner?.fullname || '',
        phone: user?.mePartner?.phone || '',
        email: user?.mePartner?.email || '',
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
            avatarId: media?.id ?? user?.mePartner?.avatarId,
            fullname,
            email,
          };

          await updatePartnerInfo({
            variables: { input },
            onCompleted: () => {
              showMessage({
                message: 'Thay đổi thông tin thành công',
                type: 'success',
              });
              navigation.goBack();
            },
          });
        } catch (error) {
          showMessage({
            message: 'Có lỗi xảy ra',
            type: 'danger',
          });
        }
      },
      [navigation, updatePartnerInfo, uploadImage, user?.mePartner?.avatarId],
    );

    const onChangePW = useCallback(() => {
      navigation.navigate(AppRoutes.ACCOUNT_CHANGE_PASSWORD);
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
                renderErrorMessage={!!errors.phone}
                borderVisibleIfValue={false}
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
            <LockSVG width={16} height={16} />
            <Text style={tw`flex-1 mx-16px text-grayscale-black`}>Đổi mật khẩu </Text>
            <ArrowRightSVG width={10} height={12} />
          </TouchableOpacity>
          <DeleteAccount />
        </KeyboardAwareScrollView>
        <Button title={'Lưu'} onPress={handleSubmit(onSubmit)} containerStyle={tw`mx-4 mt-2 mb-4`} />
      </Screen>
    );
  },
);
