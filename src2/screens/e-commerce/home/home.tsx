import { useNavigation } from '@react-navigation/native';
import { Badge, Button } from '@rneui/themed';
import { useCallback, useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, ListProductHorizontal, SearchInput, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { useCountOrderItemForEachStatusQuery } from '../../../graphql/queries/countOrderItemForEachStatus.generated';
import { useMyCartQuery } from '../../../graphql/queries/myCart.generated';
import { useUserProductsQuery } from '../../../graphql/queries/userProducts.generated';
import { OrderStatusEnum, ProductEntity, ProductTypeEnum, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';
import { CarBattery, CartIcon, ListAddSVG, ReceiptItem, RoadRoller, WorkingHours } from '../../../svg';

import { ECommerceHomeNavigationProp } from './type';

const LIMIT_ITEMS = 4;

export const ECommerceHome = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<ECommerceHomeNavigationProp>();
  const { data: myCart, refetch: refetchMyCart } = useMyCartQuery();
  const { data: dataOrder, refetch: refetchOrder } = useCountOrderItemForEachStatusQuery();

  const totalCart = useMemo(() => {
    const total = myCart?.myCart?.items?.reduce?.((a) => a + 1, 0) || 0;
    if (total > 99) {
      return '99+';
    }
    return total;
  }, [myCart?.myCart?.items]);

  const totalOrder = useMemo(
    () =>
      dataOrder?.countOrderItemForEachStatus?.reduce?.(
        (acc, cur) =>
          (acc += [OrderStatusEnum.WAIT_FOR_CONFIRM, OrderStatusEnum.SHIPPING, OrderStatusEnum.DELIVERED]?.includes(
            cur?.status,
          )
            ? cur?.totalItem
            : 0),
        0,
      ),
    [dataOrder?.countOrderItemForEachStatus],
  );

  const {
    data: dataNew,
    loading: loadingNew,
    refetch: refetchNew,
  } = useUserProductsQuery({
    variables: { limit: LIMIT_ITEMS, isNew: true, type: ProductTypeEnum.VEHICLE, isActive: StatusEnum.ACTIVE },
  });
  const {
    data: dataUsed,
    loading: loadingUsed,
    refetch: refetchUsed,
  } = useUserProductsQuery({
    variables: { limit: LIMIT_ITEMS, isNew: false, type: ProductTypeEnum.VEHICLE, isActive: StatusEnum.ACTIVE },
  });
  const {
    data: accessories,
    loading: loadingAccessory,
    refetch: refetchAccessory,
  } = useUserProductsQuery({
    variables: { limit: LIMIT_ITEMS, type: ProductTypeEnum.ACCESSARY, isActive: StatusEnum.ACTIVE },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    refetchNew();
    refetchUsed();
    refetchAccessory();
    refetchMyCart();
    refetchOrder();
  });

  const onNavigateNewVehicle = useCallback(() => {
    navigation.navigate('e-commerce/product-list', {
      title: 'Máy mới',
      variables: {
        isNew: true,
        type: ProductTypeEnum.VEHICLE,
      },
    });
  }, [navigation]);
  const onNavigateOldVehicle = useCallback(() => {
    navigation.navigate('e-commerce/product-list', {
      title: 'Đã qua sử dụng',
      variables: {
        isNew: false,
        type: ProductTypeEnum.VEHICLE,
      },
    });
  }, [navigation]);
  const onNavigateAccessory = useCallback(() => {
    navigation.navigate('e-commerce/product-list', {
      title: 'Phụ tùng',
      variables: {
        type: ProductTypeEnum.ACCESSARY,
      },
    });
  }, [navigation]);

  const list1 = useMemo(
    () => [
      {
        title: 'Máy mới',
        icon: <RoadRoller />,
        onPress: onNavigateNewVehicle,
      },
      {
        title: 'Đã qua sử dụng',
        icon: <WorkingHours />,
        onPress: onNavigateOldVehicle,
      },
      {
        title: 'Phụ tùng',
        icon: <CarBattery />,
        onPress: onNavigateAccessory,
      },
    ],
    [onNavigateAccessory, onNavigateNewVehicle, onNavigateOldVehicle],
  );

  const onSearch = () => {
    navigation.navigate('e-commerce/search');
  };

  const renderHeader = useMemo(() => {
    return (
      <View style={tw`bg-primary pt-${top}px pb-34px`}>
        <AppHeader
          // title="Mua sắm"
          centerView={
            <View style={tw`flex-1 `}>
              <Text style={tw`text-17px font-semibold`}>Mua sắm</Text>
            </View>
          }
          rightView={
            <View style={tw`flex-row`}>
              <View>
                <TouchableOpacity
                  style={tw`bg-white rounded-full w-8 h-8 items-center justify-center`}
                  onPress={() => navigation.navigate('e-commerce/price-request')}
                >
                  <ListAddSVG width={16} height={16} />
                </TouchableOpacity>
              </View>
              <View style={tw`mx-3`}>
                <Button
                  radius="xl"
                  type="solid"
                  buttonStyle={tw`bg-white w-8 h-8 rounded-4`}
                  icon={<CartIcon />}
                  onPress={() => navigation.navigate('e-commerce/cart')}
                />
                <View style={tw`absolute right--1 top--1`}>
                  <Badge value={totalCart || 0} badgeStyle={tw`bg-blue`} textStyle={tw`text-10px`} />
                </View>
              </View>
              <TouchableOpacity
                style={tw`bg-white py-2 px-3 rounded-full flex-row gap-2 items-center`}
                onPress={() => navigation.navigate('e-commerce/my-order')}
              >
                <ReceiptItem />
                <Text style={tw`text-3 text-grayscale-black`}>{`Đơn hàng (${totalOrder || 0})`}</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }, [navigation, top, totalCart, totalOrder]);

  const renderContent = useMemo(() => {
    if (
      (loadingAccessory && !dataNew?.userProducts?.items?.length) ||
      (loadingNew && !dataUsed?.userProducts?.items?.length) ||
      (loadingUsed && !accessories?.userProducts?.items?.length)
    ) {
      return <ActivityIndicator />;
    }

    return (
      <ScrollView refreshControl={<RefreshControl onRefresh={refetchByUser} refreshing={isRefetchingByUser} />}>
        <View style={tw`pt-28px`}>
          <ScrollView
            scrollIndicatorInsets={{ right: 1 }}
            contentContainerStyle={tw`gap-3 px-4`}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
          >
            {list1.map((el, idx) => (
              <TouchableOpacity key={idx} onPress={el.onPress}>
                <View style={tw`bg-primary-light flex-row flex-center h-12 p-3`}>
                  {el.icon}
                  <Text> {el.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ListProductHorizontal
            title="Máy mới"
            data={dataNew?.userProducts?.items as ProductEntity[]}
            onPress={onNavigateNewVehicle}
          />

          <ListProductHorizontal
            title="Đã qua sử dụng"
            data={dataUsed?.userProducts?.items as ProductEntity[]}
            onPress={onNavigateOldVehicle}
          />

          <ListProductHorizontal
            title="Phụ tùng"
            data={accessories?.userProducts?.items as ProductEntity[]}
            onPress={onNavigateAccessory}
          />

          <Space size={74} />
        </View>
      </ScrollView>
    );
  }, [
    loadingAccessory,
    dataNew?.userProducts?.items,
    loadingNew,
    dataUsed?.userProducts?.items,
    loadingUsed,
    accessories?.userProducts?.items,
    refetchByUser,
    isRefetchingByUser,
    list1,
    onNavigateNewVehicle,
    onNavigateOldVehicle,
    onNavigateAccessory,
  ]);

  return (
    <View style={tw`flex-1`}>
      {renderHeader}
      <SearchInput
        placeholder="Nhập tên sản phẩm"
        containerStyle={[tw`mx-16px`, styles.contanerSearch]}
        onPress={onSearch}
      />
      {renderContent}
    </View>
  );
};

const styles = StyleSheet.create({
  contanerSearch: {
    marginTop: -17,
  },
});
