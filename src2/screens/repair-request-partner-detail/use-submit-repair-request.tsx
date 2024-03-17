import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useFullScreenLoading, useOverlay } from '../../contexts';
import { PartnerExpenseInfoGroup, PartnerRateGroup, tw } from '../../components';
import { BookingFormFields } from '../repair-request/repair-request';
import { useUploadImageMutation, useUploadVideoMutation } from '../../services';
import { useCreateBookingMutation } from '../../graphql/mutations/createBooking.generated';
import { showFlashMessageError, transformFileToFormData } from '../../helpers';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { useReCreateBookingMutation } from '../../graphql/mutations/reCreateBooking.generated';
import { Sent } from '../../svg';
import { ReviewSummary } from '../../graphql/type.interface';

export const useSubmitRepairRequest = (data: BookingFormFields) => {
  const navigation = useNavigation<StackNavigationProp<AppStackNavigatorParamList>>();

  const [uploadedCount, setUploadedCount] = useState<number>(0);

  const { showDialog } = useOverlay();

  const { showFullscreenLoading, setHelpText } = useFullScreenLoading();

  useEffect(() => {
    setHelpText?.(
      `Đang tải lên ${uploadedCount}/${data.media.length} tệp${
        data.media.some((it) => it.duration != null)
          ? `\nBởi vì bạn có tải lên video nên quá trình có thể mất một lúc.`
          : ''
      }`,
    );
  }, [data.media, data.media.length, setHelpText, uploadedCount]);

  const [createBooking, { loading: creatingBooking }] = useCreateBookingMutation({
    onError: (error) => showFlashMessageError(error),
    onCompleted: async () => {
      await showDialog({
        type: 'ALERT',
        title: 'Tạo yêu cầu sửa chữa thành công',
        message: '',
        icon: <Sent />,
      });

      navigation.navigate('bottom-tab', {
        screen: 'my-repair-requests',
      });
    },
  });

  const [reCreateBooking, { loading: reCreateBookingLoading }] = useReCreateBookingMutation({
    onError: (error) => showFlashMessageError(error),
    onCompleted: async () => {
      await showDialog({
        type: 'ALERT',
        title: 'Tạo lại yêu cầu sửa chữa thành công',
        message: '',
      });

      navigation.navigate('bottom-tab', {
        screen: 'my-repair-requests',
      });
    },
  });

  const { mutateAsync: uploadImage, isLoading: uploadingImage } = useUploadImageMutation({
    onSuccess: () => setUploadedCount((count) => count + 1),
  });
  const { mutateAsync: uploadVideo, isLoading: uploadingVideo } = useUploadVideoMutation({
    onSuccess: () => setUploadedCount((count) => count + 1),
  });

  const submit = useCallback(async () => {
    const { partner, media, ...params } = data;

    if (partner == null) return;

    const res = await showDialog({
      type: 'CONFIRM',
      title: partner.fullname ?? '',
      message: (
        <View>
          <Text style={tw`text-12px text-grayscale-gray`} numberOfLines={1}>
            {partner.description}
          </Text>
          <PartnerRateGroup reviewSummary={partner?.reviewSummary as ReviewSummary} />
          {partner.expenseInfo != null && <PartnerExpenseInfoGroup expense={partner.expenseInfo} />}
        </View>
      ),
      confirmText: 'Lựa chọn',
      cancelText: 'Huỷ bỏ',
    });

    if (res) {
      await showFullscreenLoading(true);
      try {
        if (params.bookingId) {
          await reCreateBooking({
            variables: {
              input: {
                bookingId: params.bookingId,
                partnerId: partner.id,
                transportDistance: params.expense?.distance ?? 0,
                transportDuration: params.expense?.time ?? 0,
                transportFee: params.expense?.cost ?? 0,
              },
            },
          });
        } else {
          const asset = media?.length
            ? await Promise.all(
                media.map(async (file) => {
                  const formData = transformFileToFormData(file);

                  return await (file.duration != null ? uploadVideo(formData) : uploadImage(formData));
                }),
              )
            : [];

          await createBooking({
            variables: {
              input: {
                transportDistance: params.expense?.distance ?? 0,
                transportDuration: params.expense?.time ?? 0,
                transportFee: params.expense?.cost ?? 0,
                latitude: params.address.lat,
                longitude: params.address.lng,
                mapAddress: params.address.mapAddress,
                mediaIds: asset.map((it) => it.id),
                partnerId: partner.id,
                problems: params.problem?.ids ?? [],
                addressMoreInfo: params.addressDetail,
                description: params.description,
                vehicleId: params.quickAddVehicleData ? undefined : params.vehicleId,
                vehicle: params.quickAddVehicleData,
              },
            },
          });
        }
      } catch (error) {
        /* empty */
      } finally {
        await showFullscreenLoading(false);
      }
    }
  }, [createBooking, data, reCreateBooking, showDialog, showFullscreenLoading, uploadImage, uploadVideo]);

  return {
    submit,
    isLoading: uploadingImage || uploadingVideo || creatingBooking || reCreateBookingLoading,
  };
};
