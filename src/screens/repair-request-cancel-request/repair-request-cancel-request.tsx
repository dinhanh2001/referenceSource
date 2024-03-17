import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, Checkbox, TextInput, tw } from '../../components';
import { useAuth, useFullScreenLoading, useOverlay } from '../../contexts';
import { usePartnerCancelBookingMutation } from '../../graphql/mutations/partnerCancelBooking.generated';
import { useCategoriesQuery } from '../../graphql/queries/categories.generated';
import { CategoryTypeEnum, PartnerTypeEnum, StatusEnum } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';
import { UndoRedSVG } from '../../svg';
import { client } from '../../apollo/apollo';
import { PartnerCountItemForEachStatusDocument } from '../../graphql/queries/partnerCountItemForEachStatus.generated';
import { PartnerBookingsDocument } from '../../graphql/queries/partnerBookings.generated';
import { PartnerBookingDocument } from '../../graphql/queries/partnerBooking.generated';

type FormData = {
  note?: string;
  reasons: any;
};

export const RepairRequestCancelRequestScreen = () => {
  const { showDialog } = useOverlay();
  const {
    params: { bookingId, onComplete },
  } = useRoute<RouteProp<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_CANCEL_REQUEST>>();
  const navigation = useNavigation<StackNavigationProp<AppStackNavigatorParamList>>();

  const { data, loading } = useCategoriesQuery({
    variables: { type: CategoryTypeEnum.CANCEL_REASON_BY_PARTNER, limit: 1000, isActive: StatusEnum.ACTIVE },
  });

  const [cancelBooking, { loading: cancelLoading }] = usePartnerCancelBookingMutation({
    onError: (error) => showFlashMessageError(error),
    onCompleted: async () => {
      await showDialog({
        icon: <UndoRedSVG />,
        title: 'Hủy yêu cầu sửa chữa thành công',
        message: 'Bạn đã huỷ yêu cầu sửa chữa thành công',
        confirmText: 'Quay lại',
        type: 'ALERT',
      });
      client.refetchQueries({
        include: [PartnerCountItemForEachStatusDocument, PartnerBookingsDocument, PartnerBookingDocument],
      });

      navigation.goBack();
      onComplete?.();
    },
  });

  const { control, watch } = useForm<FormData>({
    defaultValues: {
      reasons: {},
    },
  });

  const note = watch('note');
  const reasons = watch('reasons');

  const categories = useMemo(() => data?.categories?.items, [data]);

  const { partner } = useAuth();

  const { showFullscreenLoading } = useFullScreenLoading();

  const onSubmit = useCallback(async () => {
    const input = {
      bookingId: bookingId || '',
      note: note?.trim?.() || '',
      reasons: Object.keys(reasons)?.filter?.((key: string) => reasons[key]),
    };

    const res = await showDialog({
      type: 'CONFIRM',
      title: 'Bạn chắc chắn muốn từ chối yêu cầu này?',
      message:
        partner?.type === PartnerTypeEnum.AGENCY
          ? 'Từ chối yêu cầu quá nhiều lần có thể ảnh hưởng đến độ uy tín của Đại lý bạn.'
          : partner?.type === PartnerTypeEnum.FREELANCER_TECHNICIAN
          ? 'Từ chối yêu cầu quá nhiều lần có thể ảnh hưởng đến độ uy tín của bạn.'
          : '',
      confirmText: 'Từ chối yêu cầu',
      cancelText: 'Đóng',
    });

    if (res) {
      await showFullscreenLoading(true);
      try {
        await cancelBooking({
          variables: {
            input,
          },
        });
      } catch (error) {
        //
      }

      await showFullscreenLoading(false);
    }
  }, [bookingId, note, reasons, showDialog, partner?.type, showFullscreenLoading, cancelBooking]);

  const renderContent = useMemo(() => {
    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <>
        <View style={tw`px-4 pt-30px`}>
          {categories?.map?.((item) => (
            <View key={item?.id} style={tw`pb-14px`}>
              <Controller
                name={'reasons'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    title={item?.name}
                    onChange={(selected: boolean) => {
                      onChange({
                        ...value,
                        [item?.id]: selected,
                      });
                    }}
                  />
                )}
              />
            </View>
          ))}
        </View>

        <Controller
          name="note"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={tw`px-4`}>
              <TextInput
                inputContainerStyle={tw`h-62px`}
                containerStyle={tw`mt-18px`}
                renderErrorMessage={false}
                value={value}
                onChangeText={onChange}
                placeholder="Nhập lý do..."
                multiline
                numberOfLines={3}
              />
            </View>
          )}
        />
      </>
    );
  }, [loading, categories, control]);

  return (
    <SafeAreaView style={tw`flex-1`} edges={['bottom']}>
      <ScrollView contentContainerStyle={tw`grow`}>{renderContent}</ScrollView>
      <View style={tw`flex-1 mx-4 justify-end py-12px`}>
        <Button
          disabled={cancelLoading || (!Object.keys(reasons).some((it) => reasons[it] === true) && !note?.trim?.())}
          loading={cancelLoading}
          title={'Xác nhận'}
          onPress={onSubmit}
        />
      </View>
    </SafeAreaView>
  );
};
