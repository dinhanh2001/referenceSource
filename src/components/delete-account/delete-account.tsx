import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@rneui/themed';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import * as zod from 'zod';
import { ApolloError } from '@apollo/client';

import { validationMessage } from '../../constants';
import { useAuth } from '../../contexts';
import { REGEXP, extractGraphQLErrorMessage } from '../../helpers';
import { ErrorBox } from '../error-box';
import { Space } from '../spacer';
import { TextInput } from '../text-input';
import { tw } from '../tw';

type Form = {
  email?: string;
  phone: string;
  password: string;
};

export const DeleteAccount = () => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<ApolloError | undefined>();

  const { deleteAccount } = useAuth();

  const validation: zod.ZodType<Form> = zod.object({
    email: zod
      .string()
      .optional()
      .refine((email) => {
        if (!email) return true;
        return REGEXP.email.test(email);
      }, validationMessage?.email.notValid),
    phone: zod
      .string({ required_error: validationMessage.required })
      .nonempty({ message: validationMessage.required })
      .regex(REGEXP.phone, validationMessage?.phone.notValid),
    password: zod
      .string({ required_error: validationMessage.required })
      .nonempty({ message: validationMessage.required }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(validation),
    defaultValues: {
      email: '',
      phone: '',
      password: '',
    },
  });

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const onSubmit = useCallback(
    (data: Form) => {
      deleteAccount(
        {
          ...data,
          email: data.email || undefined,
        },
        () => setVisible(false),
        (err) => setError(err),
      );
    },
    [deleteAccount],
  );

  return (
    <View>
      <TouchableOpacity
        style={tw`mt-4 border py-3 px-4 rounded-1 border-grayscale-border`}
        onPress={() => setVisible(true)}
      >
        <Text style={tw``}>Xoá tài khoản</Text>
      </TouchableOpacity>
      <Modal isVisible={visible} onDismiss={onDismiss}>
        <KeyboardAvoidingView behavior="position" enabled={Platform.OS === 'ios'}>
          <View style={tw`bg-white p-4 rounded-1`}>
            <Text style={tw`font-medium text-center mb-3`}>
              Bạn có chắc chắn muốn xóa tài khoản này? Nhập số điện thoại/email của bạn để xác nhận xóa tài khoản này
            </Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={'Email'}
                  placeholder="Nhập email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.email?.message}
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={'Số điện thoại'}
                  isRequiredField
                  placeholder="Nhập số điện thoại"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  errorMessage={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={'Mật khẩu'}
                  isRequiredField
                  placeholder="Nhập mật khẩu"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  toggleSecureTextIcon
                  errorMessage={errors.password?.message}
                />
              )}
            />

            {error != null && <ErrorBox message={extractGraphQLErrorMessage(error)} containerStyle={tw`my-16px`} />}

            <View style={tw`flex-row mt-2`}>
              <Button
                title={'Huỷ'}
                containerStyle={tw`flex-1`}
                type="outline"
                buttonStyle={tw`border-grayscale-disabled`}
                onPress={onDismiss}
              />
              <Space horizontal />
              <Button title={'Xoá '} containerStyle={tw`flex-1`} onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};
