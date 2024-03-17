import { View, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

import { AppHeader, FieldError, Screen, TextArea, tw, UploadMediaInput } from '../../components';
import { convertServiceFeedbackTypeEnum, typeIcon } from '../feedback/components';
import { useFullScreenLoading, useOverlay } from '../../contexts';
import { ShareSuccessSvg } from '../../svg';
import { ServiceFeedbackTypeEnum } from '../../graphql/type.interface';
import { isLessThanTheMB, transformFileToFormData } from '../../helpers';
import { useUploadImageMutation, useUploadVideoMutation } from '../../services';
import { useCreateServiceFeedbackMutation } from '../../graphql/mutations/createServiceFeedback.generated';
import { GetServiceFeedbacksDocument } from '../../graphql/queries/getServiceFeedbacks.generated';
import { GetCountStatusServiceFeedbackDocument } from '../../graphql/queries/getCountStatusServiceFeedback.generated';

type FormData = {
  type: ServiceFeedbackTypeEnum;
  content: string;
  media?: ImagePicker.ImagePickerAsset[];
};

const MAX_FILES = 5;
const SIZE_VIDEO = 100;
const SIZE_IMAGE = 15;

export const FeedbackCreate = React.memo(() => {
  const navigate = useNavigation();
  const { showDialog } = useOverlay();
  const { showFullscreenLoading } = useFullScreenLoading();

  const validationSchema = useMemo(
    () =>
      z.object({
        type: z.string().nonempty(),
        content: z.string().nonempty(),
        media: z
          .array(z.any())
          .optional()
          .refine((data) => {
            return data == null || data.length <= MAX_FILES;
          }, `Số lượng ảnh/video không được vượt quá ${MAX_FILES} tệp`)
          .refine((data) => {
            return !(data ?? [])
              .filter((it) => it.duration == null)
              .some((it) => !isLessThanTheMB(it?.fileSize || 0, SIZE_IMAGE));
          }, `Ảnh không được vượt quá ${SIZE_IMAGE}MB`)
          .refine(
            (data) => (data ?? []).filter((it) => it.duration != null).length <= 1,
            'Giới hạn số lượng video là 1',
          )
          .refine((data) => {
            const video = (data ?? []).find((it) => it.duration != null);
            return video == null || video.duration / 1000 <= 300; // 5 phút
          }, 'Thời lượng của video không được vượt quá 5 phút')
          .refine((data) => {
            const video = (data ?? []).find((it) => it.duration != null);
            return video == null || isLessThanTheMB(video?.fileSize || 0, SIZE_VIDEO);
          }, `Video không được vượt quá ${SIZE_VIDEO}MB`),
      }),

    [],
  );

  const {
    control,
    setValue,
    reset,
    watch,
    trigger,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      type: ServiceFeedbackTypeEnum.QUESTION,
    },
  });

  const typeChange = watch('type');
  const onChangeType = useCallback(
    (type: ServiceFeedbackTypeEnum) => () => {
      setValue('type', type);
    },
    [setValue],
  );

  const onReset = useCallback(() => {
    reset();
  }, [reset]);

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

  const [createServiceFeedback, { loading: creating }] = useCreateServiceFeedbackMutation({
    onError(error) {
      showMessage({
        type: 'danger',
        message: error?.message,
      });
    },
    onCompleted() {
      showDialog({
        type: 'ALERT',
        title: 'Chia sẻ phản hồi thành công!',
        icon: <ShareSuccessSvg />,
        onOk: () => navigate.goBack(),
        message:
          'Mọi sự đóng góp của bạn đều đáng quý, CALLME xin ghi nhận và làm tốt hơn trong thời gian tới. Xin trân trọng cảm ơn bạn!',
      });
    },
  });
  const { mutateAsync: uploadImage, isLoading: uploadingImage } = useUploadImageMutation();
  const { mutateAsync: uploadVideo, isLoading: uploadingVideo } = useUploadVideoMutation();

  const isLoading = useMemo(
    () => uploadingImage || uploadingVideo || creating,
    [creating, uploadingImage, uploadingVideo],
  );

  const onSend = useCallback(
    async (values: FormData) => {
      const { media, ...withoutValues } = values;
      const asset = media?.length
        ? await Promise.all(
            media.map(async (file) => {
              const formData = transformFileToFormData(file);
              return await (file.duration != null ? uploadVideo(formData) : uploadImage(formData));
            }),
          )
        : [];
      createServiceFeedback({
        variables: { input: { ...withoutValues, imagesIds: asset.map((it) => it.id) } },
        refetchQueries: [GetServiceFeedbacksDocument, GetCountStatusServiceFeedbackDocument],
      });
    },
    [createServiceFeedback, uploadImage, uploadVideo],
  );

  useEffect(() => {
    showFullscreenLoading(isLoading);
  }, [isLoading, showFullscreenLoading]);

  return (
    <Screen>
      <AppHeader title={'Tạo phản hồi'} />
      <KeyboardAwareScrollView contentContainerStyle={tw`p-16px grow`}>
        <Text style={tw`text-14px font-medium	mb-6px`}>Loại phản hồi</Text>
        {Object.values(ServiceFeedbackTypeEnum).map((type: ServiceFeedbackTypeEnum) => (
          <TouchableOpacity
            onPress={onChangeType(type)}
            style={[
              tw`flex-row items-center mt-8px border border-grayscale-border px-16px py-4px rounded-full`,
              typeChange === type && tw`border-primary bg-primary-light`,
            ]}
            key={type}
          >
            {typeIcon[type]}
            <Text style={tw`ml-16px text-13px text-grayscale-black`}>{convertServiceFeedbackTypeEnum(type)}</Text>
          </TouchableOpacity>
        ))}
        <Text style={tw`text-14px font-medium	my-16px`}>Nội dung phản hồi</Text>
        <Controller
          control={control}
          name="content"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextArea
              maxLength={1000}
              value={value}
              multiline={true}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nhập nội dung..."
            />
          )}
        />
        <Controller
          control={control}
          name="media"
          render={({ field: { value, onChange } }) => (
            <UploadMediaInput
              value={value}
              onChangeValue={(images: any) => {
                onChange(
                  [...(value ?? []), ...images].filter(
                    (it, idx, self) => self.findIndex((s) => s.assetId === it.assetId) === idx,
                  ),
                );
              }}
              onDelete={onDeleteMedia}
              mediaTypes={ImagePicker.MediaTypeOptions.All}
              popupTitle="Chọn tệp đính kèm hoặc mở máy ảnh"
              hintText={`Tối đa ${MAX_FILES} tệp, kích cỡ mỗi ảnh tối đa ${SIZE_IMAGE}MB, video không quá ${SIZE_VIDEO}MB. Định dạng PNG, JPG, JPEG, MP4,...`}
              pickPhotoTitle="Chọn ảnh/video"
              takePhotoTitle="Mở camera"
            />
          )}
        />
        {errors.media?.message != null && <FieldError message={errors.media.message} />}

        <View style={tw`flex-1 flex-row px-16px items-end justify-between py-16px pb-34px`}>
          <Button
            type="outline"
            buttonStyle={tw`border-grayscale-border border-2`}
            containerStyle={tw`w-45%`}
            title={'Làm lại'}
            onPress={onReset}
          />
          <Button onPress={handleSubmit(onSend)} containerStyle={tw`w-45%`} title={'Gửi đi'} disabled={!isValid} />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
});
