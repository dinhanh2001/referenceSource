import { zodResolver } from '@hookform/resolvers/zod';
import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as zod from 'zod';

import {
  ActivityIndicator,
  AddressGroupInput,
  ButtonPicker,
  DateInput,
  Space,
  TextInput,
  UploadImage,
  tw,
} from '../../components';
import { validationMessage } from '../../constants';
import { useAgencyCreateTechnicianMutation } from '../../graphql/mutations/agencyCreateTechnician.generated';
import { useAgencyUpdateTechnicianMutation } from '../../graphql/mutations/agencyUpdateTechnician.generated';
import { useAgencyGetDetailTechnicianQuery } from '../../graphql/queries/agencyGetDetailTechnician.generated';
import { AgencyGetTechniciansDocument } from '../../graphql/queries/agencyGetTechnicians.generated';
import { useCategoriesQuery } from '../../graphql/queries/categories.generated';
import { AgencyCreateTechnicianInput, CategoryTypeEnum, StatusEnum } from '../../graphql/type.interface';
import { REGEXP } from '../../helpers';
import { useUploadImage } from '../../hooks';
import { AppRoutes, AppStackNavigatorParamList, RootNavigatorParamList } from '../../navigator-params';
import { ArrowDownSVG, VietnamSVG } from '../../svg';

import { FormDataTechnician, PropsType } from './type';

const filter = {
  limit: 1000,
  isActive: StatusEnum.ACTIVE,
};
export const TechnicianInformationScreen: React.FC<PropsType> = memo(({ route }: PropsType) => {
  const inset = useSafeAreaInsets();
  const navigation =
    useNavigation<
      CompositeNavigationProp<NavigationProp<AppStackNavigatorParamList>, NavigationProp<RootNavigatorParamList>>
    >();

  const { data } = useAgencyGetDetailTechnicianQuery({
    skip: !route.params.id,
    variables: { id: route.params.id as string },
  });

  const technician = useMemo(() => data?.agencyGetDetailTechnician || undefined, [data]);

  const { data: data_qualications, loading: getting_qualications } = useCategoriesQuery({
    variables: { ...filter, type: CategoryTypeEnum.QUALIFICATION },
  });

  const { data: data_educations, loading: getting_educations } = useCategoriesQuery({
    variables: { ...filter, type: CategoryTypeEnum.EDUCATION },
  });

  const qualificationOptions = useMemo(
    () =>
      data_qualications?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [data_qualications?.categories.items],
  );

  const educations = useMemo(
    () =>
      data_educations
        ? data_educations.categories.items?.map((education) => ({ label: education.name, value: education.id }))
        : [],
    [data_educations],
  );

  const isLoading = useMemo(
    () => getting_educations || getting_qualications,
    [getting_educations, getting_qualications],
  );

  const [createTechnicianAsync, { loading }] = useAgencyCreateTechnicianMutation({
    onError(error) {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    },
    onCompleted() {
      showMessage({
        message: 'Thêm KTV thành công',
        type: 'success',
      });
      navigation.navigate(AppRoutes.TECHNICIAN_LIST_SCREEN);
    },
  });

  const [updateTechnicianAsync, { loading: loadingUpdate }] = useAgencyUpdateTechnicianMutation({
    onError(error) {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    },
    onCompleted() {
      showMessage({
        message: 'Cập nhật KTV thành công',
        type: 'success',
      });
      navigation.navigate(AppRoutes.TECHNICIAN_LIST_SCREEN);
    },
  });

  const technisianValidation: zod.ZodType<FormDataTechnician> = useMemo(
    () =>
      zod.object({
        addressDetail: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        avatarId: zod.string({ required_error: validationMessage.required }).optional(),
        bank: zod.string({ required_error: validationMessage.required }).optional(),
        // birthday: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        birthday: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required)
          .refine((value: string) => {
            return (
              value == null || value.trim().length === 0 || dayjs(value, 'DD/MM/YYYY').format('DD/MM/YYYY') === value
            );
          }, validationMessage?.invalidDateFormat),
        cardNumber: zod
          .string({ required_error: validationMessage.required })
          .min(10, 'Số thẻ phải có độ dài từ 10 đến 19 ký tự')
          .optional(),
        citizenId: zod
          .string({ required_error: validationMessage.required })
          .min(9, validationMessage.citizenID.notValid)
          .regex(REGEXP.citizenID, validationMessage.citizenID.notValid)
          .nonempty(validationMessage.required),
        education: zod.string({ required_error: validationMessage.required }).optional(),
        email: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required)
          .regex(REGEXP.email, validationMessage.email.notValid),
        fullname: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        address: zod.object(
          {
            mapAddress: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
            lat: zod.number(),
            lng: zod.number(),
          },
          { required_error: validationMessage.required },
        ),
        phone: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required)
          .startsWith('0', validationMessage.phone.notValid)
          .regex(REGEXP.phone, validationMessage.phone.notValid),
        qualifications: zod.array(zod.string({ required_error: validationMessage.required })),
        file: zod.any().optional(),
      }),
    [],
  );

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormDataTechnician>({
    defaultValues: technician
      ? {
          addressDetail: technician?.addressMoreInfo ?? undefined,
          avatarId: technician?.avatar?.fullThumbUrl ?? undefined,
          bank: technician?.bank,
          birthday: technician?.birthday ? dayjs(technician?.birthday).format('DD/MM/YYYY') : '',
          cardNumber: technician?.cardNumber,
          citizenId: technician?.citizenId ?? undefined,
          education: technician?.education?.id,
          email: technician?.email ?? undefined,
          fullname: technician?.fullname ?? undefined,
          address: {
            mapAddress: technician?.mapAddress as string,
            lat: technician?.latitude as number,
            lng: technician?.longitude as number,
          },
          phone: technician?.phone,
          qualifications: technician?.qualifications?.map((qualification) => qualification.id),
        }
      : undefined,
    resolver: zodResolver(technisianValidation),
    mode: 'onChange',
    criteriaMode: 'firstError',
  });

  const { uploadImage } = useUploadImage();

  const onSaveAddress = useCallback(
    async ({
      address,
      addressDetail,
      fullname,
      phone,
      qualifications,
      education,
      cardNumber,
      birthday,
      citizenId,
      email,
      file,
      bank,
    }: FormDataTechnician) => {
      const media = file != null ? await uploadImage(file) : null;

      const input: AgencyCreateTechnicianInput = {
        latitude: address?.lat as number,
        longitude: address?.lng as number,
        mapAddress: address?.mapAddress as string,
        addressMoreInfo: addressDetail,
        fullname,
        qualifications,
        avatarId: media?.id ?? technician?.avatarId,
        education,
        cardNumber,
        birthday: dayjs(birthday, 'DD/MM/YYYY').toISOString(),
        citizenId,
        email,
        phone,
        bank,
      };

      if (!technician) {
        await createTechnicianAsync({
          variables: {
            input,
          },
          refetchQueries: [{ query: AgencyGetTechniciansDocument }],
        });
        return;
      }

      const { phone: _phoneNumber, ...inputWithoutPhone } = input;

      await updateTechnicianAsync({
        variables: {
          input: { ...inputWithoutPhone, id: technician?.id },
        },
        refetchQueries: [{ query: AgencyGetTechniciansDocument }],
      });
      return;
    },
    [createTechnicianAsync, technician, updateTechnicianAsync, uploadImage],
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={tw`font-semibold text-17px`}>
            {technician ? technician?.fullname : 'Thêm mới Kỹ thuật viên'}
          </Text>
        </View>
      ),
      headerTitleAlign: 'left',
      headerBackgroundContainerStyle: {
        borderColor: tw.color('transparent'),
      },
    });
  }, [navigation, technician]);

  if (isLoading)
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator />
      </View>
    );
  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
      <KeyboardAwareScrollView
        scrollIndicatorInsets={{ right: 1 }}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={tw`pb-${inset.bottom + 16}px p-16px`}
      >
        <Controller
          name="avatarId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <UploadImage
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
              label={'Họ và tên'}
              placeholder="Nhập Họ và tên"
              isRequiredField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              maxLength={255}
              clearButtonMode="while-editing"
              errorMessage={errors.fullname?.message}
              trimWhenBlur
            />
          )}
        />
        <Controller
          control={control}
          name="birthday"
          render={({ field: { value, onChange, onBlur } }) => (
            <DateInput
              formatted
              isRequiredField
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              label={'Ngày sinh'}
              value={value}
              onDateChange={onChange}
              onBlur={onBlur}
              containerStyle={tw`mb-4`}
              errorMessage={errors.birthday?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              label={'Số điện thoại'}
              isRequiredField
              disabled={!!technician}
              maxLength={10}
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              leftIcon={
                <View style={tw`flex-center border-r border-r-grayscale-border pr-12px mr-10px`}>
                  <VietnamSVG />
                  <Text style={tw`ml-2`}>+84</Text>
                </View>
              }
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
              value={value}
              onBlur={onBlur}
              // clearButtonMode="while-editing"
              onChangeText={onChange}
              errorMessage={errors.phone?.message}
              trimWhenBlur
              // isLoading={isCheckingPhone}
            />
          )}
        />
        <TextInput
          label={'Mật khẩu mặc định'}
          labelStyle={tw`text-gray-900 font-normal mb-8px`}
          autoCapitalize="none"
          value={'Callme@2023'}
          editable={false}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              label={'Email'}
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              placeholder="Nhập email"
              isRequiredField
              clearButtonMode="while-editing"
              autoCapitalize="none"
              value={value}
              maxLength={255}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
              trimWhenBlur
            />
          )}
        />

        <Controller
          name="citizenId"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              label={'Số CMND/CCCD'}
              isRequiredField
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              placeholder="Nhập số CMND/CCCD"
              clearButtonMode="while-editing"
              value={value}
              keyboardType="number-pad"
              onBlur={onBlur}
              maxLength={12}
              onChangeText={onChange}
              errorMessage={errors.citizenId?.message}
              trimWhenBlur
            />
          )}
        />

        <AddressGroupInput control={control as any} errors={errors} trigger={trigger as any} label="Địa chỉ" />

        <Controller
          control={control}
          name="qualifications"
          render={({ field: { value, onChange } }) => {
            return (
              <View>
                <Text style={tw`text-gray-900 font-normal mb-8px`}>
                  <Text style={tw`text-rose-600`}>*</Text> Chuyên môn{' '}
                </Text>
                <TouchableOpacity
                  style={tw`flex-row mb-8px border rounded border-gray-100 items-center w-full p-6px pr-16px`}
                  onPress={() =>
                    navigation.navigate(AppRoutes.SELECT, {
                      options: qualificationOptions,
                      multiple: true,
                      value,
                      title: 'Chuyên môn',
                      onSelect: onChange,
                    })
                  }
                >
                  <View style={tw`flex-row flex-grow flex-wrap flex-shrink`}>
                    {value === undefined || value.length === 0 ? (
                      <Text style={tw`px-10px py-6px text-[#676773]`}>Chọn loại chuyên môn</Text>
                    ) : (
                      value.map((item) => (
                        <View key={item} style={tw`p-2px`}>
                          <View style={tw`px-12px py-4px border border-grayscale-border bg-gray-100 rounded-full`}>
                            <Text>{qualificationOptions.find((it) => it.value === item)?.label}</Text>
                          </View>
                        </View>
                      ))
                    )}
                  </View>
                  <ArrowDownSVG width={11} height={6} style={tw`flex-shrink-0`} />
                </TouchableOpacity>
                {errors.qualifications?.message && (
                  <Text style={tw`text-error text-12px pl-6px pb-8px`}>{validationMessage.required}</Text>
                )}
              </View>
            );
          }}
        />

        <ButtonPicker
          data={educations}
          control={control as any}
          errors={errors}
          trigger={trigger as any}
          label="Trình độ học vấn"
          name="education"
        />

        <Space size={6} backgroundColor={tw.color('grayscale-border')} style={tw`-mx-4 mt-2 mb-4`} />

        <Controller
          control={control}
          name="bank"
          render={({ field: { value, onBlur, onChange } }) => (
            <TextInput
              placeholder="Nhập ngân hàng"
              label="Ngân hàng"
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              value={value ?? undefined}
              maxLength={255}
              onBlur={onBlur}
              clearButtonMode="while-editing"
              onChangeText={onChange}
              errorMessage={errors.bank?.message}
              trimWhenBlur
            />
          )}
        />
        <Controller
          control={control}
          name="cardNumber"
          render={({ field: { value, onBlur, onChange } }) => (
            <TextInput
              placeholder="Nhập số thẻ"
              label="Số thẻ"
              labelStyle={tw`text-gray-900 font-normal mb-8px`}
              value={value?.toString()}
              onBlur={onBlur}
              clearButtonMode="while-editing"
              onChangeText={onChange}
              keyboardType="number-pad"
              maxLength={19}
              errorMessage={errors.cardNumber?.message}
              trimWhenBlur
            />
          )}
        />
      </KeyboardAwareScrollView>
      <Button
        title="Hoàn tất"
        onPress={handleSubmit(onSaveAddress)}
        disabled={!isValid}
        loading={loading || loadingUpdate}
        containerStyle={tw`mx-4 mb-5 mt-2`}
      />
    </SafeAreaView>
  );
});
