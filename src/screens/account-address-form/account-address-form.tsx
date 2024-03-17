import React, { memo, useCallback, useMemo } from 'react';
import { Button, Switch, Text } from '@rneui/themed';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Pressable, View } from 'react-native';

import { validationMessage } from '../../constants';
import { REGEXP } from '../../helpers';
import { AddressGroupInput, Screen, TextInput, tw } from '../../components';

import { PropsType, FormData } from './type';

export const AccountAddressForm = memo((props: PropsType) => {
  // const navigation = useNavigation<AccountAddressDetailScreenNavigationProps>();
  const params = props?.route.params;

  const validationSchema = useMemo(
    () =>
      zod.object({
        name: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        phoneNumber: zod
          .string({ required_error: validationMessage.required })
          .startsWith('0', validationMessage.phone.notValid)
          .regex(REGEXP.phone, validationMessage.phone.notValid)
          .nonempty(validationMessage.required),
        userName: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        address: zod.object(
          {
            mapAddress: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
            lat: zod.number(),
            lng: zod.number(),
          },
          { required_error: validationMessage.required },
        ),
        addressDetail: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        setAsDefault: zod.boolean().optional(),
      }),
    [],
  );

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid: isFormValid },
  } = useForm<FormData>({
    defaultValues: {
      setAsDefault: params?.item?.isDefault || false,
      phoneNumber: params?.item?.contactPhone || '',
      userName: params?.item?.contactName || '',
      address:
        {
          mapAddress: params?.item?.mapAddress || '',
          lat: params?.item?.latitude,
          lng: params?.item?.longitude,
        } || undefined,
      name: params?.item?.addressName || '',
      addressDetail: params?.item?.addressDetail || '',
    },
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    criteriaMode: 'firstError',
  });

  const onDelete = useCallback(() => {
    //
  }, []);

  const onSaveAddress = useCallback((value: FormData) => {
    console.log('value', value);
  }, []);

  return (
    <Screen style={tw`p-16px`}>
      <>
        <Text style={tw`text-14px font-medium mb-8px`}>
          <Text style={tw`text-error`}>* </Text> Tên địa chỉ
        </Text>
        <Controller
          name="name"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nhập địa chỉ"
              errorMessage={errors?.name?.message}
            />
          )}
        />
      </>

      <AddressGroupInput control={control as any} errors={errors} trigger={trigger as any} label="Địa chỉ" />

      <Text style={tw`text-14px font-medium text-grayscale-black mb-8px`}>
        <Text style={tw`text-error`}>* </Text>Tên người liên hệ
      </Text>
      <Controller
        name="userName"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Nhập tên người liên hệ"
            clearButtonMode="while-editing"
            errorMessage={errors.userName?.message}
          />
        )}
      />
      <Text style={tw`text-14px font-medium  mb-8px`}>
        <Text style={tw`text-error`}>* </Text>Số điện thoại người liên hệ
      </Text>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { value, onBlur, onChange } }) => (
          <TextInput
            maxLength={10}
            placeholder="Nhập số điện thoại"
            value={value}
            onBlur={onBlur}
            keyboardType="phone-pad"
            clearButtonMode="while-editing"
            onChangeText={onChange}
            errorMessage={errors.phoneNumber?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="setAsDefault"
        render={({ field: { value, onChange } }) => (
          <View style={tw`flex-row items-end justify-between`}>
            <Text style={tw`text-14px mb-8px`}>Đặt làm mặc định</Text>
            <Switch value={value} onValueChange={onChange} />
          </View>
        )}
      />
      {!!params.item && (
        <Pressable onPress={onDelete} style={tw`flex-row items-center mt-30px`}>
          <Text style={tw`text-13px font-semibold text-error ml-14px`}>Xóa địa chỉ này</Text>
        </Pressable>
      )}
      <Button
        title="Lưu địa chỉ"
        onPress={handleSubmit(onSaveAddress)}
        disabled={!isFormValid}
        containerStyle={tw`my-16px`}
        // loading={loading || updateLoading}
      />
    </Screen>
  );
});
