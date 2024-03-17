import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, ECommerceRowProduct, tw } from '../../../components';
import { ProductEntity } from '../../../graphql/type.interface';

import { InfiniteListProducts } from './infinite-list-products';
import { ECommerceProductListRouteProp, ECommerceProductListbNavigationProp } from './type';

export const ECommerceListProducts = () => {
  const {
    params: { title, variables },
  } = useRoute<ECommerceProductListRouteProp>();
  const navigation = useNavigation<ECommerceProductListbNavigationProp>();

  const onPressItem = useCallback(
    (productId: string) => {
      navigation.push('e-commerce/product-detail', { productId });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ProductEntity }) => {
      return <ECommerceRowProduct containerStyle={tw`mb-5 mx-4`} item={item} onPress={onPressItem} />;
    },
    [onPressItem],
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <AppHeader title={title} />
      <InfiniteListProducts renderItem={renderItem} variables={variables} />
    </SafeAreaView>
  );
};
