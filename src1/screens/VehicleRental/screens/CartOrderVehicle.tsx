import {
  Buttons,
  RNFlatList,
  HomeLayout,
  IconApp,
  TextCus,
  TextInputs,
  TouchCus,
  ViewCus,
  BottomSheetCommon,
  ImageCus,
} from 'components';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InteractionManager, StyleSheet, Modal, Alert } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { formatDistanceKm, formatMoney } from 'utils';
import { IconName, Images } from 'assets';
import { VehicleCategoryCartItem } from '../components';
import { NavigationService, RootStackParamList, Routes } from 'navigation';
import { useCart } from 'context/CartContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  useAuth,
  useGeo,
  useVehicleRental,
  useLocation,
  useShippingType,
} from 'hooks';
import { IRefBottom } from 'types';
import Icon from 'assets/svg/Icon';
import { useTranslation } from 'react-i18next';
const Line = () => <ViewCus h-8 bg-greyF5 />;
const CartOrderVehicle: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CartOrder'>>();
  const {
    orderItems: carts,
    price,
    updateLocationOrder: updateLocation,
    location: cartLocation,
    note,
    setNote,
    setOrderRequest,
    promotions,
    orderRequest,
    setPromotions
  } = useCart();
  const [address, setAddress] = useState('');
  const { onNameByLatLng, searchDetail } = useGeo();
  const {
    selectedPromos,
    detailGarage,
    estimatePrices,
    onCalculate,
    createVehicleOrder,
  } = useVehicleRental();
  const { listData: listShippingType } = useShippingType();

  const [totalPrice, setTotalPrice] = useState(price);
  const [priceDelivery, setPriceDelivery] = useState(0);
  const [visiableSuccess, setVisiableSuccess] = useState(false);
  const { locationUser } = useLocation();
  const { user, userInfo } = useAuth();
  const { t } = useTranslation();
  
  const refBottom = useRef<IRefBottom>(null);
  const showLoginForm = useCallback(() => {
    refBottom.current?.show();
  }, []);

  useEffect(() => {
    if (price < promotions[0]?.condition?.condition_value) {
      setPromotions([]);
      Alert.alert(t('category.alert'), t('category.alertPromotion'), [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('ok'),
          onPress: () => {},
        },
      ]);
    }
    onCalculate(
      { shippingTypeId: listShippingType[0]?.id, ...orderRequest },
      rs => {
        if (rs.status === 200) {
          setPriceDelivery(
            listShippingType[0]?.pricePerKm * rs.data.result[0].distanceKm,
          );
          if (
              promotions.length > 0 &&
              price > promotions?.[0]?.condition?.condition_value
          ) {
            setTotalPrice(
                price +
                listShippingType[0]?.pricePerKm * rs.data.result[0].distanceKm -
                promotions?.[0]?.condition?.condition_value,
            );
          } else {
            setTotalPrice(
                price +
                listShippingType[0]?.pricePerKm * rs.data.result[0].distanceKm,
            );
          }
        }
      },
    );
    // setPriceDelivery(listShippingType[0]?.pricePerKm * distance);
  }, [listShippingType.length, orderRequest, promotions]);

  useEffect(() => {
    if (!cartLocation || !cartLocation.lat || !cartLocation.long) {
      if (locationUser) {
        updateLocation(locationUser);
      }
    }
  }, []);

  useEffect(() => {
    if (cartLocation) {
      onNameByLatLng(
        { latitude: cartLocation.lat, longitude: cartLocation.long },
        from => {
          setAddress(from);
        },
      );
    }
  }, [cartLocation, setAddress]);

  useEffect(() => {
    let orderInfo: any = {
      paymentMethod: 'COD',
      currencyType: 'VND',
      garageId: '',
      orderItems: [],
      customer: {
        address: address,
        fullName: userInfo.full_name,
        lat: cartLocation?.lat,
        long: cartLocation?.long,
        userPhone: userInfo.phone_number,
      },
    };
    if (detailGarage && carts) {
      orderInfo.garageId = detailGarage.id;
      orderInfo.orderItems = carts.map(obj => ({
        ...obj,
        extraOptions: obj.extraOptions.map(exop => ({ id: exop.id })),
      }));
    }
    if (selectedPromos[0]) {
      orderInfo.promotionCode = selectedPromos[0].code;
    }

    // estimate total price
    if (orderInfo.customer?.address) {
      setOrderRequest(orderInfo);
    }
  }, [selectedPromos, address, detailGarage, carts, user, cartLocation]);

  const onChooseDelivery = useCallback(() => {
    NavigationService.navigate(Routes.InputAddress, {
      callback: ads => {
        if (ads?.place_id) {
          searchDetail({ place_id: ads?.place_id }, rs => {
            if (rs.result) {
              const { formatted_address, geometry } = rs.result;
              if (geometry.location) {
                updateLocation({
                  lat: geometry.location.lat,
                  long: geometry.location.lng,
                });
              }
            }
          });
        }
      },
    });
  }, []);
  const onApplyPromotion = useCallback(() => {
    return NavigationService.navigate(Routes.Promotion, {
      backPath: Routes.CartOrderVehicle,
      params: {
        distance: route.params?.distance,
        title: route.params?.title,
      },
    });
  }, []);
  const renderItem = useCallback(({ item, index }) => {
    const extraOptions =
      item.extraOptions?.reduce((prev, curr) => prev + curr.price, 0) ?? 0;
    const calculatedPrice = (item.price + extraOptions) * item.quantity;
    return (
      <VehicleCategoryCartItem
        key={index}
        {...{
          ...item,
          price: calculatedPrice,
          index: item.index,
          extraFood: item.extraOptions,
        }}
      />
    );
  }, []);

  const ListComponentHeader = useCallback(() => {
    return (
      <>
        <ViewCus style={[BaseStyle.wrapperDisable]}>
          <TextCus heading5 color-grey85>
            Giao tới
          </TextCus>
        </ViewCus>
        <TouchCus
          onPress={onChooseDelivery}
          style={[BaseStyle.wrapperMain]}
          flex-row
          items-center>
          <ViewCus flex-row f-1 items-center style={BaseStyle.flexShrink1}>
            <Icon.IconLocationActive width={22} height={22} />
            <ViewCus px-10>
              <TextCus heading5>{userInfo?.full_name}</TextCus>
              <TextCus numberOfLines={1}>{address}</TextCus>
            </ViewCus>
          </ViewCus>
          <IconApp name={IconName.ChevronRight} size={14} style={styles.icon} />
        </TouchCus>
        <ViewCus style={[BaseStyle.wrapperDisable]}>
          <TextCus heading5 color-grey85>
            Đơn hàng
          </TextCus>
        </ViewCus>
      </>
    );
  }, [onChooseDelivery, address, userInfo?.full_name]);

  const onForceLogin = useCallback(() => {
    refBottom.current?.close();
    InteractionManager.runAfterInteractions(() => {
      NavigationService.navigate(Routes.InputPhone, {
        back: Routes.CartOrder,
      });
    });
  }, []);

  const ListComponentFooter = ({ setValue, value }) => {
    return (
      <ViewCus>
        <ViewCus style={[[BaseStyle.wrapperDisable]]}>
          <TextCus>Ghi chú (không bắt buộc)</TextCus>
        </ViewCus>
        <ViewCus style={[BaseStyle.wrapperMain]}>
          <TextInputs
            placeholder="category.service_note"
            style={styles.input}
            onChangeText={setValue}
            value={value}
          />
        </ViewCus>
        <Line />
        <TouchCus style={[BaseStyle.wrapperMain]} onPress={onApplyPromotion}>
          <TextCus heading5 mb-4 useI18n>
            category.title_promotion
          </TextCus>
          <ViewCus>
            {selectedPromos[0] && (
              <ViewCus style={BaseStyle.flexRowSpaceBetwwen}>
                <TextCus useI18n>category.applied_promotion</TextCus>
                <TextCus>{selectedPromos[0].name}</TextCus>
              </ViewCus>
            )}
            <ViewCus style={BaseStyle.flexRowSpaceBetwwen}>
              <TextCus color-blue47 useI18n>
                {selectedPromos[0]
                  ? 'category.change_promotion'
                  : 'category.enter_promotion'}
              </TextCus>
              <IconApp name={IconName.ChevronRight} color={Colors.blue47} />
            </ViewCus>
          </ViewCus>
        </TouchCus>
        <Line />
        <ViewCus style={[BaseStyle.wrapperMain]}>
          <TextCus heading5 mb-4 useI18n>
            category.title_payment
          </TextCus>
          <ViewCus style={styles.linePrice}>
            <TextCus color-grey85 useI18n>
              category.estimate
            </TextCus>
            <TextCus>{formatMoney(price)}</TextCus>
          </ViewCus>
          {/* <ViewCus style={styles.linePrice}>
              <TextCus color-grey85 useI18n paramI18n={{ number: 12 }}>
                category.fee_delivery
              </TextCus>
              <TextCus>{formatMoney(0)}</TextCus>
            </ViewCus> */}
          <ViewCus style={styles.linePrice}>
            <TextCus color-grey85 useI18n>
              category.special_fee
            </TextCus>
            <TextCus>{formatMoney(priceDelivery)}</TextCus>
          </ViewCus>
        </ViewCus>
        <Line />
        <TouchCus
          style={[BaseStyle.wrapperMain]}
          disabled
          onPress={() => NavigationService.navigate(Routes.BikeMethodPayment)}>
          <TextCus heading5 mb-4 useI18n>
            category.payment
          </TextCus>
          <ViewCus style={BaseStyle.flexRowSpaceBetwwen}>
            <TextCus color-blue47>Thanh toán tiền mặt</TextCus>
            {/* <IconApp name={IconName.ChevronRight} color={Colors.blue47} /> */}
          </ViewCus>
        </TouchCus>
        <ViewCus style={[BaseStyle.wrapperDisable]}>
          <TextCus>
            <TextCus useI18n>category.agree</TextCus>
            <TextCus useI18n>
              category.term
            </TextCus>
          </TextCus>
        </ViewCus>
      </ViewCus>
    );
  };

  const payment = async () => {
    if (orderRequest) {
      createVehicleOrder({
        ...orderRequest,
        shippingTypeId: listShippingType[0]?.id,
        promotionCode: promotions?.[0]?.code,
      }).then(rs => {
        if (rs?.data?.orderCode) {
          setVisiableSuccess(true);
        }
      });
    }
  };

  const exit = () => {
    setVisiableSuccess(false);
    NavigationService.goBack();
  };

  const goToHome = () => {
    setVisiableSuccess(false);
    NavigationService.navigate(Routes.Home);
  };
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        renderCenter: () => (
          <ViewCus>
            <TextCus bold color-white textAlign="center">
              {route.params?.title}
            </TextCus>
            <TextCus subhead color-white textAlign="center">
              Bán kính gần bạn:{' '}
              {`${formatDistanceKm(route.params?.distance)} km`}
            </TextCus>
          </ViewCus>
        ),
        iconColor: Colors.white,
      }}>
      <ViewCus f-1>
        <RNFlatList
          data={carts}
          renderItem={renderItem}
          ListHeaderComponent={<ListComponentHeader />}
          ListFooterComponent={() => ListComponentFooter(setNote, note)}
        />
      </ViewCus>
      <ViewCus
        flex-row
        justify-space-between
        items-center
        px-16
        bg-white
        btw-1
        pt-12
        pb-30
        btc-greyEE>
        <ViewCus mr-24>
          <TextCus useI18n>category.total</TextCus>
          <ViewCus flex-row>
            <TextCus bold main mr-4>
              {formatMoney(totalPrice)}
            </TextCus>
            <TextCus color-grey85 useI18n paramI18n={{ number: carts?.length }}>
              category.quantity
            </TextCus>
          </ViewCus>
        </ViewCus>
        <Buttons
          textBtn="category.payment"
          style={styles.btnAddFood}
          onPress={payment}
        />
      </ViewCus>

      <BottomSheetCommon ref={refBottom} hideBackdrop={false}>
        <ViewCus style={styles.bgWhite} pb-10>
          <ViewCus items-center>
            <Icon.ICON_WARNING_2 />
          </ViewCus>
          <ViewCus style={[styles.pdHorzi50, styles.mgVertzi20]}>
            <TextCus
              useI18n
              mb-8
              heading1
              textAlign="center"
              color={Colors.orangeFB}>
              auth.login
            </TextCus>
            <TextCus useI18n textAlign="center" color={Colors.grey85}>
              Đăng nhập ngay để sử dụng các tính năng
            </TextCus>
          </ViewCus>
          <ViewCus style={styles.bottomAction}>
            <Buttons
              style={[styles.btnAction, styles.actionRegister]}
              onPress={() => {
                // TODO: logic same login but fix the refGlobal null in register
                refBottom.current?.close();
                InteractionManager.runAfterInteractions(() => {
                  NavigationService.reset(Routes.InputPhone);
                });
              }}
              disabled={false}>
              <TextCus useI18n heading5 color-black3A>
                auth.register
              </TextCus>
            </Buttons>
            <Buttons
              style={[styles.btnAction, styles.actionLogin]}
              onPress={onForceLogin}
              disabled={false}>
              <TextCus heading5 useI18n color={Colors.white}>
                auth.login
              </TextCus>
            </Buttons>
          </ViewCus>
        </ViewCus>
      </BottomSheetCommon>
      <Modal visible={visiableSuccess} transparent>
        <ViewCus style={styles.modalSuccess}>
          <ViewCus style={styles.contentModal}>
            <Icon.ICON_SUCCESS color={Colors.main} />
            <TextCus heading3 color={Colors.main}>
              Gửi yêu cầu thành công
            </TextCus>
            <TextCus color-grey84>Yêu cầu của bãn đã hoàn thành!</TextCus>
            <TextCus color-grey84>Hãy để lại đánh giá của bạn nhé!</TextCus>
            <ViewCus flex-row justify-space-between mt-20>
              <TouchCus style={styles.btnCancle} onPress={exit}>
                <TextCus useI18n heading5 color-main>
                  exit
                </TextCus>
              </TouchCus>
              <Buttons
                textBtn="bottom.home"
                style={styles.btnHome}
                onPress={goToHome}
              />
            </ViewCus>
          </ViewCus>
        </ViewCus>
      </Modal>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  btnAddFood: {
    flex: 0.75,
    borderRadius: 8,
  },
  icon: {
    flexShrink: 1,
    marginLeft: 30,
    color: Colors.greyAD,
  },
  linePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyED,
    marginTop: 10,
  },
  input: {
    borderRadius: 4,
  },

  bgWhite: {
    backgroundColor: Colors.white,
  },
  pdHorzi50: {
    paddingHorizontal: 50,
  },
  mgVertzi20: {
    marginVertical: 20,
  },
  btnAction: {
    flex: 1,
    borderRadius: 16,
  },
  bottomAction: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  actionRegister: {
    marginRight: 10,
    backgroundColor: Colors.greyD1,
    borderWidth: 1,
    borderColor: Colors.transparent,
  },
  actionLogin: {
    backgroundColor: Colors.orangeFF,
    borderColor: Colors.transparent,
  },
  modalSuccess: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.transparent07,
  },
  contentModal: {
    height: 300,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancle: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.main,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  btnHome: {
    paddingHorizontal: 40,
    borderRadius: 10,
    marginLeft: 30,
  },
});
export default CartOrderVehicle;
