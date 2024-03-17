/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { InteractionManager, StyleSheet } from 'react-native';

import {
  BottomSheetCommon,
  Buttons,
  HomeLayout,
  ImageCus,
  ScrollViewCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { BaseStyle, Colors } from 'theme';
import { ListItem } from './components';
import { NavigationService, Routes } from 'navigation';
// import { IconName, Icons } from 'assets';
import { useAuth } from 'hooks';
import { IRefBottom } from 'types';
import Icon from 'assets/svg/Icon';
import { getImage, uploadImage } from 'utils';
import { Images } from 'assets';
import ImagePicker, { Options } from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import { useTheme } from 'react-native-paper';
type CaregoryProps = {
  name: string;
  icon: string;
  isHiden: undefined | boolean | string;
  onPress(): void;
  isLine?: boolean | undefined;
  isArrowRight: boolean;
};
const UploadImageConfig: Options = {
  mediaType: 'photo',
};
type Image = {
  name: string;
  type: string;
  uri: string;
};
export default function Account() {
  const { onLogout, user, userInfo, onHanldeKYCUser } = useAuth();
  // console.log(user);
  const refBottom = useRef<IRefBottom>(null);
  const { colors } = useTheme();

  const onConfirmLogout = useCallback(() => {
    refBottom.current?.show();
  }, []);

  const CategoryItems: CaregoryProps[] = [
    {
      name: 'account.user_info',
      icon: Images.PersonalInfor,
      isHiden: user?.accessToken,
      onPress: () => {
        NavigationService.navigate(Routes.KYC);
      },
      isArrowRight: true,
    },
    {
      name: 'Ví của bạn',
      icon: Images.OffersMember,
      isHiden: user?.accessToken,
      onPress: () => {
        NavigationService.navigate(Routes.Wallet);
      },
      isArrowRight: true,
    },
    {
      name: 'Phương Thức Thanh Toán',
      icon: Images.Payment,
      isHiden: user?.accessToken,
      onPress: () => {
        // NavigationService.navigate(Routes.Wallet);
      },
      isArrowRight: true,
    },
    {
      name: 'account.support',
      icon: Images.ContactSupport,
      isHiden: true,
      onPress: () => {
        NavigationService.navigate(Routes.ContactSupport);
      },
      isArrowRight: true,
    },
    {
      name: 'account.term',
      icon: Images.RulesAndCondition,
      isHiden: true,
      onPress: () => {
        NavigationService.navigate(Routes.Term);
      },
      isArrowRight: true,
    },
    {
      name: 'Câu hỏi thường gặp',
      icon: Images.FrequentQuestion,
      isHiden: user?.accessToken,
      onPress: () => {
        // NavigationService.navigate(Routes.Wallet);
      },
      isArrowRight: true,
    },
    {
      name: 'Giới thiệu',
      icon: Images.Introduce,
      isHiden: user?.accessToken,
      onPress: () => {
        // NavigationService.navigate(Routes.Intro);
      },
      isArrowRight: true,
    },
    {
      name: 'account.change_password',
      icon: Images.ChangePassWord,
      isHiden: user?.accessToken,
      onPress: () => {
        NavigationService.navigate(Routes.ChangePassword);
      },
      isArrowRight: true,
    },
    {
      name: user?.accessToken ? 'account.logout' : 'auth.login',
      icon: Images.LogOut,
      isHiden: true,
      onPress: () => {
        user?.accessToken ? onConfirmLogout() : onLogin();
      },
      isArrowRight: true,
    },
  ];
  const onLogin = useCallback(() => {
    NavigationService.reset(Routes.InputPhone);
  }, []);

  const genderBgColor = useMemo(() => {
    const strGender = userInfo?.gender;
    if (strGender === 'MALE') {
      return '#e1ecf3';
    }
    if (strGender === 'FEMALE') {
      return '#f7dfe0';
    }
    if (strGender === 'UNKNOWN') {
      return '#7002FF1A';
    }
    return '#049FE11A';
  }, [userInfo?.gender]);

  const [picture, setPicture] = useState<Image>({
    uri: userInfo?.avatar,
  } as Image);

  const refAvatar = useRef<IRefBottom>(null);

  const openModalAvatar = useCallback(() => {
    refAvatar?.current?.show();
  }, []);

  const onOpenCamera = useCallback(() => {
    refAvatar.current?.close();
    ImagePicker.openCamera({
      ...UploadImageConfig,
    }).then(image => {
      const infoImage = uploadImage(image);
      setPicture(infoImage);
      if (userInfo?.id) {
        const form = {
          avatar: infoImage,
          userId: userInfo?.id,
        };
        onHanldeKYCUser(
          {
            ...form,
          },
          () => {
            Toast.show({
              type: 'success',
              text1: 'Cập nhật thông tin thành công',
            });
          },
        );
      }
    });
  }, [onHanldeKYCUser, userInfo?.id]);

  const onOpenLibary = useCallback(() => {
    refAvatar.current?.close();
    ImagePicker.openPicker(UploadImageConfig).then(image => {
      const infoImage = uploadImage(image);
      setPicture(infoImage);
      if (userInfo?.id) {
        const form = {
          avatar: infoImage,
          userId: userInfo?.id,
        };
        onHanldeKYCUser(
          {
            ...form,
          },
          () => {
            Toast.show({
              type: 'success',
              text1: 'Cập nhật thông tin thành công',
            });
          },
        );
      }
    });
  }, [onHanldeKYCUser, userInfo]);

  const renderAvatar = useCallback(() => {
    switch (user?.accessToken) {
      case undefined:
        return <Icon.AvtarDefault />;
      default: {
        return (
          <TouchCus
            onPress={openModalAvatar}
            style={{
              height: 120,
              width: 120,
              backgroundColor: genderBgColor,
              borderRadius: 60,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageCus
              style={styles.image}
              resizeMode="cover"
              source={{
                uri: picture?.uri?.includes('data/uploads/')
                  ? getImage({ image: picture?.uri ?? '' })
                  : picture?.uri,
              }}
            />
          </TouchCus>
        );
      }
    }
  }, [genderBgColor, openModalAvatar, picture, user?.accessToken]);

  return (
    <HomeLayout
      bgColor={colors.secondary}
      header={{
        title: 'bottom.account',
        notGoBack: true,
        iconColor: Colors.white,
      }}>
      <ScrollViewCus contentContainerStyle={styles.container}>
        <ViewCus
          style={[
            BaseStyle.wrapperMain,
            { justifyContent: 'center', alignItems: 'center' },
          ]}>
          <ViewCus>
            {renderAvatar()}
            <ViewCus style={styles.camera}>
              <Icon.Camera tintColor={colors.secondary} />
            </ViewCus>
          </ViewCus>
        </ViewCus>
        {CategoryItems &&
          CategoryItems?.map((value, index) => {
            return (
              <ListItem
                tintColor={colors.secondaryDark}
                key={index.toString()}
                name={value?.name}
                onPress={value?.onPress}
                icon={value?.icon}
                isHiden={Boolean(value?.isHiden) ?? value?.isHiden}
                isLine={value?.isLine ?? true}
                isImage={true}
                isArrowRight={value?.isArrowRight}
                style={{
                  paddingVertical: 15,
                }}
              />
            );
          })}
      </ScrollViewCus>
      <BottomSheetCommon ref={refBottom} hideBackdrop={false}>
        <ViewCus style={styles.bgWhite} pb-10>
          <ViewCus items-center>
            <Icon.ICON_ERROR />
          </ViewCus>
          <ViewCus style={[styles.pdHorzi50, styles.mgVertzi20]}>
            <TextCus useI18n mb-8 heading1 textAlign="center">
              Xác nhận
            </TextCus>
            <TextCus useI18n textAlign="center" color={Colors.grey85}>
              Bạn có chắc chắn muốn đăng xuất?
            </TextCus>
          </ViewCus>
          <ViewCus style={styles.bottomAction}>
            <Buttons
              style={[styles.btnAction, styles.actionLogout]}
              onPress={() => {
                refBottom.current?.close();
                InteractionManager.runAfterInteractions(() => {
                  onLogout();
                });
              }}
              disabled={false}>
              <TextCus useI18n heading5 color-main>
                Đăng xuất
              </TextCus>
            </Buttons>
            <Buttons
              style={[styles.btnAction]}
              onPress={() => refBottom.current?.close()}
              disabled={false}>
              <TextCus heading5 useI18n color={Colors.white}>
                Đóng
              </TextCus>
            </Buttons>
          </ViewCus>
        </ViewCus>
      </BottomSheetCommon>
      <BottomSheetCommon
        ref={refAvatar}
        pressBehavior={'close'}
        hideBackdrop={false}>
        <ViewCus style={[styles.contaner]}>
          <TextCus textAlign="center" heading4>
            Chọn loại upload hình ảnh
          </TextCus>
          <ViewCus style={styles.content}>
            <TouchCus
              style={styles.btnImagePicker}
              onPress={onOpenCamera}
              activeOpacity={0.8}>
              <TextCus bold>Chụp ảnh</TextCus>
            </TouchCus>
            <TouchCus
              style={styles.btnImagePicker}
              onPress={onOpenLibary}
              activeOpacity={0.8}>
              <TextCus bold>Thư viện</TextCus>
            </TouchCus>
          </ViewCus>
        </ViewCus>
      </BottomSheetCommon>
    </HomeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyF9,
  },
  btnCancel: {
    borderWidth: 1,
    borderColor: Colors.main,
    backgroundColor: Colors.transparent,
  },
  image: {
    height: 96,
    width: 96,
    borderRadius: 48,
    alignSelf: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: Colors.white,
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
    borderRadius: 6,
  },
  bottomAction: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  actionLogout: {
    marginRight: 10,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.main,
  },
  camera: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.white,
  },
  contaner: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    paddingHorizontal: 16,
  },
  btnImagePicker: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
});
