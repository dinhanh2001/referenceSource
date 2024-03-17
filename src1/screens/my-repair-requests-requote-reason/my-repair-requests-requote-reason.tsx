import { Button, Text } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ActivityIndicator, AppHeader, Checkbox, TextInput, tw } from '../../components';
import { useOverlay } from '../../contexts';
import { TickCircleGreen } from '../../svg';
import { useUserRejectQuotationMutation } from '../../graphql/mutations/userRejectQuotation.generated';
import { showFlashMessageError } from '../../helpers';
import { client } from '../../apollo/apollo';
import { BookingDocument } from '../../graphql/queries/booking.generated';
import { AppStackNavigatorScreenProps, UseAppStackNavigatorScreenProps } from '../../navigator-params';
import { MyBookingsDocument } from '../../graphql/queries/myBookings.generated';
import { CategoryEntity, CategoryTypeEnum, StatusEnum } from '../../graphql/type.interface';
import { useCategoriesQuery } from '../../graphql/queries/categories.generated';

type FormData = {
  note: string;
  reasons: any;
};

export const MyRepairRequestsRequoteReason = () => {
  const { showDialog } = useOverlay();
  const navigation = useNavigation<UseAppStackNavigatorScreenProps<'my-repair-requests/requote-reason'>>();
  const {
    params: { quotationId },
  } = useRoute<AppStackNavigatorScreenProps<'my-repair-requests/requote-reason'>['route']>();

  const { data, loading: loadingcatefories } = useCategoriesQuery({
    variables: { type: CategoryTypeEnum.CANCEL_QUOTATION_REASON, limit: 1000, isActive: StatusEnum.ACTIVE },
  });

  const [rejectQuotation, { loading }] = useUserRejectQuotationMutation({
    onError: showFlashMessageError,
    onCompleted: async () => {
      const res = await showDialog({
        icon: <TickCircleGreen />,
        title: '',
        message: (
          <View>
            <Text style={tw`text-17px font-bold text-center`}>Yêu cầu báo giá lại thành công</Text>
            <Text style={tw`text-12px text-grayscale-gray text-center`}>{dayjs().format('DD/MM/YYYY HH:mm')}</Text>
          </View>
        ),
        confirmText: 'Đóng',
        type: 'ALERT',
      });
      if (res) {
        //navigate to my repair requests
        client.refetchQueries({
          include: [BookingDocument, MyBookingsDocument],
        });
        navigation.pop(2);
      }
    },
  });

  const { control, watch, handleSubmit } = useForm<FormData>({
    defaultValues: {
      note: '',
      reasons: {},
    },
  });

  const noteWatch = watch('note');
  const reasonsWatch = watch('reasons');

  const onSubmit = useCallback(
    (values: FormData) => {
      const { note, reasons } = values || {};
      const input = {
        quotationId,
        note: note?.trim?.(),
        reasons: Object.keys(values?.reasons)?.filter?.((key: string) => reasons[key]),
      };

      rejectQuotation({
        variables: {
          input,
        },
      });
    },
    [quotationId, rejectQuotation],
  );

  const renderContent = useMemo(() => {
    if (loadingcatefories) {
      return <ActivityIndicator />;
    }

    return (
      <View style={tw`flex-1`}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          {data?.categories?.items?.map?.((item: CategoryEntity) => (
            <View key={item?.id} style={tw`pt-16px mx-16px`}>
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

          <Controller
            name="note"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={tw`px-4`}>
                <TextInput
                  containerStyle={tw`mt-18px`}
                  renderErrorMessage={false}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nhập lý do..."
                  multiline
                  inputContainerStyle={tw`h-62px`}
                />
              </View>
            )}
          />
        </ScrollView>
        <View style={tw`mx-4`}>
          <Button
            disabled={!noteWatch?.trim?.() && !Object.keys(reasonsWatch)?.filter((k) => reasonsWatch?.[k])?.length}
            title={'Yêu cầu gửi lại báo giá'}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />
        </View>
      </View>
    );
  }, [control, data?.categories?.items, handleSubmit, loading, loadingcatefories, noteWatch, onSubmit, reasonsWatch]);

  return (
    <SafeAreaView edges={['bottom', 'top']} style={tw`flex-1`}>
      <AppHeader title="Lý do yêu cầu báo giá lại" />
      {renderContent}
    </SafeAreaView>
  );
};
