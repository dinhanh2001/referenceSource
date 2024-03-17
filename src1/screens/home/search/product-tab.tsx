import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';

import { ECommerceRowProduct, tw } from '../../../components';
import { ProductEntity } from '../../../graphql/type.interface';
import { InfiniteListProducts } from '../../e-commerce/product/infinite-list-products';

import { SearchContext } from './context';
import { SearchHomeNavigationProp } from './type';

export const ProductTab = () => {
  const { search } = useContext(SearchContext);
  const navigation = useNavigation<SearchHomeNavigationProp>();

  const onPressItem = useCallback(
    (productId: string) => {
      navigation.navigate('e-commerce/product-detail', { productId });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ProductEntity }) => {
      return <ECommerceRowProduct containerStyle={tw`mb-5 mx-4`} item={item} onPress={onPressItem} />;
    },
    [onPressItem],
  );

  return <InfiniteListProducts variables={{ search }} renderItem={renderItem} contentContainerStyle={tw`pt-5`} />;
};
