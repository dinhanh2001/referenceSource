import { Images } from 'assets';
import {
  CarouselHorizontal,
  ImageCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { getImage, width } from 'utils';
import Promotions from 'screens/MainTab/Home/Components/Promotions';
interface IProps {
  promotions: [];
  title: string;
  isShowRatting?: boolean;
}
const AttractiveOffers: React.FC<IProps> = ({
  promotions,
  title,
  isShowRatting = true,
}) => {
  const onPressItem = useCallback(item => {
    NavigationService.navigate(Routes.RestaurantDetail, {
      restaurantId: item.id,
      distance: item?.distance,
    });
  }, []);
  // console.log('promotions', promotions);
  const renderItemRatting = useCallback(
    ({ item }) => {
      return (
        <TouchCus onPress={() => onPressItem(item)} style={[styles.mr5]}>
          <ViewCus style={styles.containerRatting}>
            <ImageCus
              source={{ uri: getImage({ image: `${item.avatar}` }) }}
              style={styles.imagePromotion}
            />
            <ViewCus f-1 px-12>
              <TextCus heading5 useI18n numberOfLines={1}>
                {item?.name}
              </TextCus>
              <ViewCus style={{ width: '95%' }}>
                <TextCus
                  useI18n
                  subhead
                  numberOfLines={1}
                  color={Colors.grey85}>
                  {item?.address}
                </TextCus>
              </ViewCus>
              {isShowRatting && (
                <ViewCus flex-row items-center mt-8>
                  <ViewCus flex-row>
                    <ViewCus
                      flex-row
                      items-center
                      justify-center
                      br-6
                      mr-8
                      pb-5>
                      <Image source={Images.location3} />
                      <TextCus ml-4 subhead color={Colors.grey85}>
                        {Number(item?.distance || 0).toFixed(0)}km
                      </TextCus>
                    </ViewCus>
                    <ViewCus flex-row items-center justify-center br-6 pb-5>
                      <Image source={Images.clock} />
                      <TextCus ml-4 subhead color={Colors.grey85}>
                        {/*{item?.open_time?.time}*/}
                        15p
                      </TextCus>
                    </ViewCus>
                    <ViewCus flex-row items-center justify-center pb-5 ml-8>
                      <Image source={Images.star2} />
                      <TextCus ml-4 subhead color={Colors.grey85}>
                        {item?.average_rating}
                      </TextCus>
                    </ViewCus>
                  </ViewCus>
                </ViewCus>
              )}
            </ViewCus>
          </ViewCus>
        </TouchCus>
      );
    },
    [promotions],
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <TouchCus onPress={() => onPressItem(item)} ml-12>
          <ViewCus style={styles.container2}>
            <ImageCus
              source={{ uri: getImage({ image: `${item.avatar}` }) }}
              style={styles.imagePromotion2}
            />
            <TextCus
              mainSize
              color={'#241A25'}
              mt-4
              textAlign={'center'}
              flex-1
              useI18n
              numberOfLines={1}>
              {item?.name}
            </TextCus>
          </ViewCus>
        </TouchCus>
      );
    },
    [promotions],
  );
  return (
    <ViewCus>
      <CarouselHorizontal
        data={promotions}
        title={title}
        onPress={() => NavigationService.navigate(Routes.Categories)}
        renderItem={isShowRatting ? renderItemRatting : renderItem}
        contentContainerStyle={{ paddingRight: 16, marginBottom: 16 }}
      />
      <Promotions />
    </ViewCus>
  );
};

const styles = StyleSheet.create({
  mr5: {
    marginHorizontal: 10,
    borderRadius: 16,
  },
  imagePromotion: {
    height: 80,
    width: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.shadow15,
  },
  imagePromotion2: {
    height: 120,
    width: 120,
    borderRadius: 16,
    shadowColor: '#8a8989',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10.24,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  container: {
    width: width / 1.7,
    shadowColor: '#8a8989',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10.24,
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: 16,
  },
  containerRatting: {
    padding: 10,
    width: width / 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#8a8989',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10.24,
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: 8,
  },
  container2: {
    width: 120,
    // height: 120,
    // shadowColor: '#8a8989',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 10.24,
    // backgroundColor: Colors.white,
    // elevation: 5,
    // borderRadius: 16,
  },
});
export default AttractiveOffers;
