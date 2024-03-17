import { AppStackNavigatorScreenProps, UseAppStackNavigatorScreenProps } from '../../../navigator-params';

export type ECommerceCartNavigationProp = UseAppStackNavigatorScreenProps<'e-commerce/cart'>;
export type ECommerceCartPaymentSuccessNavigationProp =
  UseAppStackNavigatorScreenProps<'e-commerce/cart-payment-success'>;

export type ECommerceCartAddressRouteProps = AppStackNavigatorScreenProps<'e-commerce/cart-address'>['route'];
export type ECommerceCartPaymentRouteProps = AppStackNavigatorScreenProps<'e-commerce/cart-payment'>['route'];
export type ECommerceCartDiscountSelectRouteProps =
  AppStackNavigatorScreenProps<'e-commerce/cart-discount-select'>['route'];
export type ECommerceCartPaymentSuccessRouteProps =
  AppStackNavigatorScreenProps<'e-commerce/cart-payment-success'>['route'];
