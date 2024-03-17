import { TextCus, TouchCus, ViewCus } from 'components';
import React, { useCallback } from 'react';
import { FlatList, Image } from 'react-native';
import styles from './styles';
import { NavigationService, Routes } from 'navigation';
import { ICategory } from 'types';
import { Images } from 'assets';
import { getImage } from 'utils';
import { Colors } from 'theme';
interface IProps {
  categories?: ICategory[];
  hiddenTitle?: boolean;
  senondary?: boolean;
  title?: string;
}

const ListCategories: React.FC<IProps> = ({
  categories,
  hiddenTitle = false,
  senondary = false,
  title,
}) => {
  const onPressCategoryItem = useCallback(() => {
    NavigationService.navigate(Routes.Categories);
  }, []);
  const renderItem = useCallback(
    ({ item, index }: { item: ICategory; index: number }) => {
      if (!item) return <ViewCus />;
      const { name } = item;
      const defaultIcon = Images?.[`${item?.defaultIcon}`];

      return (
        <TouchCus
          key={index}
          style={styles.flex025}
          items-center
          mb-16
          t-10
          onPress={item?.onPress ?? onPressCategoryItem}>
          <ViewCus items-center justify-center>
            {senondary ? (
              <Image
                source={
                  item.icon
                    ? { uri: getImage({ image: item.icon }) }
                    : defaultIcon
                }
                style={[
                  {
                    width: 55,
                    height: 55,
                    borderRadius: 55,
                  },
                ]}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={
                  item.icon
                    ? { uri: getImage({ image: item.icon }) }
                    : defaultIcon
                }
                style={[
                  {
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    backgroundColor: Colors.greyE8,
                  },
                ]}
                resizeMode="contain"
              />
            )}
            <ViewCus h-6 />
            <TextCus regular mainSize color-black27 textAlign="center">
              {name}
            </TextCus>
          </ViewCus>
        </TouchCus>
      );
    },
    [onPressCategoryItem, senondary],
  );
  const keyExtractor = useCallback((item, index) => `${index}`, []);

  const onPressShowAll = () => {
    NavigationService.navigate(Routes.AllCategories, { categories });
  };

  return (
    <ViewCus>
      {!hiddenTitle && (
        <ViewCus flex-row items-center justify-space-between px-16 mb-4>
          <TextCus bold heading4 color={Colors.black}>
            {title}
          </TextCus>
          <TouchCus
            onPress={onPressShowAll}
            pl-10
            hitSlop={{
              top: 5,
              bottom: 5,
            }}>
            <TextCus regular subhead color={Colors.hsba}>
              Xem tất cả
            </TextCus>
          </TouchCus>
        </ViewCus>
      )}
      <FlatList
        data={categories}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        numColumns={4}
      />
    </ViewCus>
  );
};
export default ListCategories;
