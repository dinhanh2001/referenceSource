import { createStackNavigator } from '@react-navigation/stack';
import React, { useMemo } from 'react';

import { tw } from '../components';
import { AppRoutes, AppStackNavigatorParamList } from '../navigator-params';
import {
  AccountAddress,
  AccountAddressForm,
  AccountEditing,
  RepairRequestDetailScreen,
  RepairRequestListScreen,
  ChangePassword,
  Home,
  MalfunctionScreen,
  Map,
  PriceHistoryDetailScreen,
  QuotationHistoryScreen,
  ProductAddAccessoryScreen,
  ProductAddVehiclePreviewScreen,
  ProductAddVehicleScreen,
  ProductAddScreen,
  ProductListScreen,
  QualificationSelectorScreen,
  TechnicianInformationScreen,
  TechnicianListScreen,
  TechnicianReceiptDetailScreen,
  TechnicianRepairDetailScreen,
  RepairRequestQuotationFormScreen,
  MediaListViewScreen,
  RepairRequestAgencyAssignTechnicianScreen,
  RepairRequestRequestPushAgencyScreen,
  RepairRequestRequestPushTechnician,
  RepairRequestCancelRequestScreen,
  RepairRequestQuotationConfirmScreen,
  RepairRequestRescheduleScreen,
  TechnicianUpdateInfo,
  RepairRequestCreateSettlementScreen,
  RepairRequestReviewCustomerScreen,
  RepairRequestStatusHistory,
  PartSelectScreen,
  MyOrderListScreen,
  MyOrderDetailScreen,
  VoucherScreen,
  VoucherAddScreen,
  ChooseProductScreen,
  VoucherDetailScreen,
  CourseScreen,
  CourseDetailScreen,
  FeedbackCreate,
  FeedbackDetail,
  Feedback,
  Setting,
  DocumentListScreen,
  DocumentDetailScreen,
  MyOrderReviewScreen,
  SurveyScreen,
  SurveyListScreen,
  MyOrderCancelReasonScreen,
  ListProductQuotations,
  WarehouseListScreen,
  WarehouseDetailScreen,
  WarehouseAddScreen,
  WarehouseImportExportProductScreen,
  ProductQuotationDetailScreen,
  RevenueScreen,
  RevenueFilterScreen,
  DocumentScreen,
  ReviewStoreScreen,
} from '../screens';
import { TechnicianDetailScreen } from '../screens/technician-detail-screen';
import { CloseSVG, RoundedBackSVG } from '../svg';
import { RepairRequestQuotationRejectDetail } from '../screens/repair-request-quotation-reject-detail';
import { useNotificationObserver } from '../hooks';

import { AppBottomTabsNavigator } from './bottom-tabs-navigator';
import { defaultStackNavigationOptions } from './default-navigation-options';

const Stack = createStackNavigator<AppStackNavigatorParamList>();

export const AppStackNavigator = () => {
  useNotificationObserver();

  const withHeaderOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: false,
      headerStyle: {
        borderBottomColor: tw.color('transparent'),
        shadowOpacity: 0,
      },
      headerBackgroundContainerStyle: {
        borderColor: tw.color('transparent'),
      },
      ...defaultStackNavigationOptions,
    }),
    [],
  );
  const withCloseHeaderOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: false,
      headerStyle: {
        borderBottomColor: tw.color('transparent'),
        shadowOpacity: 0,
      },
      headerBackgroundContainerStyle: {
        borderColor: tw.color('transparent'),
      },
      headerBackTitleVisible: false,
      headerBackImage: () => <CloseSVG style={tw`ml-18px`} fill={tw.color('black')} />,
    }),
    [],
  );

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTransparent: true, headerTitle: '', ...defaultStackNavigationOptions }}
    >
      <Stack.Screen name={AppRoutes.BOTTOM_TAB} component={AppBottomTabsNavigator} />
      <Stack.Screen name={AppRoutes.SCREEN1} component={Home} initialParams={{ title: 'Home page 1' }} />
      <Stack.Screen name={AppRoutes.SCREEN2} component={Home} initialParams={{ title: 'Home page 2' }} />
      <Stack.Screen name={AppRoutes.MAP} component={Map} options={{ headerShown: false }} />
      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_LIST_SCREEN}
        component={RepairRequestListScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Yêu cầu sửa chữa',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name={AppRoutes.COURSE}
        component={CourseScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Khóa học',
          headerTitleAlign: 'left',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AppRoutes.COURSE_DETAIL}
        component={CourseDetailScreen}
        options={{
          ...withHeaderOptions,
        }}
      />
      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_REQUEST_DETAIL_SCREEN}
        component={RepairRequestDetailScreen}
        options={{ ...withHeaderOptions }}
      />
      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_STATUS_HISTORY}
        component={RepairRequestStatusHistory}
        options={{ ...withHeaderOptions, headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.MALFUNCTION_SCREEN}
        component={MalfunctionScreen}
        options={{ ...withHeaderOptions, headerTitle: 'Hiện tượng hư hỏng', headerTitleAlign: 'left' }}
      />
      <Stack.Screen
        name={AppRoutes.MEDIA_LIST_VIEW_SCREEN}
        component={MediaListViewScreen}
        options={{ headerBackImage: () => <RoundedBackSVG style={tw`ml-18px`} /> }}
      />
      <Stack.Screen
        name={AppRoutes.QUOTATION_HISTORY}
        component={QuotationHistoryScreen}
        options={{ ...withHeaderOptions, headerTitle: 'Lịch sử báo giá', headerTitleAlign: 'left' }}
      />
      <Stack.Screen
        name={AppRoutes.PRICE_HISTORY_DETAIL}
        component={PriceHistoryDetailScreen}
        options={{ ...withHeaderOptions, headerTitle: 'Chi tiết Yêu cầu báo giá lại', headerTitleAlign: 'left' }}
      />
      <Stack.Screen
        name={AppRoutes.TECHNICIAN_LIST_SCREEN}
        component={TechnicianListScreen}
        options={{ ...withHeaderOptions, headerTitle: 'Kỹ thuật viên', headerTitleAlign: 'left' }}
      />
      <Stack.Screen
        name={AppRoutes.TECHNICIAN_DETAIL_SCREEN}
        component={TechnicianDetailScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={AppRoutes.TECHNICIAN_REPAIR_DETAIL_SCREEN}
        component={TechnicianRepairDetailScreen}
        options={{ ...withHeaderOptions, headerTitle: 'Chi tiết sửa chữa', headerTitleAlign: 'left' }}
      />
      <Stack.Screen
        name={AppRoutes.TECHNICIAN_RECEIPT_DETAIL_SCREEN}
        component={TechnicianReceiptDetailScreen}
        options={{ ...withHeaderOptions, headerTitle: 'Chi tiết hoá đơn', headerTitleAlign: 'left' }}
      />
      <Stack.Screen
        name={AppRoutes.TECHNICIAN_INFORMATION_SCREEN}
        component={TechnicianInformationScreen}
        options={{ ...withHeaderOptions, headerTitleAlign: 'left' }}
      />
      <Stack.Screen
        name={AppRoutes.QUALIFICATION_SELECTOR}
        component={QualificationSelectorScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Chuyên môn',
        }}
      />
      <Stack.Screen
        name={AppRoutes.PRODUCT_LIST_SCREEN}
        component={ProductListScreen}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AppRoutes.PRODUCT_ADD_SCREEN}
        component={ProductAddScreen}
        options={{
          headerTitle: 'Thêm mới sản phẩm',
          headerTitleAlign: 'left',
          ...withCloseHeaderOptions,
        }}
      />
      <Stack.Screen
        name={AppRoutes.PRODUCT_ADD_VEHICLE_SCREEN}
        component={ProductAddVehicleScreen}
        options={{
          headerTitle: 'Thêm mới thiết bị',
          headerTitleAlign: 'left',
          ...withHeaderOptions,
        }}
      />
      <Stack.Screen
        name={AppRoutes.PRODUCT_ADD_VEHICLE_PREVIEW}
        component={ProductAddVehiclePreviewScreen}
        options={{
          ...withHeaderOptions,
          header: () => null,
          // headerTransparent: true,
        }}
      />
      <Stack.Screen
        name={AppRoutes.PRODUCT_ADD_ACCESSORY_SCREEN}
        component={ProductAddAccessoryScreen}
        options={{
          headerTitle: 'Thêm mới phụ tùng',
          headerTitleAlign: 'left',
          ...withHeaderOptions,
        }}
      />
      <Stack.Screen
        name={AppRoutes.PRODUCT_VEHICLE_ACCESSORY_PREVIEW}
        component={ProductAddVehiclePreviewScreen}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AppRoutes.PART_SELECT_SCREEN}
        component={PartSelectScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Dùng cho (các) thiết bị',
          headerTitleAlign: 'left',
        }}
      />

      <Stack.Screen
        name={AppRoutes.VOUCHER_SCREEN}
        component={VoucherScreen}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AppRoutes.VOUCHER_DETAIL_SCREEN}
        component={VoucherDetailScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Thông tin chi tiết',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name={AppRoutes.CHOOSE_PRODUCT}
        component={ChooseProductScreen}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={AppRoutes.VOUCHER_ADD_SCREEN}
        component={VoucherAddScreen}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={AppRoutes.ACCOUNT_ADDRESS}
        component={AccountAddress}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Địa chỉ',
        }}
      />

      <Stack.Screen
        name={AppRoutes.ACCOUNT_ADDRESS_DETAIL}
        component={AccountAddressForm}
        options={({ route }) => ({
          ...withHeaderOptions,
          headerTitle: route.params.title,
        })}
      />

      <Stack.Screen
        name={AppRoutes.ACCOUNT_EDITING}
        component={AccountEditing}
        options={{ ...withHeaderOptions, headerShown: false }}
      />

      <Stack.Screen
        name={AppRoutes.ACCOUNT_CHANGE_PASSWORD}
        component={ChangePassword}
        options={{ ...withHeaderOptions, headerShown: false }}
      />

      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_CANCEL_REQUEST}
        component={RepairRequestCancelRequestScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Lý do từ chối',
        })}
      />

      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_REQUEST_PUSH_AGENCY}
        component={RepairRequestRequestPushAgencyScreen}
        options={{ ...withHeaderOptions, headerShown: false, gestureEnabled: false }}
      />

      <Stack.Screen
        name={AppRoutes.REQUEST_PUSH_TECHNICIAN}
        component={RepairRequestRequestPushTechnician}
        options={{ ...withHeaderOptions, headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_QUOTATION_FORM_SCREEN}
        component={RepairRequestQuotationFormScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Chẩn đoán & báo giá',
        })}
      />
      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_QUOTATION_CONFIRM_SCREEN}
        component={RepairRequestQuotationConfirmScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Gửi báo giá',
        })}
      />
      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_AGENCY_ASSIGN_TECHNICIAN}
        component={RepairRequestAgencyAssignTechnicianScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Phân giao kĩ thuật viên',
        })}
      />
      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_QUOTATION_REJECT_DETAIL}
        component={RepairRequestQuotationRejectDetail}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Chi tiết Yêu cầu báo giá lại',
        })}
      />
      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_RESCHEDULE_REQUEST}
        component={RepairRequestRescheduleScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Hẹn ngày đến',
        })}
      />
      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_CREATE_SETTLEMENT}
        component={RepairRequestCreateSettlementScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Tạo quyết toán',
        })}
      />
      <Stack.Screen
        name={AppRoutes.REPAIR_REQUEST_REVIEW_CUSTOMER}
        component={RepairRequestReviewCustomerScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Đánh giá khách hàng',
        })}
      />
      <Stack.Screen
        name={AppRoutes.PARTNER_UPDATE_MY_INFO}
        component={TechnicianUpdateInfo}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Chỉnh sửa hồ sơ',
        })}
      />

      <Stack.Screen
        name={AppRoutes.MY_ORDER_LIST_SCREEN}
        component={MyOrderListScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Đơn hàng ',
        })}
      />
      <Stack.Screen
        name={AppRoutes.MY_ORDER_DETAIL_SCREEN}
        component={MyOrderDetailScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Chi tiết đơn hàng',
        })}
      />
      <Stack.Screen
        name={AppRoutes.MY_ORDER_CANCEL_REASON_SCREEN}
        component={MyOrderCancelReasonScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Lí do huỷ đơn hàng',
        })}
      />
      <Stack.Screen
        name={AppRoutes.PRODUCT_QUOTATION_LIST_SCREEN}
        component={ListProductQuotations}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Danh sách Yêu cầu báo giá',
        })}
      />
      <Stack.Screen
        name={AppRoutes.PRODUCT_QUOTATION_DETAIL_SCREEN}
        component={ProductQuotationDetailScreen}
        options={() => ({
          ...withHeaderOptions,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={AppRoutes.REVIEW_STORE_SCREEN}
        component={ReviewStoreScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Đánh giá cửa hàng',
        })}
      />
      <Stack.Screen
        name={AppRoutes.REVENUE_SCREEN}
        component={RevenueScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Doanh thu',
        })}
      />
      <Stack.Screen
        name={AppRoutes.REVENUE_FILTER_SCREEN}
        component={RevenueFilterScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Lọc theo',
        })}
      />
      <Stack.Screen name={AppRoutes.FEEDBACK_CREATE} component={FeedbackCreate} options={{ headerShown: false }} />
      <Stack.Screen name={AppRoutes.FEEDBACK_DETAIL} component={FeedbackDetail} options={{ headerShown: false }} />
      <Stack.Screen name={AppRoutes.FEEDBACK} component={Feedback} options={{ headerShown: false }} />
      <Stack.Screen name={AppRoutes.ACCOUNT_SETTING} component={Setting} options={{ headerShown: false }} />
      <Stack.Screen
        name={AppRoutes.MY_ORDER_REVIEW_SCREEN}
        component={MyOrderReviewScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Đánh giá đơn hàng',
        })}
      />
      <Stack.Screen
        name={AppRoutes.DOCUMENT_SCREEN}
        component={DocumentScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Tài liệu tham khảo',
        })}
      />
      <Stack.Screen
        name={AppRoutes.DOCUMENT_LIST_SCREEN}
        component={DocumentListScreen}
        options={() => ({
          ...withHeaderOptions,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={AppRoutes.DOCUMENT_DETAIL_SCREEN}
        component={DocumentDetailScreen}
        options={{ ...withHeaderOptions }}
      />

      <Stack.Screen
        name={AppRoutes.SURVEY_LIST_SCREEN}
        component={SurveyListScreen}
        options={{ ...withHeaderOptions, headerTitle: 'Khảo sát', headerTitleAlign: 'left' }}
      />
      <Stack.Screen
        name={AppRoutes.SURVEY_SCREEN}
        component={SurveyScreen}
        options={{ ...withHeaderOptions, headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.WAREHOUSE_LIST_SCREEN}
        component={WarehouseListScreen}
        options={{ ...withHeaderOptions, headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.WAREHOUSE_DETAIL_SCREEN}
        component={WarehouseDetailScreen}
        options={{ ...withHeaderOptions, headerTitleAlign: 'left', headerTitle: 'Thông tin kho hàng' }}
      />
      <Stack.Screen
        name={AppRoutes.WAREHOUSE_ADD_SCREEN}
        component={WarehouseAddScreen}
        options={{ ...withHeaderOptions, headerTitleAlign: 'left', headerTitle: 'Thêm mới kho hàng' }}
      />
      <Stack.Screen
        name={AppRoutes.WAREHOUSE_IMPORT_EXPORT_PRODUCT_SCREEN}
        component={WarehouseImportExportProductScreen}
        options={{ ...withHeaderOptions, headerShown: false }}
      />
    </Stack.Navigator>
  );
};
