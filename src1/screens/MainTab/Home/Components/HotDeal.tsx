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
import {Image, StyleSheet} from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { IRestaurant, ISuggestRestaurant } from 'types';
import { formatDistanceKm, getImage, width } from 'utils';
import {listDealHot} from "screens/MainTab/Home/DataFake";
interface IProps {}
const HotDeal: React.FC<IProps> = () => {
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
          <ViewCus style={styles.tag2}>
            <TextCus color-white bold style={styles.conentTag}>
              -8%
            </TextCus>
          </ViewCus>
        </ViewCus>
        <ViewCus flex-row p-8>
          <ImageCus
            source={{ uri: item?.restaurant?.avatar }}
            size={32}
            style={{ borderRadius: 32 }}
          />
          <ViewCus ml-8 f-1>
            <TextCus caption color={Colors.grey85} mb-2 numberOfLines={1} f-1>
              {item?.restaurant?.name}
            </TextCus>
            <ViewCus flex-row>
              <ImageCus source={Images.star} size={12} />
              <ImageCus source={Images.star} size={12} />
              <ImageCus source={Images.star} size={12} />
              <ImageCus source={Images.star} size={12} />
              <Image
                source={Images.star}
                style={{ tintColor: Colors.greyA6, width: 12, height: 12 }}
              />
            </ViewCus>
          </ViewCus>
        </ViewCus>
        <ViewCus p-8 pt-0>
          <TextCus subhead style={styles.lineH} mb-2 numberOfLines={2}>
            {name}
          </TextCus>
          <ViewCus flex-row>
            <TextCus caption color={Colors.main} mr-8 semiBold>95.000đ</TextCus>
            <TextCus color={Colors.grey85} style={styles.priceDiscount}>95.000đ</TextCus>
          </ViewCus>
          <ViewCus f-1 items-flex-end>
            <TouchCus
              onPress={() => {}}
              br-31
              bg-main
              w-67
              items-center
              flex-row
              justify-center>
              <ImageCus source={Images.cart} size={12} />
              <TextCus color={Colors.white} caption ml-4 textAlign={'center'}>Mua</TextCus>
            </TouchCus>
          </ViewCus>
        </ViewCus>
      </TouchCus>
    );
  }, []);

  return (
    <CarouselHorizontal
      showCountdown={true}
      data={listDealHot}
      title={'Deal hot trong ngày'}
      onPress={() =>
        NavigationService.navigate(Routes.SuggestForYou, {
          title: 'home.title_promotion2',
        })
      }
      renderItem={renderItem}
      horizontal={true}
      // numColumns={2}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={true}
    />
  );
};
const styles = StyleSheet.create({
  imagePromotion: {
    height: 150,
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
    width: 150,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginRight: 16,
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
    right: 5,
    top: 10,
    backgroundColor: Colors.main,
    paddingHorizontal: 6,
    height: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conentTag: {
    color: Colors.white,
    lineHeight: 10,
    fontSize: 8,
  },
  lineH: {
    lineHeight: 16,
    color: Colors.black3A
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingRight: 0,
    // backgroundColor: Colors.white,
  },
  priceDiscount: {
    fontSize: 8,
    textDecorationLine: 'line-through',
  }
});
export default HotDeal;
