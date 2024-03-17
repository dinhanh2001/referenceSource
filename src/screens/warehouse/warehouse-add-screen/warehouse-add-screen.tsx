import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as zod from 'zod';

import { TextArea, TextInput, UploadImage, tw } from '../../../components';
import { validationMessage } from '../../../constants';
import { usePartnerCreateStoreMutation } from '../../../graphql/mutations/partnerCreateStore.generated';
import { REGEXP } from '../../../helpers';
import { useUploadImage } from '../../../hooks';
import { usePartnerUpdateStoreMutation } from '../../../graphql/mutations/partnerUpdateStore.generated';

import {
  PropsType,
  WarehouseAddFormData,
  WarehouseAddScreenNavigationProps,
  WarehouseAddScreenRouteProps,
} from './type';

export const WarehouseAddScreen: React.FC<PropsType> = memo(() => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<WarehouseAddScreenNavigationProps>();
  const { params } = useRoute<WarehouseAddScreenRouteProps>();

  const [createStore, { loading: loadingCreate }] = usePartnerCreateStoreMutation({
    onError(error) {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    },
    onCompleted() {
      showMessage({
        message: 'Thêm kho hàng thành công',
        type: 'success',
      });
      navigation.goBack();
    },
  });
  const [updateStore, { loading: loadingUpdate }] = usePartnerUpdateStoreMutation({
    onError(error) {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    },
    onCompleted() {
      showMessage({
        message: 'Sửa kho hàng thành công',
        type: 'success',
      });
      navigation.goBack();
    },
  });

  const { uploadImage } = useUploadImage();

  const warehouseValidation: zod.ZodType<WarehouseAddFormData> = useMemo(
    () =>
      zod.object({
        avatarId: zod.string({ required_error: validationMessage.required }).optional(),
        name: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        address: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        phoneNumber: zod
          .string({ required_error: validationMessage.required })
          .regex(REGEXP.phone, validationMessage?.phone.notValid),
        email: zod
          .string({ required_error: validationMessage.required })
          .nonempty({ message: validationMessage.required })
          .regex(REGEXP.email, { message: 'Email không đúng định dạng' }),
        description: zod.string().optional(),
        file: zod.any().optional(),
      }),
    [],
  );

  const {
    control,
    handleSubmit: onSubmit,
    trigger,
    setValue,
    formState: { errors: formErrors },
  } = useForm<WarehouseAddFormData>({
    resolver: zodResolver(warehouseValidation),
    mode: 'onChange',
    defaultValues: {
      avatarId: params.data?.avatar?.fullOriginalUrl ?? undefined,
      name: params.data?.name,
      address: params.data?.address,
      description: params.data?.description ?? '',
      phoneNumber: params.data?.phoneNumber,
      email: params.data?.email,
    },
  });

  const handleSubmit = useCallback(
    async ({ name, phoneNumber, address, email, description, file }: WarehouseAddFormData) => {
      if (!params.isEdit) {
        const media = file != null ? await uploadImage(file) : null;

        await createStore({
          variables: {
            input: {
              avatarId: media?.id,
              address,
              name,
              phoneNumber,
              email,
              description,
            },
          },
        });
      } else {
        const media = file != null ? await uploadImage(file) : null;

        await updateStore({
          variables: {
            input: {
              id: params.data?.id ?? '',
              avatarId: media?.id,
              address,
              name,
              phoneNumber,
              email,
              description,
            },
          },
        });
      }
    },
    [createStore, params.data?.id, params.isEdit, updateStore, uploadImage],
  );

  return (
    <View style={[tw`flex-1 p-16px `, { paddingBottom: inset.bottom + 16 }]}>
      <KeyboardAwareScrollView style={tw`flex-1`}>
        <Controller
          name="avatarId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <UploadImage
              errorMessage={formErrors.avatarId?.message}
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
          name="name"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              label={'Tên kho hàng'}
              placeholder="Vui lòng nhập tên kho hàng"
              isRequiredField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              maxLength={255}
              clearButtonMode="while-editing"
              errorMessage={formErrors.name?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              label={'Địa chỉ'}
              placeholder="Vui lòng nhập địa chỉ"
              isRequiredField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              maxLength={255}
              clearButtonMode="while-editing"
              errorMessage={formErrors.address?.message}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              label={'Số điện thoại'}
              placeholder="Vui lòng nhập số điện thoại"
              isRequiredField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              maxLength={255}
              clearButtonMode="while-editing"
              errorMessage={formErrors.phoneNumber?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              label={'Email'}
              placeholder="Vui lòng nhập Email"
              isRequiredField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              maxLength={255}
              clearButtonMode="while-editing"
              errorMessage={formErrors.email?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextArea
              label={'Mô tả'}
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              maxLength={255}
              placeholder="Nhập mô tả..."
              value={value}
              multiline={true}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={formErrors.description?.message}
            />
          )}
        />
      </KeyboardAwareScrollView>
      <Button
        title={'Lưu'}
        onPress={onSubmit(handleSubmit)}
        disabled={loadingCreate || loadingUpdate}
        loading={loadingCreate || loadingUpdate}
      />
    </View>
  );
});
