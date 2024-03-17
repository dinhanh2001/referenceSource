import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, LayoutAnimation, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, ECommerceCartItem, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { useFullScreenLoading } from '../../../contexts';
import { useAddCartItemsMutation } from '../../../graphql/mutations/addCartItems.generated';
import { useDeleteCartItemsMutation } from '../../../graphql/mutations/deleteCartItems.generated';
import { useUserAddMultipleFavoriteProductMutation } from '../../../graphql/mutations/userAddMultipleFavoriteProduct.generated';
import { useMyCartQuery } from '../../../graphql/queries/myCart.generated';
import { CartItemEntity, CreateCartInput } from '../../../graphql/type.interface';
import { showFlashMessageError } from '../../../helpers';
import { useEffectAfterMount, useRefreshByUser } from '../../../hooks';
import { CheckSVG, EmptyCart } from '../../../svg';
import { thousandSeparator } from '../../../utils';

import { ECommerceCartNavigationProp } from './type';

export const ECommerceCart = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<ECommerceCartNavigationProp>();
  const { showFullscreenLoading } = useFullScreenLoading();

  const { data, loading, refetch } = useMyCartQuery();
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const [updateCart, { loading: loadingCart }] = useAddCartItemsMutation({
    onError: showFlashMessageError,
  });

  const [selected, setSelected] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false);

  const [deleteItem, { loading: loadingDelete }] = useDeleteCartItemsMutation({
    onError: showFlashMessageError,
  });
  const [addMultiFavorite, { loading: loadingAddFavorite }] = useUserAddMultipleFavoriteProductMutation({
    onError: showFlashMessageError,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffectAfterMount(() => {
    showFullscreenLoading(loadingDelete || loadingAddFavorite);
  }, [loadingDelete, loadingAddFavorite, showFullscreenLoading]);

  const total = useMemo(() => {
    let price = 0,
      quatity = 0,
      product = 0,
      store = {};

    data?.myCart?.items?.forEach?.((it) => {
      if (selected?.[it?.id]) {
        price += it?.total;
        quatity += it?.quantity;
        product += 1;
        store = { ...store, [it?.store?.id || '']: true };
      }
    });

    return {
      price,
      quatity,
      product,
      store: Object.keys(store)?.length,
    };
  }, [data?.myCart?.items, selected]);

  const onBuy = useCallback(() => {
    navigation.navigate('e-commerce/cart-payment', {
      carts: Object.values(selected).filter((it) => it) as CartItemEntity[],
    });
  }, [navigation, selected]);

  const onDeleteItem = useCallback(
    (id: string) => {
      deleteItem({
        variables: {
          input: {
            cartItems: [id],
          },
        },
        onCompleted: () => {
          refetch();
        },
      });
    },
    [deleteItem, refetch],
  );

  const onSelect = useCallback((val: boolean, item: CartItemEntity) => {
    setSelected((prev: any) => ({ ...prev, [item?.id]: val ? item : undefined }));
  }, []);

  const onSelectAll = useCallback(
    (val: boolean) => {
      if (val) {
        const s = data?.myCart?.items?.reduce((acc: any, item: any) => {
          acc[item?.id] = item;
          return acc;
        }, {});
        setSelected(s);
      } else {
        setSelected({});
      }
    },
    [data?.myCart?.items],
  );

  const onUpdateCart = useCallback(
    (input: CreateCartInput) => {
      updateCart({
        variables: {
          input,
        },
        onCompleted: () => {
          refetch();

          const { productId, quantity } = input?.cartItems?.[0] || {};
          const id = Object.keys(selected)?.find?.((it: string) => selected?.[it]?.productId === productId) || '';

          if (id) {
            setSelected({
              ...selected,
              [id]: {
                ...selected?.[id],
                quantity,
              },
            });
          }
        },
      });
    },
    [refetch, selected, updateCart],
  );

  const onRemoveMutiple = useCallback(() => {
    const cartItems = Object.keys(selected)?.filter?.((it: string) => selected?.[it]) || [];
    deleteItem({
      variables: {
        input: {
          cartItems,
        },
      },
      onCompleted: () => {
        setSelected({});
        refetch();
      },
    });
  }, [deleteItem, refetch, selected]);

  const onAddMultiFavorite = useCallback(async () => {
    const cartItems = Object.keys(selected)?.filter?.((it: string) => selected?.[it]) || [];

    await addMultiFavorite({
      variables: {
        input: {
          productIds: cartItems,
        },
      },
    });

    await deleteItem({
      variables: {
        input: {
          cartItems,
        },
      },
      onCompleted: () => {
        setSelected({});
        refetch();

        showMessage({
          message: 'Đã chuyển vào danh sách yêu thích',
          type: 'success',
        });
      },
    });
  }, [addMultiFavorite, deleteItem, refetch, selected]);

  const rightHeader = useMemo(() => {
    const cartEmpty = !data?.myCart?.items?.length;
    return (
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsEdit((p) => !p);
        }}
      >
        <Text style={[tw`text-primary font-semibold`, cartEmpty && tw`text-grayscale-disabled`]}>
          {isEdit ? 'Xong' : 'Sửa'}
        </Text>
      </TouchableOpacity>
    );
  }, [data?.myCart?.items?.length, isEdit]);

  const renderEmpty = useMemo(
    () => (
      <View style={tw`items-center mt-4`}>
        <EmptyCart />
        <Text style={tw`mt-2`}>Chưa có Sản phẩm nào trong giỏ hàng</Text>
        <Button
          title={'Mua sắm ngay'}
          containerStyle={tw`mt-4`}
          buttonStyle={tw`px-10`}
          onPress={() => navigation.goBack()}
        />
      </View>
    ),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: CartItemEntity }) => (
      <View style={tw``}>
        <ECommerceCartItem
          item={item}
          onDelete={onDeleteItem}
          onSelect={onSelect}
          selected={!!selected?.[item?.id]}
          updateCart={onUpdateCart}
        />
        <Space size={6} backgroundColor={'#EEE'} />
      </View>
    ),
    [onDeleteItem, onSelect, onUpdateCart, selected],
  );

  const renderAllCheck = useMemo(() => {
    const lenSelect = Object.keys(selected)?.filter?.((it: string) => selected?.[it])?.length;
    const selectedAll = !!lenSelect && lenSelect === data?.myCart?.items?.length;
    return (
      <TouchableOpacity style={tw`flex-row  items-center`} onPress={() => onSelectAll(!selectedAll)}>
        <View
          style={[
            tw`rounded-2px w-5 h-5 items-center justify-center self-center`,
            selectedAll ? tw`bg-primary` : tw`border border-grayscale-gray`,
          ]}
        >
          {selectedAll && <CheckSVG width={10} />}
        </View>
        <View style={tw`ml-2 flex-1`}>
          <Text style={tw`text-3 text-grayscale-black`}>Tất cả</Text>
        </View>
      </TouchableOpacity>
    );
  }, [data?.myCart?.items?.length, onSelectAll, selected]);

  const renderBottom = useMemo(() => {
    const { price, quatity, product } = total || {};

    if (isEdit) {
      return (
        <View style={tw`pt-2 px-4 pb-${bottom + 16}px bg-white shadow-md flex-row`}>
          <View style={tw`flex-1`}>{renderAllCheck}</View>
          <Button title={'Xóa'} type="outline" buttonStyle={tw`border-grayscale-disabled`} onPress={onRemoveMutiple} />
          <Button title={'Lưu vào yêu thích'} containerStyle={tw`ml-3 `} onPress={onAddMultiFavorite} />
        </View>
      );
    }

    return (
      <View style={tw`pt-2 px-4 pb-${bottom + 16}px bg-white shadow-md`}>
        {renderAllCheck}
        <View style={tw`flex-row items-center mt-1`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-12px text-grayscale-black`}>
              Thanh toán ({product} <Text style={tw`text-grayscale-gray`}>sản phẩm</Text>)
            </Text>
            <Text style={tw`mt-2px font-semibold text-grayscale-black`}>{`${thousandSeparator(price)} đ`}</Text>
          </View>
          <Button title={`Đặt mua (${quatity})`} onPress={onBuy} disabled={!quatity} loading={loadingCart} />
        </View>
      </View>
    );
  }, [bottom, isEdit, loadingCart, onBuy, renderAllCheck, total, onRemoveMutiple, onAddMultiFavorite]);

  const renderContent = useMemo(() => {
    if (loading && !data?.myCart?.items?.length) {
      return <ActivityIndicator />;
    }

    return (
      <>
        <FlatList
          data={data?.myCart?.items as CartItemEntity[]}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          onRefresh={refetchByUser}
          refreshing={isRefetchingByUser}
        />

        {renderBottom}
      </>
    );
  }, [loading, data?.myCart?.items, renderItem, renderEmpty, refetchByUser, isRefetchingByUser, renderBottom]);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader title="Giỏ hàng của tôi" rightView={rightHeader} />

      {renderContent}
    </SafeAreaView>
  );
};
