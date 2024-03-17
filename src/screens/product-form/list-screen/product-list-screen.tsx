import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import { FlashList } from '@shopify/flash-list';
import deepmerge from 'deepmerge';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, Space, tw } from '../../../components';
import { useAuth } from '../../../contexts';
import { usePartnerProductsQuery } from '../../../graphql/queries/partnerProducts.generated';
import { ProductEntity, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';
import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';
import { TagSVG } from '../../../svg';
import { ProductItem } from '../components';

import { PropsType } from './type';

export const ProductListScreen: React.FC<PropsType> = memo(() => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  const { partner } = useAuth();

  const { data, refetch, fetchMore, loading } = usePartnerProductsQuery({
    variables: { partnerId: partner?.id as string, isActive: StatusEnum.ACTIVE },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const currentPage = useRef(1);

  const list = useMemo(() => data?.partnerProducts?.items as ProductEntity[], [data?.partnerProducts?.items]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.partnerProducts?.meta?.totalPages && !loading && !isRefetchingByUser) {
      currentPage.current += 1;
      fetchMore({
        variables: {
          limit: 8,
          page: currentPage.current,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return deepmerge(prev, fetchMoreResult);
        },
      });
    }
  }, [data, fetchMore, isRefetchingByUser, loading]);

  const navigateAddProduct = useCallback(() => {
    navigation.navigate(AppRoutes.PRODUCT_ADD_SCREEN);
  }, [navigation]);

  const renderRightHeader = useMemo(() => {
    if (!list?.length) {
      return null;
    }

    return (
      <TouchableOpacity onPress={navigateAddProduct}>
        <Text style={tw`text-primary-dark font-semibold`}>+ Thêm mới</Text>
      </TouchableOpacity>
    );
  }, [list?.length, navigateAddProduct]);

  const renderItem = useCallback(
    ({ item }: { item: ProductEntity }) => {
      return <ProductItem item={item} refetch={refetch} />;
    },
    [refetch],
  );

  const renderEmpty = useCallback(() => {
    return (
      <View style={tw` items-center mt-35px`}>
        <TagSVG />
        <Space size={8} />
        <Text style={tw`text-grayscale-gray text-center`}>Đại lý của bạn chưa có Sản phẩm nào</Text>
        <Space />
        <Button style={tw`px-24px bg-primary`} onPress={navigateAddProduct}>
          Thêm mới
        </Button>
      </View>
    );
  }, [navigateAddProduct]);

  const renderContent = useMemo(() => {
    if (loading && !list?.length) {
      return <ActivityIndicator />;
    }

    return (
      <FlashList
        data={list}
        keyExtractor={(item: ProductEntity) => item?.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        estimatedItemSize={500}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [isRefetchingByUser, list, loading, onLoadMore, refetchByUser, renderEmpty, renderItem]);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader title="Sản phẩm" rightView={renderRightHeader} />
      {renderContent}
    </SafeAreaView>
  );
});
