import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useCategoriesQuery } from '../../graphql/queries/categories.generated';
import { CategoryEntity, CategoryTypeEnum, StatusEnum } from '../../graphql/type.interface';
import { AfterInteraction, TextInput, tw } from '../../components';
import { useUserRejectSettlementMutation } from '../../graphql/mutations/userRejectSettlement.generated';
import { showFlashMessageError } from '../../helpers';
import { CheckSVG, Sent } from '../../svg';
import { useOverlay } from '../../contexts';
import { client } from '../../apollo/apollo';
import { BookingDocument } from '../../graphql/queries/booking.generated';

import { ReSettlementReasonNavigationProps, ReSettlementReasonRouteProps } from './type';

type FormData = {
  note: string;
  reason: any;
};

export const MyRepairRequestsReSettlementReason = () => {
  const { showDialog } = useOverlay();
  const {
    params: { settlementId },
  } = useRoute<ReSettlementReasonRouteProps>();
  const navigation = useNavigation<ReSettlementReasonNavigationProps>();

  const [reject, { loading }] = useUserRejectSettlementMutation({
    onError: showFlashMessageError,
    onCompleted: async () => {
      const res = await showDialog({
        type: 'ALERT',
        icon: <Sent />,
        message: '',
        title: 'Yêu cầu quyết toán lại thành công',
        confirmText: 'Đóng',
      });

      client.refetchQueries({
        include: [BookingDocument],
      });

      if (res) {
        navigation.pop(2);
      }
    },
  });

  const { data, loading: loadingcatefories } = useCategoriesQuery({
    variables: { type: CategoryTypeEnum.CANCEL_QUOTATION_REASON, limit: 1000, isActive: StatusEnum.ACTIVE },
  });

  const { control, watch, handleSubmit } = useForm<FormData>({
    defaultValues: {
      note: '',
      reason: '',
    },
  });

  const noteWatch = watch('note');
  const reasonWatch = watch('reason');

  const onSubmit = useCallback(
    (form: FormData) => {
      reject({
        variables: {
          input: {
            reason: form?.note || form?.reason || '',
            settlementId,
          },
        },
      });
    },
    [reject, settlementId],
  );

  return (
    <AfterInteraction forceShow={loadingcatefories && !data?.categories?.items?.length}>
      <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          {data?.categories?.items?.map?.((item: CategoryEntity) => (
            <View key={item?.id}>
              <Controller
                name={'reason'}
                control={control}
                render={({ field: { onChange, value } }) => {
                  const selected = value === item?.id;
                  return (
                    <TouchableOpacity style={tw`flex-row justify-between mx-4 py-2`} onPress={() => onChange(item?.id)}>
                      <Text style={tw`font-normal`}>{item?.name}</Text>
                      <View
                        style={[
                          tw`w-5 h-5 rounded-full border border-grayscale-disabled justify-center items-center`,
                          selected && tw`bg-primary border-primary`,
                        ]}
                      >
                        {selected && <CheckSVG />}
                      </View>
                    </TouchableOpacity>
                  );
                }}
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
            disabled={!noteWatch?.trim?.() && !reasonWatch}
            title={'Yêu cầu gửi lại báo giá'}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </AfterInteraction>
  );
};
