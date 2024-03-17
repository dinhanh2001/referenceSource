import { Images } from 'assets';
import {TouchCus, ImageCus, CarouselHorizontal, ViewCus, TextCus} from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { width } from 'utils';
interface IProps {}
const Promotions: React.FC<IProps> = () => {
  const onPressItem = useCallback(() => {
    NavigationService.navigate(Routes.Categories);
  }, []);
  const renderItem = useCallback(({ i, index }) => {
    return (
      <TouchCus
        onPress={() => onPressItem()}
        key={`bg_promo_${index}_${i}`}
        style={styles.itemImage}>
        <ViewCus>
          <ImageCus
            // source={Images?.[`bgPromo${index + 1}`]}
            source={{
              uri: 'https://res.cloudinary.com/thomasedis/image/upload/v1696154077/ujdth4au3zphg8qit5rt.png',
            }}
            style={styles.imagePromotion}
            resizeMode="cover"
          />
          <ImageCus source={Images.favHome} size={70} style={styles.favIcon} />
          <ViewCus br-12 flex-row style={styles.ratting}>
            <TextCus subhead bold mr-2>
              4.5
            </TextCus>
            <ImageCus source={Images.star} size={10} />
            <TextCus caption color={'#9796A1'} ml-2>
              (25+)
            </TextCus>
          </ViewCus>
        </ViewCus>
        <ViewCus mt-20 mb-12 px-12>
          <TextCus heading4 bold>
            Chicken Hawaiian
          </TextCus>
          <TextCus mainSize color={'#5B5B5E'}>
            Chicken, Cheese and pineapple
          </TextCus>
        </ViewCus>
      </TouchCus>
    );
  }, []);

  return (
    <CarouselHorizontal
      data={[1, 2]}
      // title={'home.title_promotion'}
      onPress={() =>
        NavigationService.navigate(Routes.SuggestForYou, {
          title: 'home.title_promotion',
        })
      }
      renderItem={renderItem}
      horizontal={true}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={true}
    />
  );
};
const styles = StyleSheet.create({
  imagePromotion: {
    height: 155,
    borderRadius: 16,
    width: '100%',
  },
  itemImage: {
    ...BaseStyle.boxShadow,
    position: 'relative',
    width: width / 1.2,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
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
  lineH: {
    lineHeight: 16,
  },
  contentContainer: {
    paddingLeft: 10,
    overflow: 'visible',
    marginBottom: 14,
  },
  favIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  ratting: {
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 8,
    bottom: -12.5,
    height: 25,
    left: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
});
export default Promotions;
