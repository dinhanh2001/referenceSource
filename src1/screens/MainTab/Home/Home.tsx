/* eslint-disable react-native/no-inline-styles */
import {
  HomeLayout,
  ImageCus,
  ScrollViewCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { useAuth, useGeo, useHome, useLocation, useKey } from 'hooks';
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { Colors } from 'theme';
import { DATA_CATEGORY, IPage } from 'types';
import { formatNumber, getImage, isIos, KEY_CONTEXT } from 'utils';
import IconSVG from 'assets/IconSVG';
import { AttractiveOffers, ListCategories } from './Components';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { NavigationService, Routes } from 'navigation';
import RentService from 'screens/MainTab/Home/Components/RentService';
import HotDeal from 'screens/MainTab/Home/Components/HotDeal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getWalletProfileAPI } from 'utils/APIManager';
import { setFCMTokenUser } from 'components/Permissions';
import Icon from 'assets/svg/Icon';
import { Badge, useTheme } from 'react-native-paper';
import TopCategories from './Components/TopCategories';
import { dataNewFriends } from './DataFake';

const Home: React.FC = () => {
  const {
    getListCategories,
    listCategories,
    getRestaurantNearMe,
    listRestaurantNearMe,
    onFCMToken,
  } = useHome();
  const { colors } = useTheme();
  const { locationUser } = useLocation();
  const { searchAutoComplete, onNameByLatLng } = useGeo();
  const [totalAmount, setTotalAmount] = useState<number | string>(0);
  const { getKeyStore } = useKey();
  const { t } = useTranslation();
  const { userInfo } = useAuth();
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [addressDescription, setAddressDescription] = useState('');
  const [isShowPrice, setIsShowPrice] = useState(true);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [showPoint, setShowPoint] = useState(false);

  const point = useMemo(() => {
    return showPoint ? formatNumber(userInfo?.point || 0) : formatNumber('0');
  }, [showPoint, userInfo]);

  useEffect(() => {
    getListCategories();
  }, [getListCategories]);
  useEffect(() => {
    getRestaurantNearMe(
      {
        page: 1,
        limit: 1,
        search: '',
      } as IPage,
      res => {
        // console.log('res', res);
      },
    );
  }, [getRestaurantNearMe]);

  useEffect(() => {
    getPosition();
  }, [locationUser]);

  useEffect(() => {
    setFCMTokenUser(async token => {
      const data = {
        token: token,
      };
      const accept = await getKeyStore(KEY_CONTEXT.ACCESS_TOKEN);
      accept !== 'undefined' && onFCMToken(data, userInfo?.id, () => {});
    });
  }, [userInfo?.useId]);

  const getWalletProfile = useCallback(async () => {
    try {
      const res = await getWalletProfileAPI(userInfo?.id);
      if (res) {
        setTotalAmount(res?.data?.result?.[0]?.total_amount || 0);
      }
    } catch (error) {
      if (error) {
      }
    }
  }, [userInfo]);

  useEffect(() => {
    getWalletProfile();
  }, [userInfo]);

  const getPosition = useCallback(() => {
    if (locationUser) {
      onNameByLatLng(
        { latitude: locationUser.lat, longitude: locationUser.long },
        result => {
          searchAutoComplete(
            {
              input: result,
              options: {
                limit: 1,
              },
            },
            (res: any[]) => {
              if (res && res[0]) {
                setAddressDescription(res[0]?.description);
              }
            },
          );
        },
      );
    }
  }, [locationUser]);

  const { categories } = useMemo(() => {
    return {
      categories: (listCategories || [])?.map(item => {
        return {
          ...item,
          defaultIcon: item?.defaultIcon || DATA_CATEGORY?.[item.type]?.icon,
          onPress: DATA_CATEGORY[item.type]?.onPress,
        };
      }),
      // {
      //   defaultIcon: DATA_CATEGORY.ALL?.icon,
      //   onPress: DATA_CATEGORY.ALL?.onPress,
      //   name: 'Tất cả',
      // },
    };
  }, [listCategories]);

  const onFavorite = useCallback(() => {}, []);

  const renderRight = useCallback(() => {
    return (
      <TouchCus onPress={onFavorite}>
        <IconSVG.Heart />
      </TouchCus>
    );
  }, []);

  // const length = userInfo?.full_name?.split(' ').length;
  // const fullName =
  //   `${
  //     (!!userInfo?.full_name?.split(' ')[length - 2] &&
  //       userInfo?.full_name?.split(' ')[length - 2]) ||
  //     ' '
  //   }` +
  //   ' ' +
  //   userInfo?.full_name?.split(' ')[length - 1];

  const onNotification = () => {
    NavigationService.navigate(Routes.Notification);
  };

  const onUpdateLater = () => {
    Toast.show({
      text1: 'Tính năng đang được phát triển',
      position: 'top',
      type: 'error',
    });
  };

  return (
    <HomeLayout
      bgColor={colors.primary}
      header={{
        notGoBack: true,
      }}>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <ViewCus f-1 style={{ backgroundColor: Colors.whiteF6 }}>
        <ViewCus
          flex-row
          justify-space-between
          py-5
          px-16
          pb-10
          items-center
          style={{
            backgroundColor: colors.primary,
          }}>
          {/* <ViewCus f-4 mr-10 flex-true justify-content-center items-flex-start> */}
          <ViewCus
            // f-4
            mr-10
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ViewCus
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <ImageCus
                style={styles.image}
                source={{ uri: getImage({ image: userInfo?.avatar }) }}
              />
              <ViewCus style={{ marginTop: -10 }}>
                <Icon.GoldImage />
              </ViewCus>
            </ViewCus>
            <ViewCus
              ml-5
              style={{
                display: 'flex',
                alignItems: 'stretch',
              }}>
              <ViewCus pb-5 flex-row>
                <TextCus color-white fontSize-16 useI18n>
                  {t('hi')}
                </TextCus>
                <TextCus color-white style={{ fontWeight: 'bold' }}>
                  {`, ${userInfo?.full_name ?? ''}`}
                </TextCus>
              </ViewCus>
              <ViewCus
                flex-row
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 8,
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                <Icon.PigImage />
                <TextCus style={{ fontWeight: '700' }} pl-5>
                  {userInfo?.point} Điểm
                </TextCus>
              </ViewCus>
            </ViewCus>
          </ViewCus>
          <ViewCus f-6 justify-flex-end items-flex-end flex-row>
            <TouchCus
              justify-center
              mx-12
              onPress={onUpdateLater}
              hitSlop={{
                top: 5,
                bottom: 5,
              }}>
              <Icon.SearchHomeIcon />
            </TouchCus>
            <TouchCus
              justify-center
              pl-10
              onPress={onNotification}
              hitSlop={{
                top: 8,
                bottom: 8,
                right: 8,
              }}>
              <Badge
                size={10}
                style={{
                  backgroundColor: '#08C106',
                  paddingHorizontal: 5,
                  position: 'absolute',
                  zIndex: 100,
                  top: -3,
                  // right: -5,
                }}
                // children={24}
              />
              <Icon.RingIcon />
            </TouchCus>
          </ViewCus>
        </ViewCus>

        <ViewCus
          flex-row
          px-16
          py-10
          mb-5
          items-center
          style={{
            backgroundColor: colors.primary,
          }}>
          {/* <Image source={Images.location} style={{ tintColor: Colors.white }} /> */}
          <Icon.LocationHome />
          <TextCus
            l-5
            color-white
            heading5
            semiBold
            f-1
            numberOfLines={1}
            style={{ maxWidth: '80%' }}>
            {addressDescription || userInfo?.address}
          </TextCus>
        </ViewCus>

        <ViewCus f-1>
          <ScrollViewCus contentContainerStyle={{ marginTop: 16 }}>
            {categories?.length &&
            Array.isArray(categories?.slice(3)) &&
            categories?.slice(3)?.length ? (
              <TopCategories categories={categories?.slice(0, 3) || []} />
            ) : null}
            {categories?.length &&
            Array.isArray(categories?.slice(3, 11)) &&
            categories?.slice(3, 11) ? (
              <ListCategories
                hiddenTitle={true}
                categories={categories?.slice(3, 11)}
                title={'Vận tải & giao nhận'}
              />
            ) : null}
            <ViewCus h-16 />
            {/*<Advertisement />*/}
            <AttractiveOffers
              promotions={listRestaurantNearMe}
              title="resNearYou"
            />
            {categories?.length &&
            Array.isArray(categories?.slice(11, 19)) &&
            categories?.slice(11, 19) ? (
              <ListCategories
                categories={categories?.slice(11, 19)}
                title={'Dịch vụ theo giờ'}
                senondary={true}
              />
            ) : null}
            <ViewCus h-16 />
            <AttractiveOffers
              promotions={listRestaurantNearMe?.result}
              title="sponsoredBy"
            />
            {/*<Advertisement />*/}
            {categories?.length &&
            Array.isArray(categories?.slice(19, 27)) &&
            categories?.slice(19, 27)?.length ? (
              <ListCategories
                categories={categories?.slice(19, 27)}
                title={'Dịch vụ sửa chữa'}
                senondary={true}
              />
            ) : null}
            {/*<Advertisement />*/}
            <ViewCus h-16 />
            <AttractiveOffers
              promotions={listRestaurantNearMe?.result}
              title="sponsoredBy"
            />
            {categories?.length &&
            Array.isArray(categories?.slice(27, 35)) &&
            categories?.slice(27, 35)?.length ? (
              <ListCategories
                categories={categories?.slice(27, 35)}
                title={'Vệ sinh công nghiệp'}
                senondary={true}
              />
            ) : null}
            <ViewCus h-16 />
            <AttractiveOffers
              promotions={dataNewFriends}
              title="promotionMore"
              isShowRatting={false}
            />
            <HotDeal />
            <ViewCus h-16 />
            <RentService />
            <ViewCus h-16 />
          </ScrollViewCus>
        </ViewCus>
      </ViewCus>
    </HomeLayout>
  );
};
export default Home;
