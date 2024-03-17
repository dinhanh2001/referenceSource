import { Images } from 'assets';
import {
  AppSkeleton,
  Divider,
  ImageCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { BaseStyle, Colors } from 'theme';
import { IRestaurantDetail } from 'types';
import { formatDistanceKm, formatMoney, getImage, width } from 'utils';

interface IProps extends IRestaurantDetail {
  onPress: () => void;
  onAddMenu: () => void;
  isDetail?: boolean;
  price?: number;
  order_count?: number;
  basePrice?: number;
  loading: boolean;
  avatar?: string;
}

const CategoryHorizontalItem: React.FC<IProps> = ({
  onPress,
  onAddMenu,
  isDetail,
  name,
  distance,
  avatar,
  total_reviews,
  average_rating,
  price,
  order_count,
  basePrice,
  loading,
}) => {
  const { colors } = useTheme();

  return (
    <Skeleton.Group show={loading}>
      {/*<TouchCus p-16 onPress={onPress}>*/}
      {/*  <ViewCus style={styles.wrapperImage}>*/}
      {/*    <AppSkeleton height={88} width={88}>*/}
      {/*      <ImageCus*/}
      {/*        source={*/}
      {/*          avatar*/}
      {/*            ? { uri: getImage({ image: avatar }) }*/}
      {/*            : Images.defaultStore*/}
      {/*        }*/}
      {/*        style={styles.image}*/}
      {/*      />*/}
      {/*    </AppSkeleton>*/}
      {/*    <ViewCus style={styles.tag}>*/}
      {/*      <IconApp name={IconName.Tag} size={50} color={Colors.yellowF8} />*/}
      {/*      <TextCus caption color-white bold style={styles.conent}>*/}
      {/*        PROMO*/}
      {/*      </TextCus>*/}
      {/*    </ViewCus>*/}
      {/*  </ViewCus>*/}
      {/*  <ViewCus f-1 ml-14 style={[isDetail && styles.spacingBetween]}>*/}
      {/*    <AppSkeleton height={20}>*/}
      {/*      <TextCus bold heading5 numberOfLines={1}>*/}
      {/*        {name}*/}
      {/*      </TextCus>*/}
      {/*    </AppSkeleton>*/}
      {/*    <MotiView*/}
      {/*      animate={{ opacity: loading ? 1 : 0 }}*/}
      {/*      style={styles.heighter}*/}
      {/*    />*/}
      {/*    {isDetail ? (*/}
      {/*      <>*/}
      {/*        <AppSkeleton height={20}>*/}
      {/*          <TextCus>*/}
      {/*            <TextCus color-grey82>Đã được đặt</TextCus>*/}
      {/*            <TextCus bold> {`${order_count}`} lần</TextCus>*/}
      {/*          </TextCus>*/}
      {/*        </AppSkeleton>*/}
      {/*        <ViewCus flex-row>*/}
      {/*          <AppSkeleton width={75} height={20}>*/}
      {/*            <TextCus mr-5 bold main>*/}
      {/*              {formatMoney(price!)}*/}
      {/*            </TextCus>*/}
      {/*          </AppSkeleton>*/}
      {/*          <AppSkeleton width={75} height={20}>*/}
      {/*            <TextCus color-grey84 style={[BaseStyle.textLineThrough]}>*/}
      {/*              {formatMoney(basePrice!)}*/}
      {/*            </TextCus>*/}
      {/*          </AppSkeleton>*/}
      {/*        </ViewCus>*/}
      {/*      </>*/}
      {/*    ) : (*/}
      {/*      <AppSkeleton>*/}
      {/*        <ViewCus flex-row items-center>*/}
      {/*          <IconApp*/}
      {/*            name={IconName.Start}*/}
      {/*            size={16}*/}
      {/*            color={Colors.yellowF8}*/}
      {/*          />*/}
      {/*          <TextCus color-grey82 pl-5>*/}
      {/*            {average_rating} ({`${total_reviews}`})*/}
      {/*          </TextCus>*/}
      {/*          <TextCus px-5 color-grey82>*/}
      {/*            |*/}
      {/*          </TextCus>*/}
      {/*          <TextCus color-grey82>*/}
      {/*            Trong bán kính {`${formatDistanceKm(distance)} km`} gần bạn*/}
      {/*          </TextCus>*/}
      {/*        </ViewCus>*/}
      {/*      </AppSkeleton>*/}
      {/*    )}*/}
      {/*  </ViewCus>*/}
      {/*</TouchCus>*/}

      <TouchCus onPress={onPress} style={styles.itemImage}>
        <ViewCus style={styles.wrapperPromotion}>
          <ImageCus
            source={{
              uri: getImage({ image: avatar }),
            }}
            style={styles.imagePromotion}
            resizeMode="cover"
          />
          {!loading && (
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
          )}
          {!loading && (
            <TouchCus onPress={onAddMenu} style={styles.btnPlus}>
              <ImageCus source={Images.PlusIcon} size={24} />
            </TouchCus>
          )}
        </ViewCus>
        <ViewCus p-8>
          <TextCus medium mainSize style={styles.lineH} numberOfLines={2}>
            {name}
          </TextCus>
          <ViewCus flex-row>
            <AppSkeleton height={20}>
              <TextCus mr-5 bold color={Colors.black3A}>
                {formatMoney(price!)}
              </TextCus>
            </AppSkeleton>
            <AppSkeleton width={75} height={20}>
              <TextCus color-grey84 style={[BaseStyle.textLineThrough]}>
                {formatMoney(basePrice!)}
              </TextCus>
            </AppSkeleton>
          </ViewCus>
          <ViewCus flex-row items-center justify-space-between>
            <ViewCus flex-row items-center>
              <ImageCus source={Images.star} size={16} />
              {/*<IconApp name={IconName.Start} size={16} color={Colors.yellowF8} />*/}
              <TextCus color-grey82 pl-5 subhead>
                {average_rating || 4.5} ({`${total_reviews || 121}`})
                {distance ? ` | ${formatDistanceKm(distance)} km` : ''}
              </TextCus>
            </ViewCus>
            {/*<ViewCus flex-row items-center>*/}
            {/*  <ImageCus source={Images.location2} size={16} />*/}
            {/*  <TextCus color-grey82 pl-5 caption>*/}
            {/*    {formatDistanceKm(distance)} km*/}
            {/*  </TextCus>*/}
            {/*</ViewCus>*/}
          </ViewCus>
        </ViewCus>
      </TouchCus>
      <Divider medium />
    </Skeleton.Group>
  );
};
const styles = StyleSheet.create({
  heighter: {
    height: 8,
  },
  image: {
    height: 84,
    width: 84,
    borderRadius: 4,
  },
  wrapperImage: {
    position: 'relative',
  },
  tag: {
    position: 'absolute',
    left: -3,
    top: -6,
  },
  conent: {
    position: 'absolute',
    left: 8,
    top: 11,
  },
  spacingBetween: {
    justifyContent: 'space-between',
  },
  itemImage: {
    shadowColor: Colors.black3A,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    position: 'relative',
    width: width / 2 - 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 8,
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
    left: 0,
    top: 0,
    backgroundColor: Colors.main,
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 16,
  },
  btnPlus: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: Colors.main,
    height: 32,
    width: 32,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black3A,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  conentTag: {
    color: Colors.white,
  },
  lineH: {
    lineHeight: 24,
  },
  imagePromotion: {
    height: 165,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  wrapperPromotion: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
});
export default CategoryHorizontalItem;
