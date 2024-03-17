import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { memo, useCallback, useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import { client } from '../../apollo/apollo';
import { Space, Table, tw } from '../../components';
import { useOverlay } from '../../contexts';
import { useCreateQuotationMutation } from '../../graphql/mutations/createQuotation.generated';
import { PartnerBookingDocument } from '../../graphql/queries/partnerBooking.generated';
import { useQuotationPriceListsQuery } from '../../graphql/queries/quotationPriceLists.generated';
import { OperatingUnitEnum, StatusEnum } from '../../graphql/type.interface';
import { showFlashMessageError, thousandSeparator } from '../../helpers';
import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';
import { Sent } from '../../svg';

import { PropsType, RepairRequestQuotationConfirmScreenNavigationProps } from './type';

type ScreenRouteProp = RouteProp<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_QUOTATION_CONFIRM_SCREEN>;

export const RepairRequestQuotationConfirmScreen: React.FC<PropsType> = memo(() => {
  const navigation = useNavigation<RepairRequestQuotationConfirmScreenNavigationProps>();
  const { showDialog } = useOverlay();
  const { data: dataDiagnostic } = useQuotationPriceListsQuery({
    variables: {
      isActive: StatusEnum.ACTIVE,
      limit: 1000,
    },
  });

  const [createQuotation, { loading }] = useCreateQuotationMutation({
    onError: showFlashMessageError,
    onCompleted: async (result) => {
      const res = await showDialog({
        icon: <Sent />,
        title: 'Gửi báo giá thành công',
        message: `Bạn đã gửi báo giá đến khách hàng ${result?.createQuotation?.booking?.user?.fullname}. Vui lòng chờ phản hồi từ Khách hàng`,
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

  const routes = useRoute<ScreenRouteProp>();
  const { bookingId, data } = routes?.params || {};

  const {
    operatingNumber,
    operatingUnit,
    diagnostics,
    diagnosisNote,
    estimatedCompleteAt,
    accessory,
    transportFee,
    diagnosticFee,
    repairFee,
    additional: _additional,
  } = data || {};

  const diagnosticsMapping = useMemo(() => {
    return diagnostics?.map?.((it) => {
      const item = dataDiagnostic?.quotationPriceLists?.items?.find?.((i) => i?.id === it?.quotationPriceListId);
      return {
        diagnosticCode: item?.diagnosticCode as string,
        expense: item?.fixable ? it?.expense : item?.expense,
      };
    });
  }, [dataDiagnostic?.quotationPriceLists?.items, diagnostics]);

  const additional = useMemo(
    () => _additional?.filter?.((item) => item?.additionalFeeAmount && item?.additionalFeeName),
    [_additional],
  );

  const parse = useCallback((str?: string) => parseInt(str || '0', 10), []);

  const total = useMemo(() => {
    const diagnosticTotal = diagnosticsMapping
      ?.map?.((item) => parse(item?.expense as string))
      ?.reduce?.((a, c) => a + c, 0);

    const accessoryTotal = accessory
      ?.map?.((item) => parse(item?.accessoryUnitPrice) * parse(item?.accessoryQuantity))
      ?.reduce?.((a, c) => a + c, 0);

    const additionalTotal = additional?.map?.((item) => parse(item?.additionalFeeAmount))?.reduce?.((a, c) => a + c, 0);

    return (
      accessoryTotal + parse(transportFee) + parse(diagnosticFee) + parse(repairFee) + additionalTotal + diagnosticTotal
    );
  }, [accessory, additional, diagnosticFee, diagnosticsMapping, parse, repairFee, transportFee]);

  const onSubmit = useCallback(async () => {
    await createQuotation({
      variables: {
        input: {
          bookingId,
          operatingNumber: parse(operatingNumber),
          estimatedCompleteAt: estimatedCompleteAt,
          accessories: accessory?.map?.((item) => ({
            name: item?.accessoryName,
            unit: item?.accessoryUnit,
            unitPrice: parse(item?.accessoryUnitPrice),
            quantity: parse(item?.accessoryQuantity),
            available: item?.accessoryAvailable,
          })),
          transportFee: parse(transportFee),
          diagnosisFee: parse(diagnosticFee),
          repairFee: parse(repairFee),
          additionalFees: additional?.map?.((item) => ({
            name: item?.additionalFeeName,
            amount: parse(item?.additionalFeeAmount),
          })) as any,
          diagnostics: diagnostics?.map?.(({ fixable: _fixable, ...item }) => ({
            ...item,
            workingHour: parse(item?.workingHour),
            expense: parse(item?.expense),
          })),
          operatingUnit: operatingUnit as OperatingUnitEnum,
          diagnosisNote,
        },
      },
    });
  }, [
    accessory,
    additional,
    bookingId,
    createQuotation,
    diagnosisNote,
    diagnosticFee,
    diagnostics,
    estimatedCompleteAt,
    operatingNumber,
    operatingUnit,
    parse,
    repairFee,
    transportFee,
  ]);

  return (
    <View style={tw`flex-1`}>
      <ScrollView style={tw`p-16px`}>
        <Text style={tw`font-semibold`}>I. CHẨN ĐOÁN</Text>
        <Space size={12} />
        <Table
          data={[
            diagnosticsMapping?.map?.((item) => ({
              [item?.diagnosticCode]: `${thousandSeparator(item?.expense || 0)} đ`,
            })),
            { 'Ghi chú': diagnosisNote },
            { 'Dự kiến thời gian hoàn thành': dayjs(estimatedCompleteAt).format('DD/MM/YYYY') },
          ].flat()}
        />
        <Space size={6} style={tw`-mx-16px my-16px`} backgroundColor={tw.color('bg-grayscale-border')} />
        <Text style={tw`font-semibold`}>II. BÁO GIÁ SỬA CHỮA</Text>
        <Space size={12} />
        <Text style={tw`font-semibold`}>1. Vật tư phụ tùng</Text>
        <Space size={12} />
        <Table
          right
          data={accessory?.map?.((item) => ({
            [item?.accessoryName]: `${thousandSeparator(item?.accessoryUnitPrice)} đ`,
            moreInfo: `x${item?.accessoryQuantity} ${item?.accessoryUnit}`,
          }))}
        />
        <Space size={12} />
        <Text style={tw`font-semibold`}>2. Chi phí công dịch vụ</Text>
        <Space size={12} />
        <Table
          right
          data={[
            { 'Phí di chuyển': `${thousandSeparator(transportFee)} đ` },
            { 'Phí chẩn đoán': `${thousandSeparator(diagnosticFee)} đ` },
            { 'Phí sửa chữa, thay thế': `${thousandSeparator(repairFee)} đ` },
          ]}
        />
        {!!additional && additional?.length > 0 && (
          <>
            <Space size={12} />
            <Text style={tw`font-semibold`}>3. Chi phí phát sinh</Text>
            <Space size={12} />
            <Table
              right
              data={additional?.map?.((item: any) => ({
                [item?.additionalFeeName]: `${thousandSeparator(item?.additionalFeeAmount)} đ`,
              }))}
            />
          </>
        )}
        <Space size={40} />
      </ScrollView>

      <View style={tw` pt-10px pb-40px px-16px border border-grayscale-border`}>
        <View style={tw`flex-row justify-between mb-8px`}>
          <Text style={tw`text-13px`}>Tổng chi phí</Text>
          <Text style={tw`text-17px font-semibold`}>{`${thousandSeparator(total)} đ`}</Text>
        </View>
        <Button title={'Gửi cho khách hàng'} onPress={onSubmit} loading={loading} />
      </View>
    </View>
  );
});
