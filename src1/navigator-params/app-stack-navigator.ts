import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  AddressEntity,
  BookingEntity,
  CartItemEntity,
  DiscountCodeEntity,
  Media,
  OrderEntity,
  PartnerTypeEnum,
  VehicleEntity,
} from '../graphql/type.interface';
import { ECommerceStoreTabParamList } from '../screens/e-commerce/store/type';
import { FormSearchCommerce } from '../screens';
import { VariablesListProductProps } from '../screens/e-commerce/product/infinite-list-products';
import { ECommerceProductDetailSpecsTabParamList } from '../screens/e-commerce/product/type';
import { CreateMaintenanceForm } from '../screens/maintenance/create-maintenance/schema';

import { RepairStackNavigatorParamList } from './repair-stack-navigator';
import { BottomTabScreensParams } from './bottom-tab-navigator';

export type AppStackNavigatorParamList = RepairStackNavigatorParamList & {
  'bottom-tab'?: {
    screen?: keyof BottomTabScreensParams;
  };
  'account-setting': undefined;
  'account-address': undefined;
  'address-detail': {
    item?: AddressEntity;
  };
  'address-searching': undefined;
  'account-editting': undefined;
  'list-survey': undefined;
  'form-survey': { surveyId: string };
  'change-password': undefined;
  'my-vehicles': undefined;
  'vehicle-detail': { item: VehicleEntity };
  'vehicle-create'?: { vehicle: VehicleEntity };
  helpcenter: undefined;
  'favourite-products': undefined;
  feedback: undefined;
  'feedback-detail': {
    id: string;
  };
  'feedback-create': undefined;
  'my-repair-request': undefined;
  'my-repair-request/cancel': undefined;
  'my-repair-request/ongoing': undefined;
  'my-repair-request/sucess': undefined;
  'my-repair-request/checking': undefined;
  'my-repair-request/waiting': undefined;
  'my-repair-request/issue-detail': { bookingId: string };
  'media-preview': {
    data: Media[];
    activeIndex?: number;
  };
  'my-repair-request/detail': { bookingId: string };
  'my-repair-request/cancel-reason': { booking: BookingEntity; refetch(): void };
  'my-repair-request/schedule-detail': { bookingId: string };
  'my-repair-request/push-quotation': { bookingId: string };
  'my-repair-requests/requote-reason': { quotationId: string };
  'my-repair-requests/quotation-history': { bookingId: string };
  'my-repair-requests/requote-detail': { bookingId: string };
  'my-repair-requests/request-status': { bookingId: string };
  'my-repair-requests/settlement-detail': { bookingId: string };
  'my-repair-requests/re-settlement-reason': { settlementId: string };
  'my-repair-request/review': { bookingId: string };
  'review-technician': { partnerId: string; type: PartnerTypeEnum };
  'e-commerce/home': undefined;
  'e-commerce/search': undefined;
  'e-commerce/search-result': { search: string };
  'e-commerce/store-detail': { storeId: string; initialRouteName?: keyof ECommerceStoreTabParamList };
  'e-commerce/search-filter': { value?: FormSearchCommerce; onChange: (val?: FormSearchCommerce) => void };
  'e-commerce/product-list': { title: string; variables?: VariablesListProductProps };
  'e-commerce/product-detail': { productId: string };
  'e-commerce/product-review': { productId: string };
  'e-commerce/product-order': { productId: string; quatity: number };
  'e-commerce/product-detail-specs': {
    productId: string;
    initialRouteName?: keyof ECommerceProductDetailSpecsTabParamList;
  };
  'e-commerce/cart': undefined;
  'e-commerce/cart-address': { address?: AddressEntity; onSelectAddress?: (address: AddressEntity) => void };
  'e-commerce/cart-payment': { carts: CartItemEntity[]; note?: string };
  'e-commerce/cart-payment-success': { result: OrderEntity[]; address?: AddressEntity; totalPayment: number };
  'e-commerce/cart-discount-select': {
    productIds: string[];
    onSelectDiscount: (discount: DiscountCodeEntity) => void;
    currentDiscount?: DiscountCodeEntity;
  };
  'e-commerce/my-order': undefined;
  'e-commerce/my-order-detail': { orderId: string };
  'e-commerce/my-order-review': { orderId: string };
  'e-commerce/my-order-cancel': { orderId: string };
  'e-commerce/price-request': undefined;
  'e-commerce/price-request-detail': { id: string };
  'e-commerce/price-request-form-quotation': { productId: string };
  'maintenance/create': undefined;
  'maintenance/form-supplies': {
    formData: CreateMaintenanceForm;
    vehicle: VehicleEntity;
    operatingNumber: number;
    vehicleTypeId: string;
    modelId: string;
    // routineLevel: number;
    // vehicle: VehicleEntity;
    // value?: any;
    // onChange?: (value: any) => void;
  };
  'maintenance/supplies': { maintenanceId: string };
  'maintenance/detail': { maintenanceId: string };
  'maintenance/cancel': { maintenanceId: string };
  'guide/list': undefined;
  'guide/detail': { guideId: string };
  'guide/content': { title: string; files: Media[] };
  'home/search': undefined;
  'home/partner-detail': { partnerId: string; type: PartnerTypeEnum };
  news: undefined;
  'news/detail': { id: string };
};

export type AppStackNavigatorScreens = keyof AppStackNavigatorParamList;

export type AppStackNavigatorScreenProps<T extends AppStackNavigatorScreens> = NativeStackScreenProps<
  AppStackNavigatorParamList,
  T
>;

export type UseAppStackNavigatorScreenProps<T extends AppStackNavigatorScreens> = NativeStackNavigationProp<
  AppStackNavigatorParamList,
  T
>;
