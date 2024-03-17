import { useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';

import {
  ECommerceStoreFilterProduct,
  ECommerceStoreInfo,
  FilterProdctEnum,
  ProductItem,
  tw,
} from '../../../components';
import { useStoreDetailQuery } from '../../../graphql/queries/storeDetail.generated';
import { PartnerEntity, ProductEntity, SortDirectionEnum } from '../../../graphql/type.interface';
import { InfiniteListProducts } from '../product/infinite-list-products';

import { ECommerceHomeStoreListRouteProp } from './type';

export const ECommerceStoreProductList = () => {
  const { width } = useWindowDimensions();
  const w = Math.floor((width - 16 * 2 - 8) / 2);

  const {
    params: { storeId },
  } = useRoute<ECommerceHomeStoreListRouteProp>();

  const [currentFilter, setCurrentFilter] = useState<FilterProdctEnum>(FilterProdctEnum.ALL);

  const { data, refetch } = useStoreDetailQuery({
    variables: {
      id: storeId,
    },
  });

  const variables = useMemo(() => {
    switch (currentFilter) {
      case FilterProdctEnum.NEW:
        return {
          isNew: true,
        };

      case FilterProdctEnum.PRICE: {
        return {
          sort: {
            field: 'unitPrice',
            direction: SortDirectionEnum.DESC,
          },
        };
      }

      case FilterProdctEnum.RATE:
        return {
          sort: {
            field: 'star',
            direction: SortDirectionEnum.DESC,
          },
        };

      default:
        return {};
    }
  }, [currentFilter]);

  const renderHeader = useMemo(
    () => (
      <View style={tw`mb-4 bg-white shadow-md -mx-4`}>
        <ECommerceStoreInfo containerStyle={tw`mx-4 mt-5 mb-5`} data={data?.storeDetail as PartnerEntity} />
        <ECommerceStoreFilterProduct value={currentFilter} onChange={setCurrentFilter} />
      </View>
    ),
    [currentFilter, data?.storeDetail],
  );

  const renderItem = useCallback(
    ({ item }: { item: ProductEntity }) => (
      <View style={tw`shadow-md mb-2 w-${w}px bg-white rounded-4px`}>
        <ProductItem size={w} infoStyle={tw`px-11px pt-2px pb-3`} data={item} />
      </View>
    ),
    [w],
  );

  return (
    <InfiniteListProducts
      variables={{
        partnerId: storeId,
        ...variables,
      }}
      numColumns={2}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={tw`px-4`}
      refresh={refetch}
    />
  );
};
