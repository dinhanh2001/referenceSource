import React, { useCallback, useMemo, useState } from 'react';
import { LayoutAnimation, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image } from '@rneui/themed';

import { ActivityIndicator, ECommerceCartCountInput, TextArea, tw } from '../../../components';
import { ArrowLeftSVG, CloseSvg } from '../../../svg';
import { useUserProductQuery } from '../../../graphql/queries/userProduct.generated';
import { useRefreshByUser } from '../../../hooks';
import { thousandSeparator } from '../../../utils';
import { Space } from '../../../components/spacer';
import { showFlashMessageError } from '../../../helpers';
import { useAddCartItemsMutation } from '../../../graphql/mutations/addCartItems.generated';
import { CartItemEntity } from '../../../graphql/type.interface';

import { ECommerceProductNavigationProp, ECommerceProductOrderRouteProp } from './type';

export const ECommerceProductOrderScreen = () => {
  const navigation = useNavigation<ECommerceProductNavigationProp>();
  const {
    params: { productId, quatity: _quatity },
  } = useRoute<ECommerceProductOrderRouteProp>();

  const [isConfirm, setIsConfirm] = useState(false);
  const [quatity, setQuatity] = useState(_quatity);
  const [note, setNote] = useState('');

  const { data, loading, refetch } = useUserProductQuery({
    variables: {
      id: productId,
    },
  });
  const [addCart, { loading: loadingAddCart }] = useAddCartItemsMutation({
    onError: showFlashMessageError,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const onBack = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (isConfirm) {
      setIsConfirm(false);
    } else {
      navigation.goBack();
    }
  }, [isConfirm, navigation]);

  const onMinus = useCallback(() => {
    if (quatity > 0) {
      setQuatity(quatity - 1);
    }
  }, [quatity]);

  const onPlus = useCallback(() => {
    if (quatity < (data?.userProduct?.quantity || 0)) {
      setQuatity(quatity + 1);
    }
  }, [data?.userProduct?.quantity, quatity]);

  const onReset = useCallback(() => {
    setQuatity(_quatity);
    setNote('');
  }, [_quatity]);

  const onNext = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsConfirm(true);
  }, []);

  const onSubmit = useCallback(() => {
    addCart({
      variables: {
        input: {
          cartItems: [{ productId, quantity: quatity }],
        },
      },
      onCompleted: (res) => {
        const item = res?.addCartItems?.items?.find((it) => it?.productId === productId);
        navigation.navigate('e-commerce/cart-payment', {
          note: note?.trim?.(),
          carts: [
            {
              ...item,
              product: data?.userProduct,
            },
          ] as CartItemEntity[],
        });
      },
    });
  }, [addCart, data?.userProduct, navigation, note, productId, quatity]);

  const renderHeader = useMemo(() => {
    return (
      <View style={tw`flex-row items-center mx-4 gap-4`}>
        <TouchableOpacity onPress={onBack}>
          {isConfirm ? <ArrowLeftSVG /> : <CloseSvg width={24} height={24} />}
        </TouchableOpacity>
        <Text style={tw`text-17px text-grayscale-black font-semibold`}>{isConfirm ? 'Gửi yêu cầu' : 'Đặt mua'}</Text>
      </View>
    );
  }, [isConfirm, onBack]);

  const renderContent = useMemo(() => {
    const { avatar, name, productUnit, unitPrice } = data?.userProduct || {};

    if (loading && !data?.userProduct) {
      return <ActivityIndicator />;
    }

    return (
      <View style={tw`m-4`}>
        <View style={tw`flex-row`}>
          <Image source={{ uri: avatar?.fullThumbUrl as string }} style={tw`h-14 w-14 rounded-2px`} />
          <View style={tw`flex-1 ml-3`}>
            <Text numberOfLines={2} style={tw`text-13px text-grayscale-black font-medium`}>
              {name}
            </Text>
            <Text style={tw`text-13px text-grayscale-gray mt-2`}>
              Đơn vị: <Text style={tw`text-13px text-grayscale-black`}>{productUnit?.name}</Text>
            </Text>

            {isConfirm ? (
              <View style={tw`mt-2`}>
                <View style={tw`flex-row items-center gap-2 self-end mb-1`}>
                  <Text style={tw`text-13px text-grayscale-black`}>Tổng giá trị:</Text>
                  <Text style={tw`text-13px text-grayscale-black`}>
                    ({quatity} <Text style={tw`text-13px text-grayscale-gray`}>sản phẩm</Text>)
                  </Text>
                </View>

                <Text style={tw`text-right text-14px font-semibold text-grayscale-black`}>
                  {thousandSeparator((unitPrice as number) * quatity)} đ
                </Text>
              </View>
            ) : (
              <View style={tw`mt-2`}>
                <View style={tw`flex-row items-center gap-2 self-end`}>
                  <Text style={tw`text-14px text-grayscale-gray`}>Giá:</Text>
                  <Text style={tw`text-14px font-semibold text-grayscale-black`}>
                    {thousandSeparator(unitPrice as number)} đ
                  </Text>
                </View>
                <View style={tw`flex-row items-center gap-2 self-end mt-4`}>
                  <Text style={tw`text-14px text-grayscale-gray`}>Số lượng</Text>
                  <ECommerceCartCountInput value={quatity} onMinus={onMinus} onPlus={onPlus} />
                </View>
              </View>
            )}
          </View>
        </View>

        {((isConfirm && !!note?.trim?.()) || !isConfirm) && (
          <View style={tw`mt-4`}>
            <Text style={tw`text-14px text-grayscale-black mb-2 font-semibold`}>Ghi chú đơn hàng</Text>
            {isConfirm ? (
              <View style={tw`px-4 py-10px bg-grayscale-bg rounded-1`}>
                <Text>{note?.trim?.()}</Text>
              </View>
            ) : (
              <TextArea multiline placeholder="Nhập nội dung" onChangeText={setNote} value={note} maxLength={1000} />
            )}
          </View>
        )}
      </View>
    );
  }, [data?.userProduct, isConfirm, loading, note, onMinus, onPlus, quatity]);

  const renderBottom = useMemo(() => {
    if (isConfirm) {
      return (
        <View style={tw`mx-4 mt-2 mb-8`}>
          <Button title={'Xác nhận đặt mua'} onPress={onSubmit} loading={loadingAddCart} />
        </View>
      );
    }

    return (
      <View style={tw`mx-4 mt-2 mb-8`}>
        <View style={tw`flex-row mb-3 items-center`}>
          <View style={tw`flex-1 gap-0.5`}>
            <Text style={tw`text-13px text-grayscale-black`}>Tổng giá trị</Text>
            <Text style={tw`text-13px text-grayscale-black`}>
              ({quatity} <Text style={tw`text-13px text-grayscale-gray`}>sản phẩm</Text>)
            </Text>
          </View>
          <Text style={tw`text-17px font-semibold text-grayscale-black`}>
            {thousandSeparator(quatity * (data?.userProduct?.unitPrice || 0))} đ
          </Text>
        </View>

        <View style={tw`flex-row`}>
          <Button
            containerStyle={tw`flex-1`}
            type="outline"
            buttonStyle={tw`border-grayscale-disabled`}
            title={'Làm lại'}
            onPress={onReset}
          />
          <Space horizontal size={16} />
          <Button containerStyle={tw`flex-1`} title={'Tiếp theo'} disabled={!quatity} onPress={onNext} />
        </View>
      </View>
    );
  }, [isConfirm, quatity, data?.userProduct?.unitPrice, onReset, onNext, onSubmit, loadingAddCart]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      {renderHeader}
      <ScrollView refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}>
        {renderContent}
      </ScrollView>

      {renderBottom}
    </SafeAreaView>
  );
};
