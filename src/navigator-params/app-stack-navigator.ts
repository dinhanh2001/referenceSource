import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MyOrderTabParamList } from '../screens/my-order/my-order-list-screen/type';
import { FormAccessoryData, ProductDeviceType } from '../screens/product-form/add-accessory-screen/type';
import { FormVehicleData } from '../screens/product-form/add-vehicle-screen/type';
import { ProductQuotationTabParamList } from '../screens/product-quotation/list-product-quotations/type';
import { FormCheckAndQuote } from '../screens/repair-request-quotation-form-screen/type';
import { RevenueFilterData } from '../screens/revenue/type';

import {
  DiscountCodeEntity,
  Media,
  ProductEntity,
  ProductTypeEnum,
  StoreEntity,
  UserEntity,
} from './../graphql/type.interface';
import { AppRoutes } from './app-routes';
export type AppStackNavigatorParamList = {
  [AppRoutes.BOTTOM_TAB]: undefined;
  [AppRoutes.MAP]: undefined;
  [AppRoutes.SCREEN1]: { title: string };
  [AppRoutes.SCREEN2]?: { title: string };

  [AppRoutes.REPAIR_REQUEST_LIST_SCREEN]: undefined;
  [AppRoutes.REPAIR_REQUEST_REQUEST_DETAIL_SCREEN]: { bookingId: string };
  [AppRoutes.REPAIR_REQUEST_AGENCY_ASSIGN_TECHNICIAN]: { bookingId: string; onCompleted?(): void };
  [AppRoutes.REPAIR_REQUEST_QUOTATION_REJECT_DETAIL]: { bookingId: string };
  [AppRoutes.REPAIR_REQUEST_STATUS_HISTORY]: { bookingId: string };

  [AppRoutes.COURSE]: undefined;
  [AppRoutes.COURSE_DETAIL]: { courseId: string };

  [AppRoutes.REPAIR_REQUEST_QUOTATION_FORM_SCREEN]: { bookingId: string };
  [AppRoutes.REPAIR_REQUEST_REVIEW_CUSTOMER]: { bookingId: string; user: UserEntity };
  [AppRoutes.REPAIR_REQUEST_CREATE_SETTLEMENT]: { bookingId: string; user: UserEntity };
  [AppRoutes.REPAIR_REQUEST_QUOTATION_CONFIRM_SCREEN]: {
    data: FormCheckAndQuote;
    bookingId: string;
  };
  [AppRoutes.REPAIR_REQUEST_RESCHEDULE_REQUEST]: {
    bookingId: string;
    onCompleted?(): void;
  };
  [AppRoutes.QUOTATION_HISTORY]: { bookingId: string };
  [AppRoutes.PRICE_HISTORY_DETAIL]: undefined;
  [AppRoutes.MALFUNCTION_SCREEN]: { bookingId: string };
  [AppRoutes.MEDIA_LIST_VIEW_SCREEN]: { listImage: Media[]; index: number };

  [AppRoutes.TECHNICIAN_LIST_SCREEN]: undefined;
  [AppRoutes.TECHNICIAN_DETAIL_SCREEN]: { id: string };
  [AppRoutes.TECHNICIAN_REPAIR_DETAIL_SCREEN]: { repairDetailID: string };

  [AppRoutes.TECHNICIAN_RECEIPT_DETAIL_SCREEN]: { receiptId: string };
  [AppRoutes.TECHNICIAN_INFORMATION_SCREEN]: { id?: string };
  [AppRoutes.AREA_PICKER]: undefined;
  [AppRoutes.QUALIFICATION_SELECTOR]?: { selectedQualifications?: string[] };

  [AppRoutes.PRODUCT_LIST_SCREEN]: undefined;
  [AppRoutes.PRODUCT_ADD_SCREEN]: undefined;
  [AppRoutes.PRODUCT_ADD_VEHICLE_SCREEN]: {
    data?: ProductEntity;
  };
  [AppRoutes.PRODUCT_ADD_VEHICLE_PREVIEW]: undefined;
  [AppRoutes.PART_SELECT_SCREEN]: {
    onChange: (values: ProductDeviceType) => void;
  };

  [AppRoutes.PRODUCT_ADD_SELECT_UNIT]: { onSelect: (val: string) => void; value: string };

  [AppRoutes.PRODUCT_ADD_ACCESSORY_SCREEN]: {
    data?: ProductEntity;
  };
  [AppRoutes.PRODUCT_ADD_ACCESSORY_SELECT_PART]: undefined;

  [AppRoutes.PRODUCT_VEHICLE_ACCESSORY_PREVIEW]: {
    type: ProductTypeEnum;
    id?: string;
    vehicle?: FormVehicleData;
    accessory?: FormAccessoryData;
    isView?: boolean;
  };

  [AppRoutes.VOUCHER_SCREEN]: undefined;
  [AppRoutes.CHOOSE_PRODUCT]: {
    handleSelectProducts?: (listIds: string[], name?: string, isAll?: boolean) => void;
    isDetail?: boolean;
    listProducts?: string[];
    isMultipleSelect?: boolean;
    isAll?: boolean;
    hideUnSelected?: boolean;
  };
  [AppRoutes.VOUCHER_ADD_SCREEN]: { data?: DiscountCodeEntity; isEdit?: boolean };
  [AppRoutes.VOUCHER_DETAIL_SCREEN]: { id: string; isActivities: boolean };

  [AppRoutes.ACCOUNT_EDITING]: undefined;
  [AppRoutes.ACCOUNT_CHANGE_PASSWORD]: undefined;

  [AppRoutes.ACCOUNT_ADDRESS]: undefined;
  [AppRoutes.ACCOUNT_ADDRESS_DETAIL]: {
    title: string;
    item?: any;
  };

  [AppRoutes.REPAIR_REQUEST_CANCEL_REQUEST]: {
    bookingId: string;
    onComplete?(): void;
  };
  [AppRoutes.REPAIR_REQUEST_REQUEST_PUSH_AGENCY]: {
    bookingId: string;
  };
  [AppRoutes.REQUEST_PUSH_TECHNICIAN]: {
    bookingId: string;
  };
  [AppRoutes.PARTNER_UPDATE_MY_INFO]: undefined;

  //MY ORDER
  [AppRoutes.MY_ORDER_LIST_SCREEN]: { initialRouteName?: keyof MyOrderTabParamList };
  [AppRoutes.MY_ORDER_DETAIL_SCREEN]: { orderId: string };
  [AppRoutes.MY_ORDER_REVIEW_SCREEN]: undefined;
  [AppRoutes.MY_ORDER_CANCEL_REASON_SCREEN]: { orderId: string };
  // PRODUCT QUOTATION
  [AppRoutes.PRODUCT_QUOTATION_LIST_SCREEN]: { initialRouteName: keyof ProductQuotationTabParamList };
  [AppRoutes.PRODUCT_QUOTATION_DETAIL_SCREEN]: { id: string };
  //REVIEW STORE
  [AppRoutes.REVIEW_STORE_SCREEN]: undefined;
  // REVENUE
  [AppRoutes.REVENUE_SCREEN]: undefined;
  [AppRoutes.REVENUE_FILTER_SCREEN]: { currentFilter: RevenueFilterData; onChange: (data: RevenueFilterData) => void };

  // FEEDBACK
  [AppRoutes.FEEDBACK]: undefined;
  [AppRoutes.FEEDBACK_CREATE]: undefined;
  [AppRoutes.FEEDBACK_DETAIL]: {
    id: string;
  };
  [AppRoutes.ACCOUNT_SETTING]: undefined;

  //DOCUMENT
  [AppRoutes.DOCUMENT_SCREEN]: undefined;
  [AppRoutes.DOCUMENT_LIST_SCREEN]: { id: string };
  [AppRoutes.DOCUMENT_DETAIL_SCREEN]: { id: string };

  // SURVEY
  [AppRoutes.SURVEY_LIST_SCREEN]: undefined;
  [AppRoutes.SURVEY_SCREEN]: { surveyId: string };
  //Warehouse
  [AppRoutes.WAREHOUSE_LIST_SCREEN]: undefined;
  [AppRoutes.WAREHOUSE_DETAIL_SCREEN]: { id: string };
  [AppRoutes.WAREHOUSE_ADD_SCREEN]: { data?: StoreEntity; isEdit: boolean };
  [AppRoutes.WAREHOUSE_IMPORT_EXPORT_PRODUCT_SCREEN]: { isImport: boolean; storeId: string };
};

export type AppStackNavigatorScreens = keyof AppStackNavigatorParamList;

export type UseAppStackNavigatorScreenProps<T extends AppStackNavigatorScreens> = NativeStackNavigationProp<
  AppStackNavigatorParamList,
  T
>;
