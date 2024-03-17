import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/themed';
import React, { useCallback, useMemo, useState } from 'react';
import { Animated, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { CartItemEntity, CreateCartInput } from '../../../graphql/type.interface';
import { useDebounce, useEffectAfterMount } from '../../../hooks';
import { ECommerceCartNavigationProp } from '../../../screens/e-commerce/cart/type';
import { ArrowRight, CheckSVG } from '../../../svg';
import { thousandSeparator } from '../../../utils';
import { Space } from '../../spacer';
import { tw } from '../../tw';
import { ECommerceStatusProduct } from '../product';

import { ECommerceCartCountInput } from './count-input';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  item?: CartItemEntity;
  onDelete?: (id: string) => void;
  selected?: boolean;
  onSelect?: (val: boolean, item: CartItemEntity) => void;
  updateCart: (input: CreateCartInput) => void;
};

export const ECommerceCartItem = ({ containerStyle, item, onDelete, selected, onSelect, updateCart }: Props) => {
  const navigation = useNavigation<ECommerceCartNavigationProp>();

  const [count, setCount] = useState(item?.quantity || 1);
  const { store, product } = item || {};
  const countDebounce = useDebounce(count, 250);

  useEffectAfterMount(() => {
    if (item?.quantity !== countDebounce) {
      updateCart({
        cartItems: [
          {
            productId: product?.id as string,
            quantity: countDebounce,
          },
        ],
      });
    }
  }, [countDebounce, updateCart, item?.quantity]);

  const onMinus = useCallback(() => {
    if (count > 0) {
      setCount(count - 1);
    }
  }, [count]);

  const onPlus = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const onDetailStore = useCallback(() => {
    navigation.push('e-commerce/store-detail', { storeId: store?.id as string });
  }, [navigation, store?.id]);

  const handleDelete = useCallback(() => {
    onDelete?.(item?.id as string);
  }, [item?.id, onDelete]);

  const handleSelect = useCallback(() => {
    onSelect?.(!selected, item as CartItemEntity);
  }, [item, onSelect, selected]);

  const handleProductRelated = useCallback(() => {
    navigation.push('e-commerce/product-detail-specs', {
      productId: product?.id || '',
      initialRouteName: 'e-commerce/product-detail-specs/related',
    });
  }, [navigation, product?.id]);

  const renderChecked = useMemo(() => {
    return (
      <View
        style={[
          tw`rounded-2px w-5 h-5 items-center justify-center self-center`,
          selected ? tw`bg-primary` : tw`border border-grayscale-gray`,
        ]}
      >
        {selected && <CheckSVG width={10} />}
      </View>
    );
  }, [selected]);

  const renderItem = useMemo(
    () => (
      <View style={tw`ml-3 flex-1 flex-row`}>
        <Image style={tw`h-20 w-20 rounded-1`} source={{ uri: product?.avatar?.fullOriginalUrl as string }} />
        <View style={tw`absolute`}>
          <ECommerceStatusProduct isNew={product?.isNew} />
        </View>
        <View style={tw`flex-1 ml-3 gap-2`}>
          <Text style={tw`text-13px`} numberOfLines={2}>
            {product?.name}
          </Text>
          <Text style={tw`font-semibold`}>{`${thousandSeparator(product?.unitPrice as number)} đ`}</Text>
        </View>
      </View>
    ),
    [product?.avatar?.fullOriginalUrl, product?.isNew, product?.name, product?.unitPrice],
  );

  const renderActions = useCallback(
    (
      _progress: Animated.AnimatedInterpolation<string | number>,
      dragX: Animated.AnimatedInterpolation<string | number>,
    ) => {
      const trans = dragX.interpolate({
        inputRange: [0, 100, 150, 200],
        outputRange: [0, 0, 0, 1],
      });

      return (
        <Animated.View
          style={[
            tw`flex-row`,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <TouchableOpacity style={tw`w-20 bg-error items-center justify-center`} onPress={handleDelete}>
            <Text style={tw`text-3 text-white`}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`w-20 bg-primary-dark items-center justify-center`} onPress={handleProductRelated}>
            <Text style={tw`text-3 text-white text-center`}>{'Sản phẩm\ntương tự'}</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [handleDelete, handleProductRelated],
  );

  return (
    <View style={[tw`p-4`, containerStyle]}>
      <TouchableOpacity style={tw`flex-row items-center gap-2`} onPress={onDetailStore}>
        <Image
          style={tw`h-6 w-6 rounded-1`}
          source={{
            uri: store?.avatar?.fullThumbUrl as string,
          }}
        />
        <Text style={tw`text-grayscale-black font-semibold`}>{store?.fullname}</Text>
        <ArrowRight />
      </TouchableOpacity>

      <Space size={1} backgroundColor={'#EEE'} style={tw`my-4`} />

      <Swipeable renderRightActions={renderActions}>
        <TouchableOpacity style={tw`flex-row `} onPress={handleSelect}>
          {renderChecked}
          {renderItem}
        </TouchableOpacity>
      </Swipeable>
      <View style={tw`flex-row justify-between mt-4 items-center`}>
        <Text style={tw`text-13px text-grayscale-gray`}>Số lượng</Text>
        <ECommerceCartCountInput onMinus={onMinus} onPlus={onPlus} value={count} />
      </View>
    </View>
  );
};
