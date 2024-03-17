import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';

import { TechnicianDetailScreenNavigationProps } from '..';
import { RowWithTwoCells, tw } from '../../../components';
import { AppRoutes } from '../../../navigator-params';

type ItemType = 'history' | 'receipt' | 'review';

type Props = {
  itemType: ItemType;
};

export const TableItem: React.FC<Props> = memo(({ itemType }: Props) => {
  const isHistory = itemType === 'history';
  const isReceipt = itemType === 'receipt';
  const isReview = itemType === 'review';
  const navigation = useNavigation<TechnicianDetailScreenNavigationProps>();

  const navigateToRepairDetail = useCallback(() => {
    navigation.navigate(AppRoutes.TECHNICIAN_REPAIR_DETAIL_SCREEN, { repairDetailID: '123' });
  }, [navigation]);
  const navigateToReceiptDetail = useCallback(() => {
    navigation.navigate(AppRoutes.TECHNICIAN_RECEIPT_DETAIL_SCREEN, { receiptId: '123' });
  }, [navigation]);

  return (
    <View style={tw`border-t border-r border-l border-grayscale-border`}>
      <RowWithTwoCells
        leftValue={'Mã yêu cầu'}
        rightValue={'#YCSC0000000001'}
        spacerColor={tw.color('white')}
        bgColorLeft={tw`bg-grayscale-border`}
        bgColorRight={tw`bg-grayscale-border`}
      />
      <RowWithTwoCells leftValue={'Khách hàng'} rightValue={'Nguyễn Văn F - 0987654321'} />
      <RowWithTwoCells
        leftValue={'Trạng thái'}
        rightValue={<Text style={tw`text-status-success mx-16px my-10px`}>Hoàn thành</Text>}
      />
      <RowWithTwoCells leftValue={'Thời gian'} rightValue={isReview ? '17/02/2023 12:40' : 'Tuyệt vời'} />
      {(isHistory || !isReceipt) && !isReview && (
        <RowWithTwoCells leftValue={'Tổng chi phí'} rightValue={'4.500.000 đ'} />
      )}
      {(isHistory || isReceipt) && (
        <RowWithTwoCells leftValue={'Phương thức thanh toán'} rightValue={'Thẻ ngân hàng'} />
      )}
      {(isHistory || !isReceipt) && !isReview && (
        <RowWithTwoCells leftValue={'Chi phí cho KTV'} rightValue={'700.000 đ'} />
      )}
      {isReview && <RowWithTwoCells leftValue={'Thái độ'} rightValue={'Tuyệt vời'} />}
      {isReview && <RowWithTwoCells leftValue={'Chẩn đoán'} rightValue={'Tuyệt vời'} />}

      {(isHistory || isReceipt) && (
        <RowWithTwoCells
          leftValue={
            // show when status = Hoàn thành
            <Button
              buttonStyle={tw`rounded-0 bg-grayscale-gray`}
              titleStyle={tw`text-white`}
              style={tw`border-white border-l border-t border-b`}
            >
              Xuất hoá đơn
            </Button>
          }
          rightValue={
            <Button
              buttonStyle={tw`rounded-0`}
              style={tw`border-white border-l border-t border-b`}
              onPress={isReceipt ? navigateToReceiptDetail : navigateToRepairDetail}
            >
              Xem chi tiết
            </Button>
          }
        />
      )}
    </View>
  );
});
