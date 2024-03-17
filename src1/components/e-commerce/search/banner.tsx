import { Image } from '@rneui/themed';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { StarIcon } from '../../../svg';
import { tw } from '../../tw';

type Props = {};

export const ECommerceSearchResultBanner = (_props: Props) => {
  // const navigation = useNavigation<ECommerceSearchNavigationProp>();

  const onStoreDetail = () => {
    // navigation.navigate('e-commerce/store-detail', { storeId: '333d05ae-f08d-4480-a276-10af9932d560' });
  };

  return (
    <View style={tw`bg-grayscale-black p-4 pb-14px`}>
      <View style={tw`flex-row items-center`}>
        <Image
          source={{
            uri: 'https://s3.amazonaws.com/thumbnails.venngage.com/template/fc8535df-be09-4c80-8ea5-a69a34b2318e.png',
          }}
          style={tw`w-9 h-9 rounded-4px`}
        />
        <View style={tw`flex-1 ml-3`}>
          <Text style={tw`text-white font-semibold`}>Call me Store</Text>
          <View style={tw`flex-row items-center mt-1`}>
            <StarIcon />
            <Text style={tw`text-white mx-1 opacity-80`}>4.0</Text>
            <Text style={tw`text-white opacity-60`}>(12 đánh giá)</Text>
          </View>
        </View>
        <TouchableOpacity style={tw`border-primary border px-4 py-6px rounded-999`} onPress={onStoreDetail}>
          <Text style={tw`text-primary-dark`}>{'Ghé thăm'}</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={tw`flex-row mt-4`}>
        <View style={tw` mr-3`}>
          <Image
            source={{ uri: 'https://www.ptscdinhvu.com.vn/upload/image/21-06-2018/1-21.06.2018.jpg' }}
            style={tw`h-130px w-${w}px rounded-2px`}
          />
        </View>
        <View>
          <Image
            source={{ uri: 'https://cdn-v2.kidsplaza.vn/media/catalog/product/s/i/sieu_xe_can_cau_im.9060-15b_1.jpg' }}
            style={tw`w-16 h-16 rounded-2px`}
          />

          <Image
            source={{ uri: 'https://germanystore.vn/wp-content/uploads/2021/08/61T9ZVO4wiS._AC_SL1000_.jpg' }}
            style={tw`w-16 h-16 rounded-2px mt-2px`}
          />
        </View>
      </View> */}
    </View>
  );
};
