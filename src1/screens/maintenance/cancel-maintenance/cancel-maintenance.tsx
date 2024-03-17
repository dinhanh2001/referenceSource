import { Button } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Checkbox, LoadingScreen, TextInput, tw } from '../../../components';
import { useCategoriesQuery } from '../../../graphql/queries/categories.generated';
import { CategoryTypeEnum, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';
import { useCancelMaintenanceMutation } from '../../../graphql/mutations/cancelMaintenance.generated';
import { client } from '../../../apollo/apollo';
import { useOverlay } from '../../../contexts';
import { TickCircleGreen } from '../../../svg';
import { showFlashMessageError } from '../../../helpers';
import { MaintenanceDocument } from '../../../graphql/queries/maintenance.generated';

import { CancelMaintenanceNavigationProp, CancelMaintenanceRouteProp } from './type';

type FormData = {
  note?: string;
  reasons: any;
};

export const CancelMaintenanceScreen = () => {
  const { showDialog } = useOverlay();
  const {
    params: { maintenanceId },
  } = useRoute<CancelMaintenanceRouteProp>();
  const navigation = useNavigation<CancelMaintenanceNavigationProp>();

  const { data, loading, refetch } = useCategoriesQuery({
    variables: { type: CategoryTypeEnum.CANCEL_MAINTENANCE_REASON, limit: 1000, isActive: StatusEnum.ACTIVE },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const [createCancel, { loading: loadingCancel }] = useCancelMaintenanceMutation({
    onCompleted: async () => {
      client.refetchQueries({
        include: [MaintenanceDocument],
      });
      const res = await showDialog({
        icon: <TickCircleGreen />,
        title: 'Hủy bảo dưỡng thành công',
        message: 'Cảm ơn bạn đã gửi phản hồi về việc Hủy bảo dưỡng',
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

  const { control, watch, handleSubmit } = useForm<FormData>({
    defaultValues: {
      reasons: {},
    },
  });

  const noteWatch = watch('note');
  const reasonsWatch = watch('reasons');

  const categories = useMemo(() => data?.categories?.items, [data]);

  const onSubmit = useCallback(
    ({ reasons, note }: FormData) => {
      createCancel({
        variables: {
          input: {
            maintenanceId,
            reasons: Object.keys(reasons)?.filter?.((key: string) => reasons[key]),
            note: note?.trim?.(),
          },
        },
      });
    },
    [maintenanceId, createCancel],
  );

  if (loading && !data?.categories?.items?.length) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
      <ScrollView
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
      <View style={tw` m-4 mt-2`}>
        <Button
          disabled={!noteWatch?.trim?.() && !Object.keys(reasonsWatch).some((it) => reasonsWatch[it] === true)}
          title={'Xác nhận'}
          onPress={handleSubmit(onSubmit)}
          loading={loadingCancel}
        />
      </View>
    </SafeAreaView>
  );
};
