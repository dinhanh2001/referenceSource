import { useNavigation } from '@react-navigation/native';
import { Button, Image, Text } from '@rneui/themed';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, Space, tw } from '../../components';
import { useAuth } from '../../contexts';
import { usePartnerProductsQuery } from '../../graphql/queries/partnerProducts.generated';
import { ProductEntity } from '../../graphql/type.interface';
import { thousandSeparator } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { SquareCheckSVG, SquareUncheckSVG } from '../../svg';

import { ChooseProductScreenNavigationProps, PropsType } from './type';

export const ChooseProductScreen: React.FC<PropsType> = memo((params: PropsType) => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<ChooseProductScreenNavigationProps>();
  const { isDetail, handleSelectProducts, listProducts, isMultipleSelect, isAll, hideUnSelected } = params.route.params;
  const { partner } = useAuth();

  const [selectedProducts, setSelectedProducts] = useState<string[]>(listProducts || []);
  const [selectedAll, setSelectedAll] = useState(isAll ?? false);
  const [productName, setProductName] = useState<string>('');
  const [totalSelected, setTotalSelected] = useState(listProducts?.length || 0);
  const { data, refetch } = usePartnerProductsQuery({
    variables: { partnerId: partner?.id as string, limit: 1000 },
    onCompleted: (res) => {
      if (isAll) {
        setSelectedProducts(res.partnerProducts?.items?.map((e) => e.id) as string[]);
        setTotalSelected(res.partnerProducts?.items?.length as number);
      }
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const list = useMemo(() => {
    if (isDetail && hideUnSelected) {
      return data?.partnerProducts?.items?.filter((e) => listProducts?.includes?.(e.id)) as ProductEntity[];
    }

    return (data?.partnerProducts?.items as ProductEntity[]) || [];
  }, [data?.partnerProducts?.items, hideUnSelected, isDetail, listProducts]);

  const handleSelectItem = useCallback(
    (item: ProductEntity) => {
      let totalItem = totalSelected;
      const index = selectedProducts.indexOf(item.id);

      if (isMultipleSelect) {
        if (index > -1) {
          selectedProducts.splice(index, 1);
          setTotalSelected(--totalItem);
          setSelectedAll(false);
        } else {
          selectedProducts.push(item.id);
          setTotalSelected(++totalItem);
          if (totalItem === list?.length) {
            setSelectedAll(true);
          }
        }
        setSelectedProducts(selectedProducts);
      } else {
        setSelectedProducts([item.id]);
        setProductName(item.name);
        setTotalSelected(1);
      }
    },
    [isMultipleSelect, list?.length, selectedProducts, totalSelected],
  );

  const handleSelectAllProduct = useCallback(() => {
    setSelectedAll((p) => {
      if (p) {
        setSelectedProducts([]);
        setTotalSelected(0);
      } else {
        setSelectedProducts(list.map((e) => e.id));
        setTotalSelected(list.length);
      }
      return !p;
    });
  }, [list]);

  const handleReset = useCallback(() => {
    setSelectedProducts([]);
    setTotalSelected(0);
  }, []);

  const handleChooseProduct = useCallback(() => {
    handleSelectProducts && handleSelectProducts([...selectedProducts], productName, selectedAll);
    navigation.goBack();
  }, [handleSelectProducts, navigation, productName, selectedAll, selectedProducts]);

  const renderRightHeader = useMemo(() => {
    return isMultipleSelect ? (
      <TouchableOpacity onPress={handleSelectAllProduct}>
        <Text style={tw`text-primary-dark font-semibold`}>Tất cả</Text>
      </TouchableOpacity>
    ) : (
      <></>
    );
  }, [handleSelectAllProduct, isMultipleSelect]);

  const renderItem = useCallback(
    ({ item }: { item: ProductEntity }) => {
      const selected = selectedProducts.find((e) => e === item.id);

      return (
        <TouchableOpacity style={tw`flex-row items-center`} onPress={() => handleSelectItem(item)} disabled={isDetail}>
          {selected ? <SquareCheckSVG /> : <SquareUncheckSVG />}
          <Space size={12} horizontal />
          <View>
            <Image source={{ uri: item?.avatar?.fullThumbUrl ?? '' }} style={tw`rounded-4px h-80px w-80px`} />
            <View style={tw`absolute`}>
              <StatusProduct isNew={item?.isNew} />
            </View>
          </View>
          <Space size={16} horizontal />
          <View style={tw`flex-1`}>
            <Text numberOfLines={2} style={tw`text-grayscale-black text-13px`}>
              {item?.name}
            </Text>
            <Space size={4} />
            <Text style={tw`text-grayscale-black text-14px font-semibold`}>{thousandSeparator(item.unitPrice)} đ</Text>
            <Space size={4} />
            <Text style={tw`text-grayscale-gray text-11px`}>Số lượng: {item.quantity}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [handleSelectItem, isDetail, selectedProducts],
  );

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 `}>
      <AppHeader
        title={isDetail ? 'Sản phẩm áp dụng' : 'Chọn sản phẩm áp dụng'}
        rightView={isDetail ? null : renderRightHeader}
      />
      <FlatList
        contentContainerStyle={[tw`p-16px`, isDetail && tw`pb-${bottom + 16}px`]}
        data={list}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Space style={tw`my-16px bg-grayscale-border`} size={1} />}
      />

      {isDetail ? (
        <></>
      ) : (
        <View>
          <Space size={150} />
          <View style={tw`absolute  bottom-0 left-0 right-0 pb-40px pt-10px px-16px bg-white`}>
            <View style={tw`flex-row justify-between`}>
              <Text>Đã chọn</Text>
              <Text style={tw`text-grayscale-black text-13px`}>
                {selectedAll ? '' : totalSelected}{' '}
                <Text style={tw`text-grayscale-gray text-12px`}>{selectedAll ? 'Tất cả ' : ''}sản phẩm</Text>
              </Text>
            </View>
            <Space size={12} />
            <View style={tw`flex-row flex-1`}>
              <Button
                title={'Làm lại'}
                type="outline"
                buttonStyle={tw`border-grayscale-disabled`}
                containerStyle={tw`flex-1`}
                onPress={handleReset}
              />
              <Space size={12} horizontal />
              <Button title={'Xác nhận'} containerStyle={tw`flex-1`} onPress={handleChooseProduct} />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
});

type StatusProductProps = {
  isNew?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export const StatusProduct = ({ isNew, containerStyle }: StatusProductProps) => {
  const bg = isNew ? 'blue' : 'grayscale-gray';

  return (
    <View style={[tw`bg-${bg} m-4px py-2px px-6px rounded-9999`, containerStyle]}>
      <Text style={tw`text-white text-9px`}>{isNew ? 'Mới' : 'Qua sử dụng'}</Text>
    </View>
  );
};
