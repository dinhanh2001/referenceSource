import { Images } from 'assets';
import { TextCus, TouchCus, ViewCus } from 'components';
import { NavigationService, Routes } from 'navigation';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Colors } from 'theme';
import type { ICategory } from 'types';
import { getImage } from 'utils';

const TopCategories = ({ categories = [] }: { categories: ICategory[] }) => {
  const { colors } = useTheme();

  const renderItem = (item: ICategory, index: number) => {
    const defaultIcon = Images?.[`${item?.defaultIcon}`];
    const onPressItem = () => {
      NavigationService.navigate(Routes.Categories);
    };

    return (
      <TouchCus
        key={index.toString()}
        items-center
        onPress={item?.onPress ?? onPressItem}>
        <ViewCus f-1 />
        <ViewCus style={[styles.itemHotCategory]}>
          <Image
            resizeMode="contain"
            source={
              item.icon ? { uri: getImage({ image: item.icon }) } : defaultIcon
            }
            style={[styles.icon, {}]}
          />
        </ViewCus>
        <TextCus color-black27 mt-4 bold>
          {item?.name || ''}
        </TextCus>
      </TouchCus>
    );
  };

  return (
    <ViewCus mb-12 items-center px-12 bg-whiteF6>
      <ViewCus
        py-6
        pt-6
        px-14
        flex-row
        items-center
        justify-space-between
        bg-whiteF6
        br-12
        style={[
          styles.topMenu,
          {
            borderColor: colors.primary,
          },
        ]}>
        {categories?.map(renderItem)}
      </ViewCus>
    </ViewCus>
  );
};

export default TopCategories;

const styles = StyleSheet.create({
  itemHotCategory: {
    backgroundColor: '#fdd4d9',
    width: 78,
    height: 78,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 39,
  },
  topMenu: {
    borderWidth: 0.2,
    borderColor: Colors.main,
    width: '100%',
    shadowColor: Colors.blackShadow02,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 72,
    height: 72,
    backgroundColor: 'transparent',
  },
});
