import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from '@rneui/themed';

import { Screen, Space, tw } from '../../components';
import { useAuth } from '../../contexts';
import { PartnerTypeEnum } from '../../graphql/type.interface';
import { AppRoutes, AppStackNavigatorParamList, RootNavigatorParamList } from '../../navigator-params';
import {
  ArrowRightSVG,
  Badge,
  BookLineSVG,
  HappyEmojiSVG,
  LockSVG,
  LogoPrimarySVG,
  OrderAccountSVG,
  Question,
  ServiceAccountSVG,
  Setup,
  SmsEdit,
} from '../../svg';

type RowItemProps = {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  amount?: React.ReactNode;
};

export const RowItem = React.memo(({ title, icon, onPress, amount }: RowItemProps) => {
  return (
    <TouchableOpacity style={tw`flex-row items-center justify-between`} onPress={onPress}>
      {icon}
      <View style={tw`flex-row flex-1 border-b border-grayscale-border ml-16px py-12px`}>
        <Text style={tw`text-14px font-semibold text-grayscale-black flex-1`}>{title}</Text>
        <View style={tw`flex-row items-center`}>
          {amount}
          <ArrowRightSVG />
        </View>
      </View>
    </TouchableOpacity>
  );
});

export const Account = React.memo(
  ({ navigation }: NativeStackScreenProps<AppStackNavigatorParamList & RootNavigatorParamList>) => {
    const { logout, partner } = useAuth();

    const handleLogout = useCallback(async () => {
      await logout();
    }, [logout]);

    const accountActions = useMemo(
      () => [
        {
          title: 'Hồ sơ',
          icon: <HappyEmojiSVG />,
          action: () => {
            navigation.navigate(AppRoutes.PARTNER_UPDATE_MY_INFO);
          },
        },
        {
          title: 'Tài khoản và bảo mật',
          icon: <LockSVG />,
          action: () => {
            navigation.navigate(AppRoutes.ACCOUNT_EDITING);
          },
        },

        // {
        //   title: 'Thông tin thanh toán',
        //   icon: <Card />,
        //   action: () => {
        //     // action
        //   },
        // },
        // {
        //   title: 'Địa chỉ',
        //   icon: <LocationLineSVG />,
        //   action: () => {
        //     navigation.navigate(AppRoutes.ACCOUNT_ADDRESS);
        //   },
        // },
      ],
      [navigation],
    );

    const generalActions = useMemo(
      () =>
        [
          {
            title: 'Tuỳ biến hiển thị',
            icon: <Setup fill={tw.color('grayscale-black')} />,
            action: () => {
              navigation.navigate(AppRoutes.ACCOUNT_SETTING);
            },
          },
          partner?.type !== PartnerTypeEnum.AGENCY
            ? {
                title: 'Phản hồi',
                icon: <SmsEdit />,
                action: () => {
                  navigation.navigate(AppRoutes.FEEDBACK);
                },
              }
            : [],
          // {
          //   title: 'Trung tâm trợ giúp',
          //   icon: <LampCharge />,
          //   action: () => {
          //     // action
          //   },
          // },
          partner?.type !== PartnerTypeEnum.AGENCY
            ? {
                title: 'Khảo sát',
                icon: <BookLineSVG />,
                action: () => navigation.navigate(AppRoutes.SURVEY_LIST_SCREEN),
              }
            : [],
        ].flat(),
      [navigation, partner?.type],
    );

    return (
      <Screen>
        <ScrollView contentContainerStyle={tw`grow`} scrollIndicatorInsets={{ right: 1 }}>
          <View style={tw`mt-4 mx-4`}>
            <View style={tw`flex-row`}>
              <Image style={tw`w-14 h-14 rounded-full`} source={{ uri: partner?.avatar?.fullThumbUrl || '' }} />
              <View style={tw`flex-1 ml-3 justify-center`}>
                <Text style={tw`text-19px text-grayscale-black font-semibold`}>{partner?.fullname}</Text>
              </View>
            </View>

            <View
              style={tw`flex-row items-center w-8/12 bg-primary-lighter self-center rounded-3xl justify-between py-10px mt-4 px-24px`}
            >
              <Badge width={24} height={24} />
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-14px text-grayscale-black`}>Điểm uy tín:</Text>
                <Text style={tw`text-14px text-grayscale-black font-semibold text-19px ml-4px`}>
                  {partner?.star?.toFixed?.(1)}/5
                </Text>
              </View>
              <Question width={13.5} height={13.5} />
            </View>

            <Space size={1} backgroundColor={tw.color('grayscale-border')} style={tw`-mx-4 mt-6 mb-4`} />

            <View style={tw`flex-row`}>
              <TouchableOpacity
                style={tw`flex-1 items-center`}
                onPress={() => navigation.navigate(AppRoutes.REPAIR_REQUEST_LIST_SCREEN)}
              >
                <ServiceAccountSVG width={32} height={32} />
                <Text style={tw`text-14px text-grayscale-black mt-12px`}>Dịch vụ</Text>
              </TouchableOpacity>
              <Space horizontal size={1} backgroundColor={tw.color('grayscale-border')} />
              <TouchableOpacity
                style={tw`flex-1 items-center`}
                onPress={() => {
                  navigation.navigate(AppRoutes.MY_ORDER_LIST_SCREEN, {
                    initialRouteName: AppRoutes.MY_ORDER_WAITING_SCREEN,
                  });
                }}
              >
                <OrderAccountSVG width={32} height={32} />
                <Text style={tw`text-14px text-grayscale-black mt-12px`}>Đơn hàng</Text>
              </TouchableOpacity>
            </View>

            <Space size={1} backgroundColor={tw.color('grayscale-border')} style={tw`-mx-4 mt-4`} />
          </View>

          <View style={tw`mb-28px mx-16px mt-6`}>
            <Text style={tw`text-14px font-semibold mb-16px`}>Tài khoản</Text>
            {accountActions.map((acc) => (
              <RowItem key={acc.title} icon={acc.icon} title={acc.title} onPress={acc.action} />
            ))}
          </View>
          {/* Tổng quát */}
          <View style={tw`mb-28px mx-16px`}>
            <Text style={tw`text-14px font-semibold mb-16px`}>Tổng quát</Text>
            {generalActions.map((acc) => (
              <RowItem key={acc.title} icon={acc.icon} title={acc.title} onPress={acc.action} />
            ))}
            <TouchableOpacity style={tw`flex-row items-center justify-between`}>
              {<LogoPrimarySVG width={24} />}
              <View style={tw`flex-row flex-1 border-b border-grayscale-border ml-16px py-12px`}>
                <Text style={tw`text-14px text-grayscale-black flex-1`}>{'Phiên bản ứng dụng'}</Text>
                <Text>1.0.1</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={tw`pb-36px self-center`} onPress={handleLogout}>
            <Text style={[tw`font-semibold text-17px`, styles.logout]}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>
      </Screen>
    );
  },
);

const styles = StyleSheet.create({
  logout: {
    textDecorationLine: 'underline',
  },
});
