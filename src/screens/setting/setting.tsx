import { Button, Text } from '@rneui/themed';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

import { AppHeader, Screen, Switch, tw } from '../../components';
import { useAuth, useFullScreenLoading } from '../../contexts';
import { PartnerMenuEnum, PartnerTypeEnum } from '../../graphql/type.interface';
import { BookSVG, CraneSVG, DiscountCircleSVG, DocumentHomeSVG, HelmetSVG, Receipt2SVG, SupportSVG } from '../../svg';
import { usePartnerUpdateMenuConfigsMutation } from '../../graphql/mutations/partnerUpdateMenuConfigs.generated';
import { MePartnerDocument } from '../../graphql/queries/mePartner.generated';

const Menus = [
  {
    icon: <Receipt2SVG width={20} height={20} />,
    label: 'Đơn hàng',
    value: PartnerMenuEnum.ORDER,
  },
  {
    icon: <SupportSVG width={20} height={20} />,
    label: 'Sửa chữa',
    value: PartnerMenuEnum.REPAIR,
  },
  {
    icon: <CraneSVG width={20} height={20} />,
    label: 'Sản phẩm',
    value: PartnerMenuEnum.PRODUCT,
  },
  {
    icon: <HelmetSVG width={20} height={20} />,
    label: 'Kỹ thuật viên',
    value: PartnerMenuEnum.TECHNICIAN,
    authorization: [PartnerTypeEnum.AGENCY],
  },
  {
    icon: <BookSVG width={20} height={20} />,
    label: 'Khóa học',
    value: PartnerMenuEnum.COURSE,
    authorization: [PartnerTypeEnum.TECHNICIAN, PartnerTypeEnum.FREELANCER_TECHNICIAN],
  },
  {
    icon: <DiscountCircleSVG width={20} height={20} />,
    label: 'Khuyến mãi',
    value: PartnerMenuEnum.DISCOUNT,
  },
  {
    icon: <DocumentHomeSVG width={20} height={20} />,
    label: 'Tài liệu tham khảo',
    value: PartnerMenuEnum.DOCUMENT,
    authorization: [PartnerTypeEnum.TECHNICIAN, PartnerTypeEnum.FREELANCER_TECHNICIAN],
  },
];

export const Setting = memo(() => {
  const navigation = useNavigation();
  const { partner } = useAuth();
  const { showFullscreenLoading } = useFullScreenLoading();
  const [menusChecked, setMenusChecked] = useState<PartnerMenuEnum[]>([]);

  const handleChecked = useCallback(
    (newValue: PartnerMenuEnum) => {
      const isExist = menusChecked.find((v) => v === newValue);
      if (isExist) {
        setMenusChecked(menusChecked.filter((v) => v !== newValue));
        return;
      }
      setMenusChecked([...menusChecked, newValue]);
    },
    [menusChecked],
  );

  const handleReset = useCallback(() => {
    setMenusChecked(partner?.menus ?? []);
  }, [partner?.menus]);

  const [updateMenuAsync, { loading }] = usePartnerUpdateMenuConfigsMutation({
    onError(error) {
      showMessage({
        type: 'danger',
        message: error?.message,
      });
    },
    onCompleted() {
      navigation.goBack();
    },
  });

  const handleSaveMenus = useCallback(() => {
    updateMenuAsync({ variables: { input: { menus: menusChecked } }, refetchQueries: [MePartnerDocument] });
  }, [menusChecked, updateMenuAsync]);

  useEffect(() => {
    showFullscreenLoading(loading);
  }, [loading, showFullscreenLoading]);

  useEffect(() => {
    setMenusChecked(partner?.menus ?? []);
  }, [partner]);

  return (
    <Screen edges={['top', 'bottom']}>
      <AppHeader title="Tùy biến hiển thị" />
      <View style={tw`p-16px flex-1`}>
        <Text style={tw`text-14px font-semibold leading-20px mb-17px`}> Lối tắt </Text>
        {Menus.map((menu, idx) => {
          if (menu?.authorization && partner && !menu?.authorization?.includes?.(partner.type)) return null;
          return (
            <TouchableOpacity key={`menu + ${idx}`} onPress={() => handleChecked(menu.value)}>
              <View style={tw`flex-row justify-between`}>
                {menu.icon}
                <View
                  style={tw`flex-1 flex-row justify-between ml-12px border-b border-solid border-grayscale-border mb-13px pb-12px`}
                >
                  <View style={tw`flex-1 flex-row justify-between `}>
                    <Text style={tw`flex-1 text-14px leading-20px`}> {menu.label} </Text>
                    <Switch value={menusChecked.includes(menu.value)} onChange={() => handleChecked(menu.value)} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={tw`flex-row items-center gap-x-12px px-16px pb-20px`}>
        <Button
          containerStyle={tw`flex-1`}
          buttonStyle={tw`bg-white border border-solid border-grayscale-border`}
          disabledStyle={tw`bg-white border border-solid border-grayscale-border`}
          onPress={handleReset}
        >
          Mặc định
        </Button>
        <Button containerStyle={tw`flex-1`} onPress={handleSaveMenus}>
          Lưu
        </Button>
      </View>
    </Screen>
  );
});
