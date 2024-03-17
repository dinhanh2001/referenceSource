import { zodResolver } from '@hookform/resolvers/zod';
import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as zod from 'zod';
import { ZodType } from 'zod';
import { showMessage } from 'react-native-flash-message';
import dayjs from 'dayjs';

import { DateInput, ErrorBox, TextArea, TextInput, tw } from '../../components';
import {
  CategoryTypeEnum,
  LatLng,
  NewFreelancerTechnicianInput,
  PartnerTypeEnum,
  StatusEnum,
} from '../../graphql/type.interface';
import { REGEXP, extractGraphQLErrorMessage, showFlashMessageError } from '../../helpers';
import { AppRoutes, AuthStackNavigatorParamList, RootNavigatorParamList } from '../../navigator-params';
import { ArrowDownSVG, ArrowRightSVG } from '../../svg';
import { useCategoriesQuery } from '../../graphql/queries/categories.generated';
import { useCheckTechnicianExistedLazyQuery } from '../../graphql/queries/checkTechnicianExisted.generated';
import { useAuth, useFullScreenLoading, useLocation } from '../../contexts';
import { EducationSelector } from '../../screens/auth/components';
import { usePartnerUpdateProfileMutation } from '../../graphql/mutations/partnerUpdateProfile.generated';
import { client } from '../../apollo/apollo';
import { MePartnerDocument } from '../../graphql/queries/mePartner.generated';
import { validationMessage } from '../../constants';

type ScreenNavigationProp = CompositeNavigationProp<
  NavigationProp<RootNavigatorParamList>,
  NavigationProp<AuthStackNavigatorParamList>
>;

export type RegisterTechnicianInformationFormData = Omit<
  NewFreelancerTechnicianInput,
  'latitude' | 'longitude' | 'mapAddress' | 'password' | ''
> & {
  address: LatLng & {
    mapAddress: string;
  };
  description?: string;
  hotline?: string;
};

type TechnicianFormProps = {
  type?: 'register' | 'update';
  defaultValues?: RegisterTechnicianInformationFormData & { education?: string };
};

type FieldTitleProps = {
  isRequired: boolean;
  title: string;
};

const FieldTitle = memo(({ isRequired, title }: FieldTitleProps) => (
  <Text style={tw`text-gray-900 font-normal mb-8px`}>
    {isRequired && <Text style={tw`text-rose-600`}>*</Text>} {title}
  </Text>
));

const custom_required_error = (field_name: string) => {
  return { required_error: `${field_name} là trường bắt buộc` };
};

export const TechnicianForm = memo(({ type = 'register', defaultValues }: TechnicianFormProps) => {
  const { requestLocationPermission } = useLocation();
  const { showFullscreenLoading } = useFullScreenLoading();
  const { partner } = useAuth();

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  const navigation = useNavigation<ScreenNavigationProp>();

  const [checkTechnicianExisted, { error, loading }] = useCheckTechnicianExistedLazyQuery({
    fetchPolicy: 'cache-first',
  });
  const [partnerUpdateProfile, { loading: updating }] = usePartnerUpdateProfileMutation({
    onError: showFlashMessageError,
    onCompleted: () => {
      client.refetchQueries({
        include: [MePartnerDocument],
      });
      showMessage({
        message: 'Cập nhật thông tin thành công',
        type: 'success',
      });
      navigation.goBack();
    },
  });

  useEffect(() => {
    showFullscreenLoading(updating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updating]);

  const isAgency = useMemo(() => partner?.type === PartnerTypeEnum.AGENCY, [partner?.type]);

  const validationSchema: ZodType<RegisterTechnicianInformationFormData> = useMemo(
    () =>
      zod.object({
        description: zod.string().optional(),
        education: zod.string().optional(),
        fullname: zod.string(custom_required_error('Họ và tên')),
        bank: zod.string(custom_required_error('Ngân hàng')).trim(),
        address: zod.object({
          lat: zod.number(),
          lng: zod.number(),
          mapAddress: zod.string(custom_required_error('Địa chỉ')),
        }),
        qualifications: zod.array(zod.string(custom_required_error('Chuyên môn'))),
        addressMoreInfo: zod.string(custom_required_error('Tên đường, Tòa nhà, Số nhà')).trim().min(1),
        birthday: !isAgency
          ? zod.string(custom_required_error('Ngày sinh')).refine((value: string) => {
              return (
                value == null || value.trim().length === 0 || dayjs(value, 'DD/MM/YYYY').format('DD/MM/YYYY') === value
              );
            }, validationMessage?.invalidDateFormat)
          : zod.string().refine((_value: string) => {
              return dayjs(defaultValues?.birthday, 'DD/MM/YYYY').format('DD/MM/YYYY');
            }, validationMessage?.invalidDateFormat),
        phone: zod
          .string(custom_required_error('Số điện thoại'))
          .regex(REGEXP.phone, validationMessage?.phone.notValid)
          .refine(async (phone) => {
            if (phone === defaultValues?.phone) {
              return true;
            }
            const res = await checkTechnicianExisted({
              variables: {
                phone: phone.trim(),
              },
            });

            return res.data == null || !res.data.checkTechnicianExisted || type === 'update';
          }, 'Số điện thoại đã được sử dụng'),
        hotline: zod.string().trim().optional(),
        email: zod
          .string(custom_required_error('Email'))
          .trim()
          .regex(REGEXP.email, validationMessage?.email.notValid)
          .refine(async (email) => {
            if (email === defaultValues?.email) {
              return true;
            }
            const res = await checkTechnicianExisted({
              variables: {
                email: email.trim(),
              },
            });

            return res.data == null || !res?.data?.checkTechnicianExisted;
          }, 'Địa chỉ email đã được sử dụng'),
        citizenId: zod
          .string(custom_required_error('Số CMND/CCCD'))
          .trim()
          .regex(REGEXP.citizenID, validationMessage?.citizenID.notValid)
          .refine(async (citizenId) => {
            if (citizenId === defaultValues?.citizenId) {
              return true;
            }

            const res = await checkTechnicianExisted({
              variables: {
                citizenId: citizenId.trim(),
              },
            });

            return res.data == null || !res.data.checkTechnicianExisted || type === 'update';
          }, 'Số CMND/CCCD đã được sử dụng'),
        cardNumber: zod
          .string(custom_required_error('Số thẻ'))
          .regex(REGEXP.bankCardID, validationMessage?.cardNumber?.notValid),
      }),
    [
      isAgency,
      defaultValues?.birthday,
      defaultValues?.phone,
      defaultValues?.email,
      defaultValues?.citizenId,
      checkTechnicianExisted,
      type,
    ],
  );

  const {
    control,
    trigger,
    handleSubmit: onSubmit,
    formState: { errors: formErrors },
  } = useForm<RegisterTechnicianInformationFormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues,
  });

  const handleSubmit = useCallback(
    async (data: RegisterTechnicianInformationFormData) => {
      if (type === 'register') {
        navigation.navigate(AppRoutes.REGISTRATION_PASSWORD_CREATION, {
          ...data,
          birthday: dayjs(data.birthday, 'DD/MM/YYYY').toISOString(),
        });
      } else {
        await partnerUpdateProfile({
          variables: {
            input: {
              addressMoreInfo: data.addressMoreInfo,
              bank: data.bank,
              birthday: dayjs(data.birthday, 'DD/MM/YYYY').toISOString(),
              cardNumber: data.cardNumber,
              education: data.education,
              email: data.email,
              fullname: data.fullname,
              hotline: data.hotline,
              mapAddress: data.address.mapAddress,
              qualifications: data.qualifications,
              description: data.description,
              latitude: data.address.lat,
              longitude: data.address.lng,
            },
          },
        });
      }
    },
    [type, navigation, partnerUpdateProfile],
  );

  const { bottom } = useSafeAreaInsets();

  const { data } = useCategoriesQuery({
    variables: {
      type: CategoryTypeEnum.QUALIFICATION,
      isActive: StatusEnum.ACTIVE,
      limit: 1000,
      page: 1,
    },
    fetchPolicy: 'cache-first',
  });

  const qualificationOptions = useMemo(
    () =>
      data?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [data?.categories.items],
  );

  return (
    <View style={tw`flex-1 mb-${bottom === 0 ? 1 : bottom}px`}>
      <KeyboardAwareScrollView scrollIndicatorInsets={{ right: 1 }} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <View style={tw`mt-24px w-full px-24px`}>
            {error && <ErrorBox message={extractGraphQLErrorMessage(error)} containerStyle={tw`mb-12px`} />}

            <Text style={tw`font-bold mb-12px`}>Thông tin cá nhân</Text>

            <Controller
              control={control}
              name="fullname"
              render={({ field: { value, onBlur, onChange } }) => (
                <TextInput
                  label={isAgency ? 'Tên đại lý' : 'Họ và Tên'}
                  isRequiredField
                  labelStyle={tw`text-gray-900 font-normal mb-8px`}
                  placeholder={isAgency ? 'Nhập tên đại lý' : 'Nhập Họ và Tên'}
                  value={value}
                  onBlur={onBlur}
                  maxLength={255}
                  clearButtonMode="while-editing"
                  onChangeText={onChange}
                  errorMessage={formErrors.fullname?.message}
                />
              )}
            />

            {!isAgency && (
              <Controller
                control={control}
                name="birthday"
                render={({ field: { value, onChange, onBlur } }) => (
                  <DateInput
                    formatted
                    label={'Ngày sinh'}
                    labelStyle={tw`text-gray-900 font-normal mb-8px`}
                    isRequiredField
                    onDateChange={onChange}
                    value={value}
                    errorMessage={formErrors.birthday?.message}
                    containerStyle={tw`mb-16px`}
                    onBlur={onBlur}
                  />
                )}
              />
            )}

            <Controller
              control={control}
              name="phone"
              render={({ field: { value, onBlur, onChange } }) => (
                <TextInput
                  label={'Số điện thoại'}
                  editable={type !== 'update'}
                  isRequiredField
                  labelStyle={tw`text-gray-900 font-normal mb-8px`}
                  placeholder="Nhập số điện thoại"
                  maxLength={10}
                  keyboardType="phone-pad"
                  value={value}
                  onBlur={onBlur}
                  clearButtonMode="while-editing"
                  onChangeText={(text) => {
                    onChange(text);
                    setTimeout(() => {
                      trigger('phone');
                    }, 150);
                  }}
                  errorMessage={formErrors.phone?.message}
                  inputContainerStyle={type === 'update' && tw`bg-slate-200`}
                />
              )}
            />

            {isAgency && (
              <Controller
                control={control}
                name="hotline"
                render={({ field: { value, onBlur, onChange } }) => (
                  <TextInput
                    label={'Hotline'}
                    editable={type !== 'update'}
                    isRequiredField
                    labelStyle={tw`text-gray-900 font-normal mb-8px`}
                    placeholder="Nhập số hotline"
                    maxLength={10}
                    keyboardType="phone-pad"
                    value={value}
                    onBlur={onBlur}
                    clearButtonMode="while-editing"
                    onChangeText={onChange}
                    errorMessage={formErrors.phone?.message}
                    inputContainerStyle={type === 'update' && tw`bg-slate-200`}
                  />
                )}
              />
            )}

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onBlur, onChange } }) => (
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
                  onChangeText={(text) => {
                    onChange(text);
                    setTimeout(() => {
                      trigger('email');
                    }, 150);
                  }}
                  errorMessage={formErrors.email?.message}
                />
              )}
            />

            {!isAgency && (
              <Controller
                control={control}
                name="citizenId"
                render={({ field: { value, onBlur, onChange } }) => (
                  <TextInput
                    label={'Số CMND/CCCD'}
                    editable={type !== 'update'}
                    isRequiredField
                    labelStyle={tw`text-gray-900 font-normal mb-8px`}
                    placeholder="Nhập số CMND/CCCD"
                    clearButtonMode="while-editing"
                    value={value}
                    keyboardType="number-pad"
                    onBlur={onBlur}
                    maxLength={12}
                    onChangeText={onChange}
                    errorMessage={formErrors.citizenId?.message}
                  />
                )}
              />
            )}

            <FieldTitle isRequired title="Địa chỉ" />

            <Controller
              control={control}
              name="address"
              render={({ field: { value, onChange } }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(AppRoutes.ADDRESS_AUTOCOMPLETE, {
                      onSelect: onChange,
                    })
                  }
                >
                  <View pointerEvents="none">
                    <TextInput
                      isRequiredField
                      labelStyle={tw`text-gray-900 font-normal mb-8px`}
                      placeholder="Tìm kiếm địa chỉ"
                      editable={false}
                      errorMessage={formErrors.address?.message && custom_required_error('Địa chỉ').required_error}
                      rightIcon={<ArrowRightSVG width={6} height={11} />}
                      value={value?.mapAddress}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />

            <Controller
              control={control}
              name="addressMoreInfo"
              render={({ field: { value, onBlur, onChange } }) => (
                <TextInput
                  isRequiredField
                  placeholder="Tên đường, Tòa nhà, Số nhà"
                  value={value}
                  onBlur={onBlur}
                  clearButtonMode="while-editing"
                  onChangeText={onChange}
                  maxLength={1000}
                  errorMessage={formErrors.addressMoreInfo?.message}
                />
              )}
            />

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
                  </View>
                );
              }}
            />
            {formErrors?.qualifications?.message && (
              <Text style={tw`text-error`}>{custom_required_error('Chuyên môn').required_error}</Text>
            )}

            {!isAgency && (
              <Controller
                control={control}
                name="education"
                render={({ field: { value, onChange } }) => (
                  <View style={tw`w-full mb-8px mt-8px`}>
                    <Text style={tw`mb-8px`}>Trình độ học vấn</Text>
                    <EducationSelector value={value} onSelectionChanged={onChange} />
                  </View>
                )}
              />
            )}
          </View>

          <View style={tw`w-full bg-[#eeeeee] h-6px`} />

          <View style={tw`mt-24px w-full px-24px`}>
            <Text style={tw`font-bold mb-12px`}>Thông tin thanh toán</Text>

            <Controller
              control={control}
              name="bank"
              render={({ field: { value, onBlur, onChange } }) => (
                <TextInput
                  isRequiredField
                  placeholder="Nhập ngân hàng"
                  label="Ngân hàng"
                  labelStyle={tw`text-gray-900 font-normal mb-8px`}
                  value={value ?? undefined}
                  maxLength={255}
                  onBlur={onBlur}
                  clearButtonMode="while-editing"
                  onChangeText={onChange}
                  errorMessage={formErrors.bank?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="cardNumber"
              render={({ field: { value, onBlur, onChange } }) => (
                <TextInput
                  isRequiredField
                  placeholder="Nhập số thẻ"
                  label="Số thẻ"
                  labelStyle={tw`text-gray-900 font-normal mb-8px`}
                  value={value?.toString()}
                  onBlur={onBlur}
                  clearButtonMode="while-editing"
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  maxLength={19}
                  errorMessage={formErrors.cardNumber?.message}
                />
              )}
            />
            {type === 'update' && (
              <Controller
                control={control}
                name="description"
                render={({ field: { value, onBlur, onChange } }) => (
                  <View style={tw`mb-10`}>
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
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Button
        title={type === 'register' ? 'Tiếp theo' : 'Lưu'}
        onPress={onSubmit(handleSubmit)}
        disabled={loading || updating}
        loading={loading || updating}
        containerStyle={tw`mx-4 mt-2 mb-4`}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10,
  },
});
