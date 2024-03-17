import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Image } from '@rneui/themed';
import deepmerge from 'deepmerge';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, Checkbox, FavoriteProductItem, tw } from '../../components';
import { useUserRemoveMultiFavoriteProductMutation } from '../../graphql/mutations/userRemoveMultiFavoriteProduct.generated';
import { useUserFavoriteProductsQuery } from '../../graphql/queries/userFavoriteProducts.generated';
import { ProductEntity, StatusEnum } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';

import { FavoriteProductsNavigationProps } from './type';

const PAGE_LIMIT = 15;
export const FavoriteProducts = React.memo(() => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<FavoriteProductsNavigationProps>();

  const [edit, setEdit] = useState(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [unLikes, setUnLikes] = useState<any>({});
  const { data, loading, refetch, fetchMore } = useUserFavoriteProductsQuery({
    variables: {
      isActive: StatusEnum.ACTIVE,
      limit: PAGE_LIMIT,
      page: 1,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const currentPage = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [removeMultiFavorite] = useUserRemoveMultiFavoriteProductMutation({
    onCompleted() {
      setCheckAll(false);
      setUnLikes({});
      refetch();
      showMessage({
        message: 'Xóa sản phẩm thành công ',
        type: 'success',
      });
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.userFavoriteProducts.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            isActive: StatusEnum.ACTIVE,
            limit: PAGE_LIMIT,
            page: currentPage.current,
          },
          updateQuery: (prev: any, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return deepmerge(prev, fetchMoreResult);
          },
        });
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoadingMore(false);
      }
    }
  }, [data, fetchMore, loading]);

  const handleRemoveProduct = () => {
    try {
      removeMultiFavorite({
        variables: {
          input: {
            productIds: checkAll ? [] : Object.keys(unLikes).filter((key) => unLikes[key]),
          },
        },
      });
    } catch (e) {
      showMessage({
        message: 'Có lỗi khi xóa sản phẩm ',
        type: 'danger',
        position: 'top',
      });
    }
  };

  const checkAllProducts = useCallback((value: boolean) => {
    setCheckAll(value);
    if (!value) {
      setUnLikes({});
    }
  }, []);

  const onPressItem = useCallback(
    (item: ProductEntity) => {
      navigation.navigate('e-commerce/product-detail', { productId: item?.id });
    },
    [navigation],
  );

  const renderRightView = useMemo(() => {
    if (!data?.userFavoriteProducts?.items?.length) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setEdit(!edit);
        }}
      >
        <Text style={tw`font-semibold text-primary-dark`}>{edit ? 'Hoàn tất' : 'Sửa'}</Text>
      </TouchableOpacity>
    );
  }, [data?.userFavoriteProducts?.items?.length, edit]);

  const renderItem = useCallback(
    ({ item }: { item: ProductEntity }) => {
      return (
        <FavoriteProductItem
          item={item}
          onPress={onPressItem}
          renderRight={
            edit ? (
              <View style={tw`w-1/6 flex justify-center items-center`}>
                <Checkbox
                  colorUnChecked={'grayscale-gray'}
                  style={tw`z-10`}
                  hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                  value={checkAll}
                  onChange={(value) => {
                    setUnLikes((p: any) => ({
                      ...p,
                      [item.id]: value,
                    }));
                  }}
                />
              </View>
            ) : (
              <View />
            )
          }
        />
      );
    },
    [checkAll, edit, onPressItem],
  );

  const renderEmpty = useMemo(() => {
    return (
      <View style={tw`items-center`}>
        <Image source={require('../../images/DiamondFavoriteProducts.png')} style={tw`w-40 h-40 mb-5`} alt="Diamond" />
        <Text style={tw`font-normal text-sm text-grayscale-gray mb-5`}>Bạn chưa chọn thích sản phẩm nào cả</Text>
        <Button
          containerStyle={tw`w-3/5`}
          onPress={() => {
            navigation.navigate('e-commerce/home');
          }}
        >
          <Text style={tw`text-13px font-semibold text-gray-950`}>{'Mua sắm ngay'}</Text>
        </Button>
      </View>
    );
  }, [navigation]);

  if (loading && !data?.userFavoriteProducts?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <AppHeader title="Danh sách yêu thích" rightView={renderRightView} />
      <FlatList
        scrollIndicatorInsets={{ right: 1 }}
        data={data?.userFavoriteProducts?.items as ProductEntity[]}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.8}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[tw`mx-3 `, !edit && tw`pb-${bottom + 20}px`]}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />

      {edit ? (
        <View style={tw` bg-white  flex flex-row justify-between items-center pt-2 pb-${bottom + 20}px px-4`}>
          <View style={tw`flex flex-row justify-center items-center`}>
            <Checkbox
              colorUnChecked={'grayscale-gray'}
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
              onChange={(value) => {
                checkAllProducts(value);
              }}
              title={<Text style={tw`ml-02 text-3`}>Tất cả</Text>}
            />
          </View>
          <View>
            <Button
              title={'Bỏ thích'}
              buttonStyle={tw`px-8`}
              disabled={Object.keys(unLikes).length === 0 && !checkAll}
              onPress={handleRemoveProduct}
            />
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
});
