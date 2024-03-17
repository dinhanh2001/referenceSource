import { RouteProp } from '@react-navigation/native';

import { AppStackNavigatorScreenProps, UseAppStackNavigatorScreenProps } from '../../../navigator-params';

export type ECommerceProductNavigationProp = UseAppStackNavigatorScreenProps<'e-commerce/product-detail'>;

export type ECommerceProductRouteProp = AppStackNavigatorScreenProps<'e-commerce/product-detail'>['route'];
export type ECommerceProductSpecsRouteProp = AppStackNavigatorScreenProps<'e-commerce/product-detail-specs'>['route'];
export type ECommerceProductOrderRouteProp = AppStackNavigatorScreenProps<'e-commerce/product-order'>['route'];
export type ECommerceProductReviewRouteProp = AppStackNavigatorScreenProps<'e-commerce/product-review'>['route'];

export type ECommerceProductDetailSpecsTabScreenParam = {
  productId: string;
};

export type ECommerceProductDetailSpecsTabParamList = {
  'e-commerce/product-detail-specs/detail': ECommerceProductDetailSpecsTabScreenParam;
  'e-commerce/product-detail-specs/related': ECommerceProductDetailSpecsTabScreenParam;
};

export type ECommerceProductDetailSpecsTabRouteProp = RouteProp<
  ECommerceProductDetailSpecsTabParamList,
  'e-commerce/product-detail-specs/detail'
>;

export type ECommerceProductListbNavigationProp = UseAppStackNavigatorScreenProps<'e-commerce/product-list'>;
export type ECommerceProductListRouteProp = AppStackNavigatorScreenProps<'e-commerce/product-list'>['route'];
