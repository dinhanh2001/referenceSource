import { zodResolver } from '@hookform/resolvers/zod';
import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z } from 'zod';

import {
  AddressGroupFormState,
  AddressGroupInput,
  AppHeader,
  FieldError,
  Screen,
  TextArea,
  TextInput,
  tw,
  UploadMediaInput,
} from '../../components';
import { useOverlay } from '../../contexts';
import { useCategoriesQuery } from '../../graphql/queries/categories.generated';
import {
  CategoryTypeEnum,
  Expense,
  PartnerEntity,
  QuickAddVehicleInput,
  StatusEnum,
  VehicleEntity,
} from '../../graphql/type.interface';
import { isLessThanTheMB } from '../../helpers';
import { AppStackNavigatorParamList, RootNavigatorParamList } from '../../navigator-params';
import { ArrowDown, ArrowRight, CheckSVG, CloseSvg } from '../../svg';

type ScreenNavigationProps = CompositeNavigationProp<
  NavigationProp<RootNavigatorParamList>,
  NavigationProp<AppStackNavigatorParamList>
>;

export type BookingFormFields = AddressGroupFormState & {
  vehicleId: string;
  quickAddVehicleData?: QuickAddVehicleInput;
  media: ImagePicker.ImagePickerAsset[];
  description?: string;
  problem?: {
    ids?: string[];
    isUnknown?: boolean;
  };
  partner?: PartnerEntity;
  expense?: Expense;
};

const MAX_FILES = 5;
const MAX_LEN_ADDRESS_DETAIL = 255;
const MAX_LEN_DESCRIPTION = 1000;

const schema: z.ZodType<BookingFormFields> = z.object({
  vehicleId: z.string({
    required_error: 'Tên xe là trường bắt buộc',
  }),
  quickAddVehicleData: z
    .object({
      addressMoreInfo: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      mapAddress: z.string(),
      name: z.string(),
      hidden: z.boolean(),
    })
    .optional(),
  address: z.object(
    {
      lat: z.number(),
      lng: z.number(),
      mapAddress: z.string(),
    },
    { required_error: 'Vị trí xe gặp sự cố là trường bắt buộc' },
  ),
  addressDetail: z
    .string({ required_error: 'Địa chỉ chi tiết là trường bắt buộc' })
    .trim()
    .nonempty('Địa chỉ chi tiết là trường bắt buộc')
    .max(MAX_LEN_ADDRESS_DETAIL, `Địa chỉ chi tiết không được quá ${MAX_LEN_ADDRESS_DETAIL} ký tự`),
  description: z
    .string()
    .trim()
    .max(MAX_LEN_DESCRIPTION, `Mô tả không được quá ${MAX_LEN_DESCRIPTION} ký tự`)
    .optional(),
  problem: z
    .object({
      ids: z.array(z.string()).optional(),
      isUnknown: z.boolean().optional(),
    })
    .optional()
    .refine((data) => {
      return data != null && ((data.ids?.length != null && data.ids.length > 0) || data.isUnknown);
    }, 'Hiện tượng hư hỏng là trường bắt buộc'),
  media: z
    .array(z.any(), { required_error: 'Ảnh/ Video là trường bắt buộc' })
    // .min(1, 'Ảnh/ Video là trường bắt buộc')
    .refine((data) => {
      return data == null || data.length <= MAX_FILES;
    }, `Số lượng ảnh/video không được vượt quá ${MAX_FILES} tệp`)
    .refine((data) => {
      return !data.filter((it) => it.duration == null).some((it) => !isLessThanTheMB(it?.fileSize || 0, 5));
    }, 'Ảnh không được vượt quá 5MB')
    .refine((data) => data.filter((it) => it.duration != null).length <= 1, 'Giới hạn số lượng video là 1')
    .refine((data) => {
      const video = data.find((it) => it.duration != null);
      return video == null || video.duration / 1000 <= 300; // 5 phút
    }, 'Thời lượng của video không được vượt quá 5 phút')
    .refine((data) => {
      const video = data.find((it) => it.duration != null);
      return video == null || isLessThanTheMB(video?.fileSize || 0, 20);
    }, 'Video không được vượt quá 20MB'),
});

export const RepairRequest = memo(() => {
  const navigation = useNavigation<ScreenNavigationProps>();

  const [vehicle, setVehicle] = useState<VehicleEntity>();

  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<BookingFormFields>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      media: [],
    },
  });

  const mediaChange = watch('media');

  const onDeleteMedia = useCallback(
    (value: ImagePicker.ImagePickerAsset) => {
      if (Array.isArray(mediaChange)) {
        const filtered = mediaChange.filter((med) => med.assetId !== value.assetId);
        setValue('media', filtered);
        trigger('media');
      }
    },
    [mediaChange, setValue, trigger],
  );

  const { data } = useCategoriesQuery({
    variables: {
      type: CategoryTypeEnum.PROBLEM,
      limit: 1000,
      page: 1,
      isActive: StatusEnum.ACTIVE,
    },
    fetchPolicy: 'cache-first',
  });

  const problemOptions = useMemo(
    () =>
      (data?.categories.items ?? []).map((it) => ({
        label: it.name,
        value: it.id,
      })),
    [data?.categories.items],
  );

  const problemIsUnknown = watch('problem.isUnknown');
  const quickAddVehicleData = watch('quickAddVehicleData');

  const { showDialog } = useOverlay();

  const onSubmitFailure = useCallback(() => {
    showDialog({
      type: 'ALERT',
      title: 'Tạo yêu cầu thất bại',
      message: 'Vui lòng kiểm tra lại các thông tin đã nhập',
    });
  }, [showDialog]);

  const onSubmitSuccess = useCallback(
    (form: BookingFormFields) => {
      navigation.navigate('repair-request/select-partner', {
        ...form,
        description: form.description?.trim?.(),
        addressDetail: form.addressDetail?.trim?.(),
      });
    },
    [navigation],
  );

  function _renderVehicleProblemFormSection() {
    return (
      <>
        <View style={tw`h-60px left-0 right-0 bg-primary absolute`} />
        <View style={tw`bg-white p-16px rounded shadow-md z-20`}>
          <Text style={tw`text-17px font-medium mb-18px`}>
            <Text style={tw`text-error`}>* </Text> Xe gặp sự cố
          </Text>
          <Text style={tw`text-14px font-medium mb-8px`}>
            <Text style={tw`text-error`}>* </Text>Tên xe
          </Text>
          <Controller
            control={control}
            name="vehicleId"
            render={({ field: { onChange } }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('repair-request/select-car', {
                    excludes: {
                      excludeActiveBooking: true,
                    },
                    selectedVehicle: vehicle,
                    quickAddData: quickAddVehicleData,
                    onSelect: (item) => {
                      setVehicle(item);
                      onChange(item.id);
                      setValue('quickAddVehicleData', undefined);
                    },
                    onQuickAddVehicle: (quickAddData) => {
                      onChange(quickAddData.name);
                      setValue('quickAddVehicleData', quickAddData);
                    },
                  })
                }
              >
                <View pointerEvents="none">
                  <TextInput
                    placeholder="Nhập tên xe hoặc chọn xe"
                    value={vehicle?.name ?? quickAddVehicleData?.name}
                    rightIcon={<ArrowDown />}
                    errorMessage={errors.vehicleId?.message}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
          <AddressGroupInput
            control={control as any}
            errors={errors}
            trigger={trigger as any}
            label="Vị trí xe gặp sự cố"
          />
        </View>
      </>
    );
  }

  function _renderRepairReasonSection() {
    return (
      <>
        <View>
          <Controller
            name="problem"
            control={control}
            render={({ field: { value, onChange } }) => {
              const disabledUnknown = (value?.ids && value?.ids?.length > 0) as boolean;
              return (
                <>
                  <View style={tw`flex flex-row justify-between items-center my-4`}>
                    <Text style={tw`text-14px font-medium`}>Hiện tượng hư hỏng</Text>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('repair-request/select-problem', {
                          initialIds: value?.ids,
                          options: problemOptions,
                          onSelect: (ids) => {
                            let isUnknown = value?.isUnknown;
                            if (ids.length > 0) {
                              isUnknown = false;
                            }
                            onChange({
                              ids,
                              isUnknown,
                            });
                          },
                        })
                      }
                      style={tw`bg-primary-light rounded-xl h-auto p-2 px-4 flex flex-row gap-1 items-center`}
                    >
                      <Text>Chọn</Text>
                      <ArrowRight />
                    </TouchableOpacity>
                  </View>

                  {value?.ids && value.ids.length > 0 && (
                    <View style={tw`flex-row flex-wrap mb-4px`}>
                      {problemOptions
                        .filter((it) => value.ids?.includes(it.value))
                        .map((it) => (
                          <View
                            key={it.value}
                            style={tw`mr-12px mb-12px px-12px py-8px rounded border border-grayscale-border items-center flex-row flex-shrink`}
                          >
                            <Text style={tw`flex-shrink`}>{it.label}</Text>
                            <TouchableOpacity
                              style={tw`ml-12px`}
                              onPress={() =>
                                onChange({
                                  ids: value.ids?.filter((p) => p !== it.value),
                                })
                              }
                            >
                              <CloseSvg />
                            </TouchableOpacity>
                          </View>
                        ))}
                    </View>
                  )}

                  <TouchableOpacity
                    style={tw`px-16px py-12px rounded border border-grayscale-border items-center flex-row`}
                    onPress={() =>
                      onChange({
                        isUnknown: !problemIsUnknown,
                      })
                    }
                    disabled={disabledUnknown}
                  >
                    <View
                      style={[
                        tw`w-5 h-5 border items-center justify-center rounded-2px border-grayscale-gray`,
                        disabledUnknown && tw`border-grayscale-disabled`,
                        !!value?.isUnknown && tw`bg-primary border-0`,
                      ]}
                    >
                      {!!value?.isUnknown && <CheckSVG />}
                    </View>
                    <Text style={[tw`ml-3`, disabledUnknown && tw`text-grayscale-disabled`]}>Chưa rõ nguyên nhân</Text>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>

        {errors.problem?.message != null && <FieldError message={errors.problem.message} />}
      </>
    );
  }

  function _renderImagePickerSection() {
    return (
      <>
        <Controller
          control={control}
          name="media"
          render={({ field: { value, onChange } }) => (
            <UploadMediaInput
              value={value}
              onChangeValue={(images: any) =>
                onChange(
                  [...value, ...images].filter(
                    (it, idx, self) => self.findIndex((s) => s.assetId === it.assetId) === idx,
                  ),
                )
              }
              onDelete={onDeleteMedia}
              mediaTypes={ImagePicker.MediaTypeOptions.All}
              popupTitle="Chọn tệp đính kèm hoặc mở máy ảnh"
              hintText={`Tối đa ${MAX_FILES} tệp, kích cỡ mỗi ảnh tối đa 5MB, video không quá 20MB và dài quá 1 phút. Định dạng PNG, JPG, JPEG,...`}
              pickPhotoTitle="Chọn ảnh/video"
              takePhotoTitle="Mở camera"
            />
          )}
        />

        {errors.media?.message != null && <FieldError message={errors.media.message} />}
      </>
    );
  }

  function _renderDescriptionSection() {
    return (
      <>
        <Text style={tw`text-14px font-medium mb-8px mt-20px`}>Mô tả</Text>
        <Controller
          name="description"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextArea
              maxLength={1000}
              placeholder="Nhập mô tả..."
              value={value}
              multiline={true}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.description?.message}
            />
          )}
        />
      </>
    );
  }

  return (
    <View style={tw`flex-1 bg-primary`}>
      <Screen>
        <AppHeader title="Yêu cầu sửa chữa" />
        <KeyboardAwareScrollView
          scrollIndicatorInsets={{ right: 1 }}
          contentContainerStyle={tw`p-16px grow bg-white pb-64px`}
          keyboardShouldPersistTaps={'handled'}
        >
          {_renderVehicleProblemFormSection()}
          {_renderRepairReasonSection()}
          {_renderImagePickerSection()}
          {_renderDescriptionSection()}
          <View style={tw`mt-8`}>
            <Button title="Tìm đơn vị sửa chữa" onPress={handleSubmit(onSubmitSuccess, onSubmitFailure)} />
          </View>
        </KeyboardAwareScrollView>
      </Screen>
    </View>
  );
});
