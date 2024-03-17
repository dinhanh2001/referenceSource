import { createStackNavigator } from '@react-navigation/stack';
import { useMemo } from 'react';
import { Pressable } from 'react-native';

import { tw } from '../components';
import { AppStackNavigatorParamList } from '../navigator-params';
import {
  AccountAddress,
  AddressDetail,
  ChangePassword,
  ECommerceHome,
  ECommerceProductDetail,
  ECommerceProductDetailSpecs,
  ECommerceSearch,
  ECommerceSearchResult,
  ECommerceStoreDetail,
  ECommerceSearchFilter,
  MediaPreview,
  MyRepairRequestsDetail,
  MyRepairRequestsIssueDetail,
  MyVehicles,
  RepairRequest,
  RepairRequestListTechnician,
  RepairRequestPartnerDetail,
  RepairRequestSelectCarScreen,
  RepairRequestSelectCardQuickAddInfoFormScreen,
  RepairRequestSelectPartnerScreen,
  RepairRequestSelectProblemScreen,
  SurveyScreen,
  VehicleCreate,
  VehicleDetail,
  FavoriteProducts,
  ECommerceCart,
  ECommerceCartAddress,
  ECommerceMyOrder,
  ECommerceMyOrderDetail,
  ECommerceCartPaymentSuccess,
  ECommerceCartPayment,
  ECommerceMyOrderReview,
  ECommercePriceRequestScreen,
  ECommercePriceRequestDetail,
  ECommerceFormQuotation,
  ECommerceCartDiscountSelect,
  ECommerceCancelOrder,
  CreateMaintenanceScreen,
  ECommerceProductOrderScreen,
  MaintenanceFormSuppliesScreen,
  MaintenanceSuppliesScreen,
  MaintenanceDetailScreen,
  CancelMaintenanceScreen,
  ECommerceProductReview,
  Feedback,
  FeedbackDetail,
  FeedbackCreate,
  GuideListScreen,
  GuideDetailScreen,
  GuideContentScreen,
  SurveyListScreen,
  ECommerceListProducts,
  SearchHome,
  MyRepairRequestsReSettlementReason,
} from '../screens';
import { AccountEditting } from '../screens/account-editting';
import { MyRepairRequestsReview } from '../screens/my-repair-request-review';
import { MyRepairRequestsCancelReason } from '../screens/my-repair-requests-cancel-reason';
import { MyRepairRequestsPushQuotation } from '../screens/my-repair-requests-push-quotation';
import { MyRepairRequestsQuotationHistory } from '../screens/my-repair-requests-quotation-history';
import { MyRepairRequestsRequoteDetail } from '../screens/my-repair-requests-requote-detail';
import { MyRepairRequestsRequoteReason } from '../screens/my-repair-requests-requote-reason';
import { MyRepairRequestsScheduleDetail } from '../screens/my-repair-requests-schedule-detail';
import { MyRepairRequestsSettlementDetail } from '../screens/my-repair-requests-settlement-detail/my-repair-requests-settlement-detail';
import { MyRepairRequestsStatus } from '../screens/my-repair-requests-status';
import { ReviewTechnician } from '../screens/review-technician';
import { ArrowLeftCustom } from '../svg';
import { useNotificationObserver } from '../hooks';
import { PartnerDetailScreen } from '../screens/home/partner-detail';
import { NewDetail, News } from '../screens/news';

import { AppBottomTabsNavigator } from './bottom-tab-navigator';
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

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerTitleAlign: 'left',
        ...defaultStackNavigationOptions,
      }}
    >
      <Stack.Screen name="bottom-tab" component={AppBottomTabsNavigator} />
      <Stack.Screen name="account-address" component={AccountAddress} options={{ headerShown: false }} />
      <Stack.Screen name="address-detail" component={AddressDetail} options={{ headerShown: false }} />
      <Stack.Screen name="account-editting" component={AccountEditting} options={{ headerShown: false }} />
      <Stack.Screen
        name="list-survey"
        component={SurveyListScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Khảo sát',
        }}
      />
      <Stack.Screen
        name="form-survey"
        component={SurveyScreen}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen name="change-password" component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name="my-vehicles" component={MyVehicles} options={{ headerShown: false }} />
      <Stack.Screen name="vehicle-detail" component={VehicleDetail} options={{ headerShown: false }} />
      <Stack.Screen name="vehicle-create" component={VehicleCreate} options={{ headerShown: false }} />
      <Stack.Screen name="feedback" component={Feedback} options={{ headerShown: false }} />
      <Stack.Screen name="feedback-detail" component={FeedbackDetail} options={{ headerShown: false }} />
      <Stack.Screen name="feedback-create" component={FeedbackCreate} options={{ headerShown: false }} />
      <Stack.Screen name="repair-request" component={RepairRequest} options={{ headerShown: false }} />
      <Stack.Screen name="favourite-products" component={FavoriteProducts} options={{ headerShown: false }} />
      <Stack.Screen
        name="repair-request/select-problem"
        component={RepairRequestSelectProblemScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="repair-request/select-car"
        component={RepairRequestSelectCarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="repair-request/select-car/quick-add"
        component={RepairRequestSelectCardQuickAddInfoFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="repair-request/select-partner"
        component={RepairRequestSelectPartnerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="repair-request/select-partner/partner-detail"
        component={RepairRequestPartnerDetail}
        options={{
          ...withHeaderOptions,
          headerTransparent: true,
          headerLeft: ({ onPress }) => (
            <Pressable onPress={onPress}>
              <ArrowLeftCustom fill={'#fff'} style={tw`mx-16px`} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="repair-request/select-partner/list-technician"
        component={RepairRequestListTechnician}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Danh sách kỹ thuật viên',
        }}
      />
      <Stack.Screen
        name="my-repair-request/issue-detail"
        component={MyRepairRequestsIssueDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="media-preview" component={MediaPreview} options={{ headerShown: false }} />
      <Stack.Screen
        name="my-repair-request/detail"
        component={MyRepairRequestsDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="my-repair-request/cancel-reason"
        component={MyRepairRequestsCancelReason}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="my-repair-request/schedule-detail"
        component={MyRepairRequestsScheduleDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="my-repair-request/push-quotation"
        component={MyRepairRequestsPushQuotation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="my-repair-requests/requote-reason"
        component={MyRepairRequestsRequoteReason}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="my-repair-requests/quotation-history"
        component={MyRepairRequestsQuotationHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="my-repair-requests/requote-detail"
        component={MyRepairRequestsRequoteDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="my-repair-requests/request-status"
        component={MyRepairRequestsStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="my-repair-requests/settlement-detail"
        component={MyRepairRequestsSettlementDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="my-repair-requests/re-settlement-reason"
        component={MyRepairRequestsReSettlementReason}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Lý do yêu cầu quyết toán lại',
        }}
      />
      <Stack.Screen
        name="my-repair-request/review"
        component={MyRepairRequestsReview}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="review-technician" component={ReviewTechnician} options={{ headerShown: false }} />
      <Stack.Screen
        name="e-commerce/home"
        component={ECommerceHome}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/search"
        component={ECommerceSearch}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/search-result"
        component={ECommerceSearchResult}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/store-detail"
        component={ECommerceStoreDetail}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/search-filter"
        component={ECommerceSearchFilter}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/product-list"
        component={ECommerceListProducts}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/product-detail"
        component={ECommerceProductDetail}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/product-review"
        component={ECommerceProductReview}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Đánh giá sản phẩm',
        }}
      />
      <Stack.Screen
        name="e-commerce/product-order"
        component={ECommerceProductOrderScreen}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/product-detail-specs"
        component={ECommerceProductDetailSpecs}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/cart"
        component={ECommerceCart}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/cart-address"
        component={ECommerceCartAddress}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/cart-payment"
        component={ECommerceCartPayment}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/cart-payment-success"
        component={ECommerceCartPaymentSuccess}
        options={{
          ...withHeaderOptions,
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/cart-discount-select"
        component={ECommerceCartDiscountSelect}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Chọn hoặc nhập mã giảm giá',
        }}
      />
      <Stack.Screen
        name="e-commerce/my-order"
        component={ECommerceMyOrder}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/price-request"
        component={ECommercePriceRequestScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Danh sách Yêu cầu báo giá',
        }}
      />
      <Stack.Screen
        name="e-commerce/price-request-detail"
        component={ECommercePriceRequestDetail}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/price-request-form-quotation"
        component={ECommerceFormQuotation}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="e-commerce/my-order-detail"
        component={ECommerceMyOrderDetail}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Chi tiết đơn hàng',
        }}
      />
      <Stack.Screen
        name="e-commerce/my-order-review"
        component={ECommerceMyOrderReview}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Đánh giá',
        }}
      />
      <Stack.Screen
        name="e-commerce/my-order-cancel"
        component={ECommerceCancelOrder}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Lí do huỷ đơn hàng',
        }}
      />
      <Stack.Screen
        name="maintenance/create"
        component={CreateMaintenanceScreen}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="maintenance/form-supplies"
        component={MaintenanceFormSuppliesScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Hạng mục & vật tư bảo dưỡng',
        }}
      />
      <Stack.Screen
        name="maintenance/supplies"
        component={MaintenanceSuppliesScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Hạng mục & vật tư bảo dưỡng',
        }}
      />
      <Stack.Screen
        name="maintenance/detail"
        component={MaintenanceDetailScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Chi tiết sửa chữa',
        }}
      />
      <Stack.Screen
        name="maintenance/cancel"
        component={CancelMaintenanceScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Lý do hủy yêu cầu sửa chữa',
        }}
      />
      <Stack.Screen
        name={'guide/list'}
        component={GuideListScreen}
        options={() => ({
          ...withHeaderOptions,
          headerTitleAlign: 'left',
          headerTitle: 'Sổ tay',
        })}
      />
      <Stack.Screen
        name={'guide/detail'}
        component={GuideDetailScreen}
        options={{ ...withHeaderOptions, headerShown: false }}
      />
      <Stack.Screen
        name={'guide/content'}
        component={GuideContentScreen}
        options={{ ...withHeaderOptions, headerShown: false }}
      />
      <Stack.Screen
        name={'home/search'}
        component={SearchHome}
        options={{ ...withHeaderOptions, headerShown: false }}
      />
      <Stack.Screen
        name={'home/partner-detail'}
        component={PartnerDetailScreen}
        // component={RepairRequestPartnerDetail}
        options={{
          ...withHeaderOptions,
          headerTransparent: true,
          headerLeft: ({ onPress }) => (
            <Pressable onPress={onPress}>
              <ArrowLeftCustom fill={'#fff'} style={tw`mx-16px`} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="news/detail"
        component={NewDetail}
        options={{
          ...withHeaderOptions,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
