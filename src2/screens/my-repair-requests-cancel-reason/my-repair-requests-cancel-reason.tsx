import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, Checkbox, LoadingScreen, TextInput, tw } from '../../components';
import { useOverlay } from '../../contexts';
import { useCategoriesQuery } from '../../graphql/queries/categories.generated';
import { CategoryTypeEnum, StatusEnum } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { AppStackNavigatorParamList, AppStackNavigatorScreenProps } from '../../navigator-params';
import { TickCircleGreen } from '../../svg';
import { useCancelBookingByUserMutation } from '../../graphql/mutations/cancelBookingByUser.generated';

type FormData = {
  note?: string;
  reasons: any;
};

export const MyRepairRequestsCancelReason = () => {
  const { showDialog } = useOverlay();
  const {
    params: { booking, refetch },
  } = useRoute<AppStackNavigatorScreenProps<'my-repair-request/cancel-reason'>['route']>();
  const navigation = useNavigation<StackNavigationProp<AppStackNavigatorParamList>>();

  const { data, loading } = useCategoriesQuery({
    variables: { type: CategoryTypeEnum.CANCEL_REASON, limit: 1000, isActive: StatusEnum.ACTIVE },
  });

  const [cancelBooking, { loading: cancelLoading }] = useCancelBookingByUserMutation({
    onError: (error) => showFlashMessageError(error),
    onCompleted: async () => {
      const res = await showDialog({
        icon: <TickCircleGreen />,
        title: 'Hủy yêu cầu sửa chữa thành công',
        message: 'Cảm ơn bạn đã gửi phản hồi về việc Hủy yêu cầu sửa chữa',
        confirmText: 'Về trang Danh sách sửa chữa',
        cancelText: 'Tìm đơn vị sửa chữa khác',
        type: 'CONFIRM',
        columnAction: true,
      });

      if (res) {
        refetch();
        navigation.goBack();
      } else {
        navigation.navigate('repair-request/select-partner', {
          bookingId: booking.id,
          address: {
            lat: booking.latitude,
            lng: booking.longitude,
            mapAddress: booking.mapAddress ?? '',
          },
          addressDetail: booking.addressMoreInfo ?? '',
          description: booking.description ?? '',
          media: [],
          problem: { ids: [] },
          vehicleId: booking.vehicleId,
        });
      }
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

  const onSubmit = useCallback(() => {
    const input = {
      bookingId: booking.id || '',
      note: note?.trim?.() || '',
      reasons: Object.keys(reasons)?.filter?.((key: string) => reasons[key]),
    };

    cancelBooking({
      variables: {
        input,
      },
    });
  }, [cancelBooking, note, reasons, booking.id]);

  const renderContent = useMemo(() => {
    if (loading) {
      return <LoadingScreen />;
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
        <View style={tw`flex-1 mx-4 justify-end`}>
          <Button
            disabled={cancelLoading || !Object.keys(reasons).some((it) => reasons[it] === true)}
            loading={cancelLoading}
            title={'Xác nhận'}
            onPress={onSubmit}
          />
        </View>
      </>
    );
  }, [loading, categories, control, cancelLoading, reasons, onSubmit]);

  return (
    <SafeAreaView edges={['bottom', 'top']} style={tw`flex-1`}>
      <AppHeader title="Lý do hủy yêu cầu sửa chữa" />
      <ScrollView contentContainerStyle={tw`grow`} keyboardShouldPersistTaps={'handled'}>
        {renderContent}
      </ScrollView>
    </SafeAreaView>
  );
};
