import { IconName, Images } from 'assets';
import {
  TouchCus,
  ImageCus,
  CarouselHorizontal,
  IconApp,
  TextCus,
  ViewCus,
} from 'components';
import { useCart } from 'context/CartContext';
import { useHome, useLocation } from 'hooks';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { BaseStyle, Colors } from 'theme';
import { IRestaurant, ISuggestRestaurant } from 'types';
import { formatDistanceKm, getImage, width } from 'utils';
interface IProps {}
const SuggestionForYou: React.FC<IProps> = () => {
  const { colors } = useTheme();
  const { locationUser } = useLocation();
  const { listSuggests, reloadSuggestHome } = useHome();
  const { setSelectedRestaurant } = useCart();
  const onPressItem = useCallback((item: IRestaurant) => {
    setSelectedRestaurant(item.id);
    NavigationService.navigate(Routes.RestaurantDetail, {
      restaurantId: item.id,
      distance: item?.distance,
    });
  }, []);
  const renderItem = useCallback(({ item, index }) => {
    const {
      id,
      avatar,
      average_rating,
      total_reviews,
      name,
      distance,
    }: ISuggestRestaurant = item;
    return (
      <TouchCus
        onPress={() => onPressItem(item)}
        key={`${id}_${index}`}
        style={styles.itemImage}>
        <ViewCus>
          <ImageCus
            source={{
              uri: getImage({ image: avatar }),
            }}
            style={styles.imagePromotion}
            resizeMode="cover"
          />
          <ViewCus
            style={[
              styles.tag2,
              {
                backgroundColor: colors.primary,
              },
            ]}>
            <TextCus subhead color-white bold style={styles.conentTag}>
              PROMO
            </TextCus>
          </ViewCus>
        </ViewCus>

        {/*<ViewCus style={styles.tag}>*/}
        {/*  <IconApp name={IconName.Tag} size={60} color={Colors.main} />*/}
        {/*  <TextCus subhead color-white bold style={styles.conent}>*/}
        {/*    PROMO*/}
        {/*  </TextCus>*/}
        {/*</ViewCus>*/}
        <ViewCus p-12 pt-20>
          <TextCus medium mainSize style={styles.lineH} mb-4 numberOfLines={2}>
            {name}
          </TextCus>
          <ViewCus flex-row items-center justify-space-between>
            <ViewCus flex-row items-center>
              <ImageCus source={Images.star} size={16} />
              {/*<IconApp name={IconName.Start} size={16} color={Colors.yellowF8} />*/}
              <TextCus color-grey82 pl-5 caption>
                {average_rating} ({total_reviews})
              </TextCus>
            </ViewCus>
            <ViewCus flex-row items-center>
              <ImageCus source={Images.location2} size={16} />
              <TextCus color-grey82 pl-5 caption>
                {formatDistanceKm(distance)} km
              </TextCus>
            </ViewCus>
          </ViewCus>
        </ViewCus>
      </TouchCus>
    );
  }, []);

  useEffect(() => {
    reloadSuggestHome();
  }, [locationUser]);

  return (
    <CarouselHorizontal
      data={listSuggests}
      title={'home.title_promotion2'}
      onPress={() =>
        NavigationService.navigate(Routes.SuggestForYou, {
          title: 'home.title_promotion2',
        })
      }
      renderItem={renderItem}
      horizontal={false}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={false}
    />
  );
};
const styles = StyleSheet.create({
  imagePromotion: {
    height: 125,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  itemImage: {
    shadowColor: '#F0F0F5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    width: width / 2 - 22,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginRight: 16,
    marginBottom: 16,
  },
  tag: {
    position: 'absolute',
    left: -2,
    top: -6,
  },
  conent: {
    position: 'absolute',
    left: 8,
    top: 15,
  },
  tag2: {
    position: 'absolute',
    left: 18,
    bottom: -10,
    backgroundColor: Colors.main,
    paddingHorizontal: 6,
    height: 20,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conentTag: {
    color: Colors.white,
  },
  lineH: {
    lineHeight: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    // backgroundColor: Colors.white,
  },
});
export default SuggestionForYou;
