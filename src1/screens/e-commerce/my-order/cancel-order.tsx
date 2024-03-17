import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { client } from '../../../apollo/apollo';
import { ActivityIndicator, Checkbox, TextInput, tw } from '../../../components';
import { useOverlay } from '../../../contexts';
import { useCancelOrderMutation } from '../../../graphql/mutations/cancelOrder.generated';
import { useCategoriesQuery } from '../../../graphql/queries/categories.generated';
import { CountOrderItemForEachStatusDocument } from '../../../graphql/queries/countOrderItemForEachStatus.generated';
import { MyOrdersDocument } from '../../../graphql/queries/myOrders.generated';
import { CategoryTypeEnum, StatusEnum } from '../../../graphql/type.interface';
import { showFlashMessageError } from '../../../helpers';
import { TickCircleGreen } from '../../../svg';
import { useRefreshByUser } from '../../../hooks';

import { ECommerceMyOrderCancelTabRouteProp, ECommerceMyOrderNavigationProp } from './type';

type FormData = {
  note?: string;
  reasons: any;
};

export const ECommerceCancelOrder = () => {
  const { showDialog } = useOverlay();
  const {
    params: { orderId },
  } = useRoute<ECommerceMyOrderCancelTabRouteProp>();
  const navigation = useNavigation<ECommerceMyOrderNavigationProp>();

  const [cancelOrder, { loading: loadingCancel }] = useCancelOrderMutation({
    onCompleted: async () => {
      client.refetchQueries({
        include: [MyOrdersDocument, CountOrderItemForEachStatusDocument],
      });
      const res = await showDialog({
        icon: <TickCircleGreen />,
        title: 'Hủy đơn hàng thành công',
        message: 'Cảm ơn bạn đã gửi phản hồi về việc Hủy đơn hàng',
        confirmText: 'Quay lại',
        type: 'ALERT',
        columnAction: true,
      });

      if (res) {
        navigation.goBack();
      }
    },
    onError: showFlashMessageError,
  });
  const { data, loading, refetch } = useCategoriesQuery({
    variables: { type: CategoryTypeEnum.CANCEL_ORDER_REASON_BY_USER, limit: 1000, isActive: StatusEnum.ACTIVE },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const categories = useMemo(() => data?.categories?.items, [data]);

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      reasons: {},
    },
  });
  const reasonsWatch = watch('reasons');
  const noteWatch = watch('note');

  const onSubmit = ({ note, reasons }: FormData) => {
    const input = {
      orderId,
      reasons: Object.keys(reasons)?.filter?.((key: string) => reasons[key]),
      note: note?.trim?.() || '',
    };

    cancelOrder({
      variables: { input },
    });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
      <ScrollView
        contentContainerStyle={tw`grow`}
        keyboardShouldPersistTaps={'handled'}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      >
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
      </ScrollView>
      <View style={tw` mx-4 justify-end`}>
        <Button
          disabled={loadingCancel || (!Object.keys(reasonsWatch).some((it) => reasonsWatch[it] === true) && !noteWatch)}
          loading={loadingCancel}
          title={'Xác nhận'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  );
};
