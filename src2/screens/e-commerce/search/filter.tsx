import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, ECommerceSearchSectionFilter, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { CloseSvg } from '../../../svg';

import { ECommerceSearchFilterNavigationProps, ECommerceSearchFilterRouteProps } from './type';

export enum SortEnum {
  count = 'quantity',
  price = 'unitPrice',
}
export enum DisplayEnum {
  LIST = 'LIST',
  GRID = 'GRID',
}

export type FormSearchCommerce = {
  sort?: SortEnum;
  display?: DisplayEnum;
};

export const sortItems = [
  {
    title: 'Số lượng đơn đặt hàng',
    value: SortEnum.count,
  },
  {
    title: 'Giá sản phẩm',
    value: SortEnum.price,
  },
];

export const displayItems = [
  {
    title: 'Dạng danh sách',
    value: DisplayEnum.LIST,
  },
  {
    title: 'Dạng lưới',
    value: DisplayEnum.GRID,
  },
];

export const ECommerceSearchFilter = () => {
  const {
    params: { value, onChange },
  } = useRoute<ECommerceSearchFilterRouteProps>();
  const navigation = useNavigation<ECommerceSearchFilterNavigationProps>();

  const { control, reset, handleSubmit, watch, setValue } = useForm<FormSearchCommerce>({
    defaultValues: {
      display: undefined,
      sort: undefined,
    },
  });

  const displayWatch = watch('display');
  const sortWatch = watch('sort');

  useEffect(() => {
    setValue('display', value?.display);
    setValue('sort', value?.sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: FormSearchCommerce) => {
    onChange?.(values);
    navigation.goBack();
  };

  const onReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <SafeAreaView style={tw`flex-1`} edges={['top', 'bottom']}>
      <AppHeader title="Bộ lọc" leftIcon={<CloseSvg width={24} height={24} />} titleStyle={tw`pl-0`} />
      <ScrollView>
        <View style={tw`m-4`}>
          <ECommerceSearchSectionFilter
            data={sortItems}
            name="sort"
            control={control}
            title="Sắp xếp"
            containerStyle={tw`mb-17px`}
          />
          <Space size={1} backgroundColor={'#EEE'} />
          <ECommerceSearchSectionFilter
            data={displayItems}
            name="display"
            control={control}
            title="Hiển thị"
            containerStyle={tw`my-17px`}
          />
        </View>
      </ScrollView>
      <View style={tw`flex-row m-4`}>
        <Button
          title={'Làm lại'}
          type={'outline'}
          onPress={onReset}
          containerStyle={tw`flex-1`}
          buttonStyle={tw`border-grayscale-disabled`}
        />
        <Space size={16} horizontal />
        <Button
          title={'Xem kết quả'}
          onPress={handleSubmit(onSubmit)}
          containerStyle={tw`flex-1`}
          disabled={!sortWatch && !displayWatch}
        />
      </View>
    </SafeAreaView>
  );
};
