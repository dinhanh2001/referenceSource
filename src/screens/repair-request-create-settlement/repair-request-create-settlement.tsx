import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as zod from 'zod';
import { ZodType } from 'zod';

import { client } from '../../apollo/apollo';
import { PriceInput, Space, Table, TextInput, tw } from '../../components';
import { OPERATING_UNIT, validationMessage } from '../../constants';
import { useOverlay } from '../../contexts';
import { useCreateSettlementMutation } from '../../graphql/mutations/createSettlement.generated';
import { PartnerBookingDocument } from '../../graphql/queries/partnerBooking.generated';
import { usePartnerGetLatestQuotationOfBookingQuery } from '../../graphql/queries/partnerGetLatestQuotationOfBooking.generated';
import { QuotationEntity } from '../../graphql/type.interface';
import { showFlashMessageError, thousandSeparator } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';
import { AddSVG, Sent } from '../../svg';

import {
  AdditionalFee,
  FormCreateSettlement,
  PropsType,
  RepairRequestCreateSettlementScreenNavigationProps,
} from './type';

export const RepairRequestCreateSettlementScreen: React.FC<PropsType> = memo(() => {
  const {
    params: { bookingId, user },
  } = useRoute<RouteProp<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_CREATE_SETTLEMENT>>();
  const navigation = useNavigation<RepairRequestCreateSettlementScreenNavigationProps>();
  const parse = useCallback((str?: string) => parseInt(str || '0', 10), []);
  const { showDialog } = useOverlay();

  const {
    data: dataQuotation,
    loading: loadingQuotation,
    refetch,
  } = usePartnerGetLatestQuotationOfBookingQuery({
    variables: {
      bookingId: bookingId,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const {
    id,
    additionalFees,
    booking,
    estimatedCompleteAt,
    diagnostics,
    operatingNumber,
    operatingUnit,
    diagnosisNote,
    accessories,
    transportFee,
    diagnosisFee,
    repairFee,
  } = dataQuotation?.partnerGetLatestQuotationOfBooking as QuotationEntity;

  const additionalSchema: ZodType<AdditionalFee> = useMemo(
    () =>
      zod.object({
        name: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
        amount: zod.string({ required_error: validationMessage.required }).nonempty(validationMessage.required),
      }),
    [],
  );

  const validationSchema: ZodType<FormCreateSettlement> = useMemo(
    () =>
      zod.object({
        additional: zod.array(additionalSchema),
      }),
    [additionalSchema],
  );

  const [createSettlement, { loading }] = useCreateSettlementMutation({
    onError: showFlashMessageError,
    onCompleted: async (result) => {
      const res = await showDialog({
        icon: <Sent />,
        title: 'Gửi quyết toán thành công',
        message: `Quyết toán này đã được gửi đến khách hàng ${result?.createSettlement?.quotation.booking?.user?.fullname}. Mã quyết toán ${result.createSettlement.id}`,
        confirmText: 'Về trang chi tiết',
        type: 'ALERT',
        columnAction: true,
      });

      if (res) {
        client.refetchQueries({
          include: [PartnerBookingDocument],
        });
        navigation.pop(2);
      }
    },
  });

  const {
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormCreateSettlement>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      additional: additionalFees?.map?.((item) => ({
        name: item.name,
        amount: item.amount.toString(),
      })),
    },
  });
  const {
    fields: fieldAdditional,
    append: appendAdditional,
    remove: removeAdditional,
  } = useFieldArray({
    control,
    name: 'additional',
  });

  const additional = watch('additional');

  useEffect(() => {
    if (!loadingQuotation && !!additionalFees?.length) {
      setValue(
        'additional',
        additionalFees?.map?.((item) => ({
          name: item.name,
          amount: item.amount.toString(),
        })),
      );
    }
  }, [additionalFees, loadingQuotation, setValue]);

  const onSubmit = useCallback(async () => {
    await createSettlement({
      variables: {
        input: {
          quotationId: id ?? '',
          additionalFees: additional?.map?.((item) => ({
            name: item?.name,
            amount: parse(item?.amount),
          })),
        },
      },
    });
  }, [additional, createSettlement, id, parse]);

  return (
    <View style={tw`flex-1`}>
      <ScrollView refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}>
        <View style={tw`justify-center items-center mt-8px mb-16px`}>
          <Text style={tw`text-16px font-semibold`}>{booking?.code}</Text>
          <Text style={tw`text-12px text-grayscale-gray`}>
            {dayjs(booking?.createdAt).format('DD/MM/YYYY')} -{dayjs(estimatedCompleteAt).format('DD/MM/YYYY')}
          </Text>
        </View>
        <Space style={tw`bg-grayscale-border`} size={6} />
        <View style={tw`p-16px`}>
          <Text style={tw`font-semibold`}>I. THÔNG TIN CHUNG</Text>
          <Space size={12} />
          <Text style={tw`font-semibold`}>1. Thông tin khách hàng</Text>
          <Space size={12} />
          <Table data={[{ 'Họ và tên': user.fullname }, { 'Số điện thoại': user.phone }]} />
          <Space size={12} />
          <Text style={tw`font-semibold`}>2. Thông tin xe gặp sự cố</Text>
          <Space size={12} />
          <Table
            data={[
              { 'Tên xe': booking?.vehicle?.name },
              {
                'Biển kiểm soát': booking.vehicle.vehicleRegistrationPlate,
              },
              { 'Vị trí xe': `${booking.vehicle.addressMoreInfo} ${booking?.vehicle?.mapAddress}` },
            ]}
          />
          <Space size={12} />
          <Text style={tw`font-semibold`}>3. Chẩn đoán</Text>
          <Space size={12} />
          <Table
            data={[
              {
                'Đã vận hành': `${operatingNumber} ${operatingUnit && OPERATING_UNIT?.[operatingUnit]}`,
              },
              diagnostics?.map?.((item) => ({
                [item?.diagnosticCode]: `${thousandSeparator(item?.expense || 0)} đ`,
              })),
              { 'Ghi chú': diagnosisNote },
              {
                'Dự kiến thời gian hoàn thành': dayjs(estimatedCompleteAt).format('DD/MM/YYYY'),
              },
            ].flat()}
          />
          <Space size={12} />
          <Space size={6} style={tw`-mx-16px my-16px`} backgroundColor={tw.color('bg-grayscale-border')} />
          <Text style={tw`font-semibold`}>II. THÔNG TIN CHI PHÍ</Text>
          <Space size={12} />
          <Text style={tw`font-semibold`}>1. Vật tư phụ tùng</Text>
          <Space size={12} />
          <Table
            right
            data={accessories?.map?.((item) => ({
              [item?.name]: `${thousandSeparator(item?.unitPrice)} đ`,
              moreInfo: `x${item?.quantity} ${item?.unit}`,
            }))}
          />
          <Space size={12} />
          <Text style={tw`font-semibold`}>2. Chi phí công dịch vụ</Text>
          <Space size={12} />
          <Table
            right
            data={[
              {
                'Phí di chuyển': `${transportFee && thousandSeparator(transportFee)} đ`,
              },
              {
                'Phí chẩn đoán': `${diagnosisFee && thousandSeparator(diagnosisFee)} đ`,
              },
              {
                'Phí sửa chữa, thay thế': `${repairFee && thousandSeparator(repairFee)} đ`,
              },
            ]}
          />
          <Space size={12} />
          <Text style={tw`font-semibold`}>3. Chi phí phát sinh</Text>
          <Space size={12} />
          {additional && (
            <FlatList
              data={fieldAdditional}
              scrollEnabled={false}
              renderItem={({ index }) => {
                return (
                  <View style={tw`border border-grayscale-border p-16px rounded-4px mt-16px`} key={index}>
                    <Controller
                      name={`additional.${index}.name`}
                      control={control}
                      render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          label={'Tên chi phí'}
                          labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                          placeholder="Nhập tên chi phí"
                          errorMessage={errors?.additional?.[index]?.name?.message}
                        />
                      )}
                    />

                    <Controller
                      name={`additional.${index}.amount`}
                      control={control}
                      render={({ field: { onBlur, onChange, value } }) => (
                        <PriceInput
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          label="Số tiền"
                          labelStyle={tw`text-grayscale-black font-medium mb-8px`}
                          placeholder="Nhập số tiền"
                          errorMessage={errors?.additional?.[index]?.amount?.message}
                        />
                      )}
                    />

                    {additional?.length > 1 && (
                      <>
                        <Space backgroundColor={tw.color('grayscale-border')} size={1} />
                        <Space />
                        <TouchableOpacity
                          style={tw`rounded-4px border border-error px-16px py-8px self-end`}
                          onPress={() => removeAdditional(index)}
                        >
                          <Text style={tw`text-error`}>Xoá</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                );
              }}
            />
          )}
          <Space />
          <TouchableOpacity
            style={tw`bg-primary self-start rounded-4px py-7px px-12px flex-row justify-center items-center`}
            onPress={() => {
              appendAdditional({ name: '', amount: '' });
            }}
          >
            <AddSVG />
            <Space size={8} horizontal />
            <Text style={tw`text-12px font-medium`}>Thêm chi phí phát sinh</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={tw` pt-10px pb-40px px-16px border border-grayscale-border`}>
        <Button title={'Gửi quyết toán'} onPress={handleSubmit(onSubmit)} loading={loading} disabled={loading} />
      </View>
    </View>
  );
});
