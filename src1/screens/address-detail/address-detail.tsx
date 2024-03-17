import { zodResolver } from '@hookform/resolvers/zod';
import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Switch } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as zod from 'zod';

import { AddressGroupInput, AppHeader, Screen, TextInput, tw } from '../../components';
import { validationMessage } from '../../constants';
import { useFullScreenLoading, useOverlay } from '../../contexts';
import { useAddAddressMutation } from '../../graphql/mutations/addAddress.generated';
import { useRemoveAddressMutation } from '../../graphql/mutations/removeAddress.generated';
import { useUpdateAddressMutation } from '../../graphql/mutations/updateAddress.generated';
import { AddressesDocument } from '../../graphql/queries/addresses.generated';
import { LatLng } from '../../graphql/type.interface';
import { REGEXP, showFlashMessageError } from '../../helpers';
import { AppStackNavigatorParamList, RootNavigatorParamList } from '../../navigator-params';
import { Trash } from '../../svg';

type FormData = {
  address: LatLng & {
    mapAddress: string;
  };
  addressDetail: string;
  userName: string;
  phoneNumber: string;
  setAsDefault: boolean;
  name: string;
};

type ScreenNavigationProps = CompositeNavigationProp<
  NavigationProp<RootNavigatorParamList>,
  NavigationProp<AppStackNavigatorParamList>
>;

const LEN_NAME_ADDRESS = 10;

export const AddressDetail = React.memo(
  ({ route }: NativeStackScreenProps<AppStackNavigatorParamList, 'address-detail'>) => {
    const { showDialog } = useOverlay();
    const { showFullscreenLoading } = useFullScreenLoading();
    const navigation = useNavigation<ScreenNavigationProps>();
    // const { address, updatedAddress, setUpdatedAddress, changeAddress } = useContext(AccountAddressContext);
    const [addAddress, { loading }] = useAddAddressMutation({
      onError: showFlashMessageError,
      onCompleted() {
        showMessage({
          message: 'Thêm mới địa chỉ thành công',
          type: 'success',
        });
      },
    });
    const [updateAddress, { loading: updateLoading }] = useUpdateAddressMutation({
      onError: showFlashMessageError,
      onCompleted() {
        navigation.goBack();
      },
    });
    const [removeAddress, { loading: removeLoading }] = useRemoveAddressMutation({ onError: showFlashMessageError });

    const validationSchema = useMemo(
      () =>
        zod.object({
          name: zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required)
            .max(LEN_NAME_ADDRESS, `Tên địa chỉ không được vượt quá ${LEN_NAME_ADDRESS} kí tự`),
          phoneNumber: zod
            .string({ required_error: validationMessage.required })
            .startsWith('0', 'Định dạng số điện thoại phải gồm 10 kí tự số và bắt đầu bằng số 0')
            .regex(REGEXP.phone, 'Định dạng số điện thoại phải gồm 10 kí tự số và bắt đầu bằng số 0')
            .nonempty(validationMessage.required),
          userName: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
          address: zod.object(
            {
              mapAddress: zod
                .string({ required_error: validationMessage.required })
                .nonempty(validationMessage.required),
              lat: zod.number(),
              lng: zod.number(),
            },
            { required_error: validationMessage.required },
          ),
          addressDetail: zod
            .string({ required_error: validationMessage.required })
            .nonempty(validationMessage.required),
          setAsDefault: zod.boolean().optional(),
        }),
      [],
    );
    const {
      control,
      handleSubmit,
      getValues,
      trigger,
      formState: { errors, isValid: isFormValid },
    } = useForm<FormData>({
      defaultValues: {
        setAsDefault: route.params?.item?.isDefault || false,
        phoneNumber: route.params?.item?.contactPhone || '',
        userName: route.params?.item?.contactName || '',
        address:
          {
            mapAddress: route.params?.item?.mapAddress || '',
            lat: route.params?.item?.latitude,
            lng: route.params?.item?.longitude,
          } || undefined,
        name: route.params?.item?.addressName || '',
        addressDetail: route.params?.item?.addressDetail || '',
      },
      resolver: zodResolver(validationSchema),
      mode: 'onChange',
      criteriaMode: 'firstError',
    });

    const onSaveAddress = useCallback(
      async (values: FormData) => {
        try {
          const input = {
            addressDetail: values.addressDetail,
            addressName: values.name,
            contactName: values.userName,
            contactPhone: values.phoneNumber,
            isDefault: !!values.setAsDefault,
            latitude: values.address.lat,
            longitude: values.address.lng,
            mapAddress: values.address.mapAddress,
          };
          if (route.params?.item) {
            const editInput = {
              id: route.params.item.id,
              ...input,
            };
            const res = await updateAddress({
              variables: {
                input: editInput,
              },
              refetchQueries: [{ query: AddressesDocument }],
            });
            if (res.errors) {
              throw res.errors;
            }
            showMessage({
              message: 'Thay đổi thông tin thành công',
              type: 'success',
            });
            return;
          }
          const res = await addAddress({
            variables: {
              input,
            },
            refetchQueries: [{ query: AddressesDocument }],
          });
          if (res.errors) {
            throw res.errors;
          }
          navigation.goBack();
        } catch (error) {
          showMessage({
            message: 'Có lỗi xảy ra',
            type: 'danger',
          });
        }
      },
      [addAddress, navigation, route.params.item, updateAddress],
    );

    const onDelete = useCallback(async () => {
      try {
        const nameAddr = getValues('name');
        const res = await showDialog({
          title: `Xóa địa chỉ ${nameAddr}`,
          message: 'Bạn chắc chắn muốn xóa địa chỉ này khỏi danh sách địa điểm đã lưu của bạn?',
          type: 'CONFIRM',
        });
        if (res) {
          await removeAddress({
            variables: { id: route.params.item?.id },
            refetchQueries: [{ query: AddressesDocument }],
          });
          navigation.goBack();
        }
      } catch (error) {
        //error
      }
    }, [showDialog, removeAddress, getValues, navigation, route]);

    useEffect(() => {
      showFullscreenLoading(removeLoading);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [removeLoading]);

    return (
      <Screen>
        <AppHeader title={!route.params?.item ? 'Thêm địa chỉ mới' : 'Chỉnh sửa địa chỉ'} />
        <KeyboardAwareScrollView contentContainerStyle={tw`grow px-16px pt-26px pb-34px`}>
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
                  borderVisibleIfValue={false}
                  errorMessage={errors?.name?.message}
                  maxLength={LEN_NAME_ADDRESS}
                  trimWhenBlur
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
                borderVisibleIfValue={false}
                errorMessage={errors.userName?.message}
                trimWhenBlur
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
                borderVisibleIfValue={false}
                onChangeText={onChange}
                errorMessage={errors.phoneNumber?.message}
                trimWhenBlur
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
          {!!route.params.item && (
            <TouchableOpacity onPress={onDelete} style={tw`flex-row items-center mt-30px`}>
              <Trash width={18} height={18} fill={tw.color('error')} />
              <Text style={tw`text-13px font-semibold text-error ml-14px`}>Xóa địa chỉ này</Text>
            </TouchableOpacity>
          )}
          <Button
            title="Lưu địa chỉ"
            onPress={handleSubmit(onSaveAddress)}
            disabled={!isFormValid}
            containerStyle={tw`my-16px`}
            loading={loading || updateLoading}
          />
        </KeyboardAwareScrollView>
      </Screen>
    );
  },
);
