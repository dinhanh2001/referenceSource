import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Badge, Button, Image } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Linking, RefreshControl, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';

import { client } from '../../../apollo/apollo';
import {
  ActivityIndicator,
  ECommerceCartCountInput,
  ECommerceDepartmentItem,
  ECommerceReviewSummary,
  ECommerceStatusProduct,
  tw,
} from '../../../components';
import { Space } from '../../../components/spacer';
import { useAddCartItemsMutation } from '../../../graphql/mutations/addCartItems.generated';
import { MyCartDocument, useMyCartQuery } from '../../../graphql/queries/myCart.generated';
import { useProductExistInCartQuery } from '../../../graphql/queries/productExistInCart.generated';
import { useUserProductQuery } from '../../../graphql/queries/userProduct.generated';
import { Media, PartnerEntity, ProductTypeEnum, ReviewSummary } from '../../../graphql/type.interface';
import { showFlashMessageError } from '../../../helpers';
import { useRefreshByUser } from '../../../hooks';
import { AddCartIcon, ArrowLeftCustom, ArrowRight, CartCustomIcon, Heart, HeartFill, ShopSVG } from '../../../svg';
import { thousandSeparator } from '../../../utils';
import { ECommerceStoreTabParamList } from '../store/type';
import { useUserAddFavoriteProductMutation } from '../../../graphql/mutations/userAddFavoriteProduct.generated';
import { useUserRemoveFavoriteProductMutation } from '../../../graphql/mutations/userRemoveFavoriteProduct.generated';

import { ECommerceProductNavigationProp, ECommerceProductRouteProp } from './type';

export const ECommerceProductDetail = () => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const {
    params: { productId },
  } = useRoute<ECommerceProductRouteProp>();
  const navigation = useNavigation<ECommerceProductNavigationProp>();

  const { data, loading, refetch } = useUserProductQuery({
    variables: {
      id: productId,
    },
  });
  const {
    data: cartExist,
    loading: loadingCartExist,
    refetch: refetchCartExist,
  } = useProductExistInCartQuery({
    variables: {
      productId,
    },
  });
  const { data: myCart } = useMyCartQuery();

  const [addFavorite] = useUserAddFavoriteProductMutation({
    onError: showFlashMessageError,
    onCompleted: () => {
      refetch();
      showMessage({
        message: 'Đã thêm vào danh sách yêu thích',
        type: 'success',
      });
    },
  });
  const [removeFavorite] = useUserRemoveFavoriteProductMutation({
    onError: showFlashMessageError,
    onCompleted: () => {
      refetch();
      showMessage({
        message: 'Đã xóa khỏi danh sách yêu thích',
        type: 'success',
      });
    },
  });

  const [addCart, { loading: loadingCart }] = useAddCartItemsMutation({
    onError: showFlashMessageError,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(async () => {
    await refetchCartExist();
    await refetch();
  });

  useFocusEffect(
    useCallback(() => {
      refetchCartExist();
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const [count, setCount] = useState(1);

  const totalCart = useMemo(() => {
    const total = myCart?.myCart?.items?.reduce?.((a) => a + 1, 0) || 0;
    if (total > 99) {
      return '99+';
    }
    return total;
  }, [myCart?.myCart?.items]);

  useEffect(() => {
    if (!loadingCartExist && cartExist?.productExistInCart?.exist) {
      setCount(cartExist?.productExistInCart?.cartItem?.quantity || 1);
    }
  }, [cartExist?.productExistInCart?.exist, cartExist?.productExistInCart?.cartItem?.quantity, loadingCartExist]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onDetailSpecs = useCallback(() => {
    navigation.push('e-commerce/product-detail-specs', { productId });
  }, [navigation, productId]);

  const onMinus = useCallback(() => {
    if (count > 0) {
      setCount(count - 1);
    }
  }, [count]);

  const onPlus = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const onAddCart = useCallback(() => {
    addCart({
      variables: {
        input: {
          cartItems: [{ productId, quantity: count }],
        },
      },
      onCompleted: () => {
        refetchCartExist();
        client.refetchQueries({
          include: [MyCartDocument],
        });
      },
    });
  }, [addCart, count, productId, refetchCartExist]);

  const onContact = useCallback(() => {
    try {
      const url = `tel:${data?.userProduct?.partner?.phone}`;
      Linking.openURL(url);
    } catch (error) {
      console.log('error', error);
    }
  }, [data?.userProduct?.partner?.phone]);

  const renderAddCart = useMemo(() => {
    const isAdded = cartExist?.productExistInCart?.exist;

    return (
      <TouchableOpacity
        style={tw`flex-row border border-${
          isAdded ? 'primary-dark' : 'grayscale-disabled'
        } justify-center items-center py-11px rounded-1 mt-5 gap-2`}
        onPress={onAddCart}
      >
        {loadingCart ? (
          <ActivityIndicator size={18} />
        ) : (
          <>
            {isAdded ? <CartCustomIcon fill={tw.color('primary-dark')} /> : <AddCartIcon />}
            <Text style={tw`font-semibold text-13px text-${isAdded ? 'primary-dark' : 'grayscale-black'}`}>
              {isAdded ? 'Đã có trong giỏ hàng' : 'Thêm vào giỏ hàng'}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  }, [cartExist?.productExistInCart?.exist, loadingCart, onAddCart]);

  const onBuy = useCallback(() => {
    if (data?.userProduct?.isFixedCost) {
      navigation.navigate('e-commerce/product-order', { productId, quatity: count });
    } else {
      navigation.navigate('e-commerce/price-request-form-quotation', { productId });
    }
  }, [count, data?.userProduct?.isFixedCost, navigation, productId]);

  const onStoreDetail = useCallback(
    (storeId: string, initialRouteName?: keyof ECommerceStoreTabParamList) => {
      navigation.push('e-commerce/store-detail', { storeId, initialRouteName });
    },
    [navigation],
  );

  const onProductReview = useCallback(() => {
    navigation.navigate('e-commerce/product-review', { productId });
  }, [navigation, productId]);

  const onFavorite = useCallback(() => {
    if (data?.userProduct?.isFavorite) {
      removeFavorite({
        variables: {
          productId,
        },
      });
    } else {
      addFavorite({
        variables: {
          productId,
        },
      });
    }
  }, [addFavorite, data?.userProduct?.isFavorite, productId, removeFavorite]);

  const renderContent = useMemo(() => {
    const {
      avatar,
      descriptionImages,
      name,
      isFixedCost,
      unitPrice,
      isNew,
      model,
      type: _type,
      productType,
      serialNumber,
      origin,
      partNumber,
      partner,
      partnerId,
      reviewSummary,
      isFavorite,
      numberOrder,
    } = data?.userProduct || {};
    const isVehicle = _type === ProductTypeEnum.VEHICLE;
    const vehicleType = isVehicle ? productType?.name : serialNumber;
    const modelName = isVehicle ? model?.name : partNumber;
    const serial = isVehicle ? serialNumber : origin?.name;

    if (loading && !data?.userProduct) {
      return <ActivityIndicator />;
    }

    return (
      <>
        <ScrollView
          scrollIndicatorInsets={{ right: 1 }}
          refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
        >
          <Image
            style={tw`w-${width}px h-${width}px`}
            source={{
              uri: avatar?.fullOriginalUrl as string,
            }}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-2 px-4 `}>
            {descriptionImages?.map?.((image: Media, activeIndex: number) => (
              <TouchableOpacity
                key={image?.id}
                style={tw`pt-3`}
                onPress={() => {
                  navigation.navigate('media-preview', {
                    data: descriptionImages,
                    activeIndex,
                  });
                }}
              >
                <Image source={{ uri: image?.fullOriginalUrl as string }} style={tw`w-56px h-56px rounded-2px`} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={tw`m-4`}>
            <ECommerceStatusProduct isNew={isNew} containerStyle={tw`ml-0 self-start`} />
            <View style={tw`flex-row justify-between`}>
              <View style={tw`mr-4 flex-1`}>
                <Text style={tw`text-17px font-semibold`}>{name}</Text>
              </View>
              <TouchableOpacity onPress={onFavorite}>
                {isFavorite ? <HeartFill width={24} height={24} /> : <Heart width={24} height={24} />}
              </TouchableOpacity>
            </View>

            {isFixedCost && (
              <View style={tw`flex-row items-center mt-3`}>
                <Text style={tw`text-13px text-grayscale-gray`}>{reviewSummary?.total || 0} đánh giá</Text>
                <View style={tw`h-3px w-3px bg-grayscale-disabled rounded-full mx-2`} />
                <Text style={tw`text-13px text-grayscale-gray`}>{numberOrder || 0} đơn hàng</Text>
              </View>
            )}

            <View style={tw`flex-row mt-5 items-center justify-between`}>
              <Text style={tw` font-semibold text-17px`}>
                {isFixedCost ? `${thousandSeparator(unitPrice as number)} đ` : 'Thương lượng'}
              </Text>
              {isFixedCost && <ECommerceCartCountInput value={count} onMinus={onMinus} onPlus={onPlus} />}
            </View>

            {isFixedCost && renderAddCart}

            {isFixedCost && (
              <View>
                <Space size={1} style={tw`mt-5`} backgroundColor={'#EEE'} />
                <TouchableOpacity
                  style={tw`flex-row justify-between items-center mt-5`}
                  onPress={() => onStoreDetail(partnerId as string, 'e-commerce/store/review')}
                >
                  <Text style={tw`text-17px font-semibold`}>Đánh giá gian hàng</Text>
                  <ArrowRight width={16} height={16} />
                </TouchableOpacity>

                <ECommerceReviewSummary
                  reviewSummary={partner?.storeReviewSummary as ReviewSummary}
                  containerStyle={tw`m-0 mt-3`}
                />

                <Space size={1} style={tw`mt-5`} backgroundColor={'#EEE'} />
                <TouchableOpacity style={tw`flex-row justify-between items-center mt-5`} onPress={onProductReview}>
                  <Text style={tw`text-17px font-semibold`}>Đánh giá sản phẩm</Text>
                  <ArrowRight width={16} height={16} />
                </TouchableOpacity>

                <ECommerceReviewSummary reviewSummary={reviewSummary as ReviewSummary} containerStyle={tw`m-0 mt-3`} />
                <Space size={1} style={tw`mt-5`} backgroundColor={'#EEE'} />
              </View>
            )}

            <TouchableOpacity style={tw`flex-row items-center justify-between mt-5`} onPress={onDetailSpecs}>
              <Text style={tw`text-17px font-semibold`}>Thông tin sản phẩm</Text>
              <ArrowRight width={16} height={16} />
            </TouchableOpacity>
            <Text style={tw`text-13px text-grayscale-gray mt-3`}>
              {isVehicle ? 'Chủng loại máy' : 'Ký hiệu/Model'}:{' '}
              <Text style={tw`text-grayscale-black`}>{vehicleType}</Text>
            </Text>
            <Text style={tw`text-13px text-grayscale-gray mt-2`}>
              {isVehicle ? 'Model' : 'Serial/Part-number'}: <Text style={tw`text-grayscale-black`}>{modelName}</Text>
            </Text>
            <Text style={tw`text-13px text-grayscale-gray mt-2`}>
              {isVehicle ? 'Số serial' : 'Xuất xứ'}: <Text style={tw`text-grayscale-black`}>{serial}</Text>
            </Text>
            <Space size={1} style={tw`mt-5`} backgroundColor={'#EEE'} />

            <TouchableOpacity
              style={tw`flex-row items-center justify-between mt-5`}
              onPress={() => onStoreDetail(partnerId as string)}
            >
              <Text style={tw`text-17px font-semibold`}>Giới thiệu gian hàng</Text>
              <ArrowRight width={16} height={16} />
            </TouchableOpacity>
            <ECommerceDepartmentItem
              containerStyle={tw`mt-3`}
              item={partner as PartnerEntity}
              onPress={() => onStoreDetail(partnerId as string)}
            />
          </View>
        </ScrollView>

        <View style={tw`flex-row py-2 px-4 gap-3 items-center`}>
          <TouchableOpacity style={tw`items-center`} onPress={() => onStoreDetail(partnerId as string)}>
            <ShopSVG />
            <Text style={tw`mt-1 text-11px`}>Gian hàng</Text>
          </TouchableOpacity>
          <Button
            title={'Liên hệ'}
            containerStyle={tw`flex-1`}
            type="outline"
            buttonStyle={tw`border-grayscale-disabled`}
            onPress={onContact}
          />
          <Button title={isFixedCost ? 'Đặt mua' : 'Gửi yêu cầu'} containerStyle={tw`flex-1`} onPress={onBuy} />
        </View>
      </>
    );
  }, [
    count,
    data?.userProduct,
    isRefetchingByUser,
    loading,
    navigation,
    onBuy,
    onContact,
    onDetailSpecs,
    onFavorite,
    onMinus,
    onPlus,
    onProductReview,
    onStoreDetail,
    refetchByUser,
    renderAddCart,
    width,
  ]);

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1 bg-white`}>
      {renderContent}

      <View style={tw`absolute mt-${top}px px-4 py-6px flex-row justify-between right-0 left-0`}>
        <TouchableOpacity style={tw`rounded-full bg-[#00000066] w-8 h-8 items-center justify-center`} onPress={onBack}>
          <ArrowLeftCustom fill={'white'} />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={tw`rounded-full bg-[#00000066] w-8 h-8 items-center justify-center`}
            onPress={() => {
              navigation.navigate('e-commerce/cart');
            }}
          >
            <CartCustomIcon fill={'white'} />
          </TouchableOpacity>
          {!!totalCart && (
            <View style={tw`absolute -top-1 -right-6px `}>
              <View style={tw``}>
                <Badge value={totalCart || 0} badgeStyle={tw`bg-blue`} textStyle={tw`text-10px`} />
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
