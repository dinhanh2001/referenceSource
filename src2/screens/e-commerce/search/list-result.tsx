import { useNavigation, useRoute } from '@react-navigation/native';
import deepmerge from 'deepmerge';
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, ECommerceRowProduct, ModalBottomSelect, ProductItem, tw } from '../../../components';
import { useUserProductsQuery } from '../../../graphql/queries/userProducts.generated';
import { ProductEntity, ProductTypeEnum, SortDirectionEnum, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { DisplayEnum, SortEnum, sortItems } from './filter';
import {
  ECommerceSearchNavigationProp,
  ECommerceSearchResultListRouteProp,
  ECommerceSearchResultTabEnum,
} from './type';
import { FilterContext } from './context';

export const ECommerceSearchResultListResult = () => {
  const {
    params: { type, search },
  } = useRoute<ECommerceSearchResultListRouteProp>();
  const navigation = useNavigation<ECommerceSearchNavigationProp>();

  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const w = Math.floor((width - 16 * 2 - 8) / 2);

  const currentPage = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { filter, setFilter } = useContext(FilterContext);
  const isGrid = filter?.display === DisplayEnum.GRID;

  const defaultVariables = useMemo(() => {
    let sort;
    if (filter?.sort) {
      sort = {
        field: filter.sort,
        direction: SortDirectionEnum.DESC,
      };
    }
    return {
      search,
      isActive: StatusEnum.ACTIVE,
      sort,
    };
  }, [filter?.sort, search]);

  const variablesTab = useMemo(() => {
    switch (type) {
      case ECommerceSearchResultTabEnum.OLD:
        return {
          isNew: false,
          type: ProductTypeEnum.VEHICLE,
        };

      case ECommerceSearchResultTabEnum.NEW:
        return {
          isNew: true,
          type: ProductTypeEnum.VEHICLE,
        };

      case ECommerceSearchResultTabEnum.ACCESSORY:
        return {
          type: ProductTypeEnum.ACCESSARY,
        };

      default:
        return {};
    }
  }, [type]);

  const { data, loading, refetch, fetchMore } = useUserProductsQuery({
    variables: {
      ...defaultVariables,
      ...variablesTab,
      limit: 10,
      page: 1,
    },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    currentPage.current = 1;
    refetch();
  });

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.userProducts.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            ...defaultVariables,
            ...variablesTab,
            limit: 10,
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
  }, [data, defaultVariables, fetchMore, loading, variablesTab]);

  const onDetailProduct = useCallback(
    (productId: string) => {
      navigation.push('e-commerce/product-detail', { productId });
    },
    [navigation],
  );

  const renderHeader = useMemo(
    () => (
      <View style={tw`mb-4 -mx-4`}>
        {/* <ECommerceSearchResultBanner /> */}

        <ModalBottomSelect
          containerStyle={tw`my-2 mx-4`}
          options={sortItems}
          value={filter?.sort}
          onChange={(val) => {
            setFilter?.({
              ...(filter || {}),
              sort: val as SortEnum,
            });
          }}
        />
      </View>
    ),
    [filter, setFilter],
  );

  const renderItem = useCallback(
    ({ item }: { item: ProductEntity }) => {
      if (isGrid) {
        return (
          <View style={tw`shadow-md  w-${w}px bg-white rounded-4px mx-1 mb-2`}>
            <ProductItem size={w} infoStyle={tw`px-11px pt-2px pb-3`} data={item} />
          </View>
        );
      }
      return <ECommerceRowProduct containerStyle={tw`mb-5`} item={item} onPress={onDetailProduct} />;
    },
    [isGrid, onDetailProduct, w],
  );

  if (loading && !data?.userProducts?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      scrollIndicatorInsets={{ right: 1 }}
      key={filter?.display}
      keyExtractor={(item) => item.id}
      data={data?.userProducts?.items as ProductEntity[]}
      ListHeaderComponent={renderHeader}
      numColumns={isGrid ? 2 : 1}
      renderItem={renderItem}
      onRefresh={refetchByUser}
      refreshing={isRefetchingByUser}
      onEndReachedThreshold={0.8}
      onEndReached={onLoadMore}
      contentContainerStyle={tw`pb-${bottom + 16}px px-3`}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
};
