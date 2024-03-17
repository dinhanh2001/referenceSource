import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Screen, tw } from '../../components';
import { useAuth, useFullScreenLoading } from '../../contexts';
import { useLogoutMutation } from '../../graphql/mutations/logout.generated';
import { useMeUserQuery } from '../../graphql/queries/meUser.generated';
import { getAppVersion, getBuildNumber } from '../../helpers';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { BottomTabScreensParams } from '../../navigator-params/bottom-tab-navigator';
import {
  ArrowRight,
  Badge,
  Book,
  CallMeSVG,
  DefaultAvatar,
  Heart,
  Location,
  Question,
  ReceiptText,
  SmsEdit,
  Tractor,
} from '../../svg';
import { useRefreshByUser } from '../../hooks';

type RowItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
};

const RowItem = React.memo(({ title, icon, onPress }: RowItemProps) => {
  return (
    <TouchableOpacity style={tw`flex-row items-center justify-between`} onPress={onPress}>
      {icon}
      <View style={tw`flex-row flex-1 border-b border-grayscale-border ml-16px py-12px`}>
        <Text style={tw`text-14px text-grayscale-black flex-1`}>{title}</Text>
        <ArrowRight />
      </View>
    </TouchableOpacity>
  );
});

type AccountProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabScreensParams, 'account'>,
  NativeStackScreenProps<AppStackNavigatorParamList>
>;

export const Account = React.memo(({ navigation }: AccountProps) => {
  const { logout, deviceId } = useAuth();

  const { data: user, refetch } = useMeUserQuery();
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const [apolloLogout, { loading }] = useLogoutMutation({
    onCompleted: logout,
    onError: logout,
  });

  const onLogout = useCallback(() => {
    apolloLogout({
      variables: {
        deviceId,
      },
    });
  }, [apolloLogout, deviceId]);

  const { showFullscreenLoading } = useFullScreenLoading();

  const { avatar, star, fullname, phone } = user?.meUser || {};

  useEffect(() => {
    showFullscreenLoading(loading);
  }, [loading, showFullscreenLoading]);

  const onEditAccount = useCallback(() => {
    // edit account function
    navigation.navigate('account-editting');
  }, [navigation]);
  const onMyCar = useCallback(() => {
    navigation.navigate('my-vehicles');
  }, [navigation]);
  // const onMyService = useCallback(() => {
  //   navigation.navigate('repair-request');
  // }, [navigation]);
  const onMyReceipt = useCallback(() => {
    navigation.navigate('e-commerce/my-order');
  }, [navigation]);

  const accountActions = useMemo(
    () => [
      // {
      //   title: 'Thông tin thanh toán',
      //   icon: <Card />,
      //   action: () => {
      //     // action
      //   },
      // },
      {
        title: 'Địa chỉ',
        icon: <Location />,
        action: () => {
          navigation.navigate('account-address');
        },
      },
      {
        title: 'Danh sách yêu thích',
        icon: <Heart />,
        action: () => {
          navigation.navigate('favourite-products');
        },
      },
    ],
    [navigation],
  );

  const generalActions = useMemo(
    () => [
      {
        title: 'Phản hồi',
        icon: <SmsEdit />,
        action: () => {
          navigation.navigate('feedback');
        },
      },
      {
        title: 'Khảo sát',
        icon: <Book />,
        action: () => navigation.navigate('list-survey'),
      },
    ],
    [navigation],
  );

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={tw`grow`}
        scrollIndicatorInsets={{ right: 1 }}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      >
        <View style={tw`px-16px pt-16px pb-24px border-b border-grayscale-border`}>
          <View style={tw`flex-row items-center`}>
            {avatar?.fullThumbUrl ? (
              <Image style={tw`w-56px h-56px rounded-full`} source={{ uri: avatar?.fullThumbUrl }} />
            ) : (
              <DefaultAvatar height={56} width={56} />
            )}
            <View style={tw`ml-12px`}>
              <Text style={tw`text-19px font-semibold text-grayscale-black leading-24px`}>
                {fullname || phone || 'Call Me User'}
              </Text>
              <TouchableOpacity onPress={onEditAccount} style={tw`flex-row items-center mt-4px`}>
                <Text style={tw`text-13px text-grayscale-gray mr-8px`}>Chỉnh sửa tài khoản</Text>
                <ArrowRight />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={tw`flex-row items-center w-8/12 bg-primary-lighter self-center rounded-3xl justify-between py-10px mt-21px px-24px`}
          >
            <Badge width={24} height={24} />
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-14px text-grayscale-black`}>Điểm uy tín:</Text>
              <Text style={tw`text-14px text-grayscale-black font-semibold text-19px ml-4px`}>
                {star?.toFixed?.(1)}/5
              </Text>
            </View>
            <Question width={13.5} height={13.5} />
          </View>
        </View>
        <View style={tw`border-b border-grayscale-border`}>
          <View style={tw`flex-row py-16px  justify-between`}>
            <TouchableOpacity onPress={onMyCar} style={tw`flex-1 items-center`}>
              <Tractor width={32} height={32} />
              <Text style={tw`text-14px text-grayscale-black mt-12px`}>Xe của tôi</Text>
            </TouchableOpacity>
            {/* <View style={tw`w-1px bg-grayscale-border`} /> */}
            {/* <TouchableOpacity onPress={onMyService} style={tw`flex-1 items-center`}>
              <SettingSVG width={32} height={32} />
              <Text style={tw`text-14px text-grayscale-black mt-12px`}>Sửa chữa</Text>
            </TouchableOpacity> */}
            <View style={tw`w-1px bg-grayscale-border`} />
            <TouchableOpacity onPress={onMyReceipt} style={tw`flex-1 items-center`}>
              <ReceiptText width={32} height={32} />
              <Text style={tw`text-14px text-grayscale-black mt-12px`}>Đơn hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`mb-28px mx-16px mt-24px`}>
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
          {/* version */}
          <View style={tw`flex-row items-center justify-between`}>
            <CallMeSVG width={24} height={24} />
            <View style={tw`flex-row flex-1 border-b border-grayscale-border ml-16px py-12px`}>
              <Text style={tw`text-14px text-grayscale-black flex-1`}>{'Phiên bản ứng dụng'}</Text>
              <Text> {`v${getAppVersion()}: ${getBuildNumber()}`}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={tw`pb-40px self-center`} onPress={onLogout}>
          <Text style={[tw`font-semibold text-17px`, styles.logout]}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
});

const styles = StyleSheet.create({
  logout: {
    textDecorationLine: 'underline',
  },
});
