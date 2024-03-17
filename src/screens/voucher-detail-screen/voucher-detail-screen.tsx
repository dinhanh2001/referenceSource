import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { memo, useCallback } from 'react';
import { RefreshControl, ScrollView, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, ButtonEndVoucher, Space, VoucherStatus, tw } from '../../components';
import { usePartnerGetDiscountCodeQuery } from '../../graphql/queries/partnerGetDiscountCode.generated';
import { DiscountCodeEntity, DiscountCodeUnitEnum } from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { AppRoutes } from '../../navigator-params';
import { ArrowRightSVG } from '../../svg';

import { VoucherDetailScreenNavigationProps, VoucherDetailScreenRouteProps } from './type';

type FieldTitleProps = {
  title: string;
  note?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

type FieldValueProps = {
  value: string | number | undefined;
  containerStyle?: StyleProp<ViewStyle>;
};

const FieldTitle = memo(({ title, note, containerStyle }: FieldTitleProps) => (
  <Text style={[tw`mb-8px text-grayscale-black font-medium`, containerStyle]}>
    {title} {note && <Text style={tw`text-grayscale-gray `}>({note})</Text>}
  </Text>
));

const FieldValue = ({ value = '', containerStyle }: FieldValueProps) => (
  <View style={[tw`border border-grayscale-border py-10px px-4 rounded-1`, containerStyle]}>
    <Text>{value}</Text>
  </View>
);

export const VoucherDetailScreen = memo(() => {
  const navigation = useNavigation<VoucherDetailScreenNavigationProps>();
  const {
    params: { id, isActivities },
  } = useRoute<VoucherDetailScreenRouteProps>();

  const { data, refetch, loading } = usePartnerGetDiscountCodeQuery({
    variables: {
      id,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { name, products, startDate, endDate, unit, value, limit, limitPerAccount, minOrderValue, isAssignAllProduct } =
    data?.partnerGetDiscountCode || {};

  const handleNavigateChooseProduct = useCallback(() => {
    navigation.navigate(AppRoutes.CHOOSE_PRODUCT, {
      isDetail: true,
      listProducts: data?.partnerGetDiscountCode.products?.map((e) => e.id),
      isAll: isAssignAllProduct,
      hideUnSelected: true,
    });
  }, [data?.partnerGetDiscountCode.products, isAssignAllProduct, navigation]);

  const onEdit = useCallback(() => {
    navigation.navigate(AppRoutes.VOUCHER_ADD_SCREEN, {
      isEdit: true,
      data: data?.partnerGetDiscountCode as DiscountCodeEntity,
    });
  }, [data?.partnerGetDiscountCode, navigation]);

  if (loading && !data?.partnerGetDiscountCode) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={tw`flex-1`} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={tw`px-4`}
        scrollIndicatorInsets={{ right: 1 }}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      >
        <View style={tw`flex-row justify-between my-4 items-center`}>
          <FieldTitle title="Trạng thái hoạt động" containerStyle={tw`mb-0`} />
          <VoucherStatus discountStatus={isActivities} item={data?.partnerGetDiscountCode as DiscountCodeEntity} />
        </View>
        <Space backgroundColor={tw.color('grayscale-border')} size={1} />
        <View style={tw`mt-4 mb-5`}>
          <FieldTitle title="Tên chương trình" />
          <FieldValue value={name as string} />
        </View>

        <Space size={8} backgroundColor={tw.color('grayscale-border')} style={tw`-mx-4`} />

        <TouchableOpacity style={tw`flex-row justify-between py-5 items-center`} onPress={handleNavigateChooseProduct}>
          <FieldTitle title="Sản phẩm áp dụng" containerStyle={tw`mb-0`} />
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-grayscale-gray`}>
              {isAssignAllProduct ? 'Tất cả' : products?.length || 0} sản phẩm
            </Text>
            <Space horizontal size={4} />
            <ArrowRightSVG />
          </View>
        </TouchableOpacity>

        <Space size={8} backgroundColor={tw.color('grayscale-border')} style={tw`-mx-4`} />

        <View style={tw`bg-white  mt-8px`}>
          <View style={tw`flex-row justify-between items-center my-4`}>
            <FieldTitle title="Thời gian bắt đầu" containerStyle={tw`mb-0`} />
            <Text>{dayjs(startDate).format('DD/MM/YYYY')}</Text>
          </View>
          <Space backgroundColor={tw.color('grayscale-border')} size={1} />
          <View style={tw`flex-row justify-between items-center my-4`}>
            <FieldTitle title="Thời gian kết thúc" containerStyle={tw`mb-0`} />
            <Text>{dayjs(endDate).format('DD/MM/YYYY')}</Text>
          </View>
        </View>

        <Space size={8} backgroundColor={tw.color('grayscale-border')} style={tw`-mx-4`} />

        <View style={tw`mt-5`}>
          <FieldTitle title="Giá trị Mã khuyến mãi" />
          <FieldValue
            value={unit === DiscountCodeUnitEnum.VND ? `${thousandSeparator(value as number)} VNĐ` : `${value} %`}
          />
        </View>

        <View style={tw`flex-row justify-between mt-4 items-center`}>
          <FieldTitle title="Giới hạn tổng số lượt sử dụng" containerStyle={tw`mb-0`} />
          <FieldValue value={limit ? limit : 'Không giới hạn'} containerStyle={!limit && tw`px-2`} />
        </View>

        <View style={tw`flex-row justify-between mt-4 items-center`}>
          <FieldTitle title="Giới hạn số lượt sử dụng/1 tài khoản" containerStyle={tw`mb-0`} />
          <FieldValue
            value={limitPerAccount ? limitPerAccount : 'Không giới hạn'}
            containerStyle={!limitPerAccount && tw`px-2`}
          />
        </View>

        <View style={tw`flex-row justify-between mt-4 items-center`}>
          <FieldTitle title="Giá trị đơn hàng tối thiểu" containerStyle={tw`mb-0`} />
          <FieldValue value={`${thousandSeparator(minOrderValue as number)} VNĐ`} containerStyle={tw`px-2`} />
        </View>
        <Space size={120} backgroundColor={tw.color('white')} />
      </ScrollView>

      <View style={tw`flex-row mx-4 mt-2 mb-5`}>
        <ButtonEndVoucher isBack item={data?.partnerGetDiscountCode as DiscountCodeEntity} />
        <Space horizontal size={12} />
        <Button title={'Sửa'} containerStyle={tw`flex-1`} onPress={onEdit} />
      </View>
    </SafeAreaView>
  );
});
