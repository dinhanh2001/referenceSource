import { Image } from '@rneui/themed';
import React from 'react';
import { Linking, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import { ActivityIndicator, AppHeader, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { ClipIcon } from '../../../svg';
import { useUserProductQuotationQuery } from '../../../graphql/queries/userProductQuotation.generated';
import { useRefreshByUser } from '../../../hooks';
import { Media, ProductQuotationStatusEnum } from '../../../graphql/type.interface';

import { ECommercePriceRequestDetailQuotationRouteProp } from './type';

export const ECommercePriceRequestDetail = () => {
  const {
    params: { id },
  } = useRoute<ECommercePriceRequestDetailQuotationRouteProp>();

  const { data, loading, refetch } = useUserProductQuotationQuery({
    variables: { id },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { product, quantity, response, detail, medias, status } = data?.userProductQuotation || {};

  const onViewMedia = async (media: Media) => {
    try {
      await Linking.openURL(media?.fullOriginalUrl as string);
    } catch (error) {
      showMessage({
        message: 'Không thể mở báo giá',
        type: 'danger',
      });
    }
  };

  const renderMedia = (media: Media) => {
    const { id: mediaId, name } = media || {};
    return (
      <View key={mediaId} style={tw`flex-row items-center bg-grayscale-bg mt-2 p-5px pl-4`}>
        <View style={tw`flex-1 flex-row items-center mr-3`}>
          <ClipIcon />
          <View style={tw`flex-1`}>
            <Text style={tw`ml-2 text-13px`}>{name}</Text>
          </View>
        </View>
        <TouchableOpacity style={tw`py-7px px-4 bg-primary rounded-1`} onPress={() => onViewMedia(media)}>
          <Text style={tw`text-3 font-medium`}>Xem</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading && !data?.userProductQuotation) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <AppHeader
        centerView={
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              style={tw`h-6 w-6 rounded-1`}
              source={{
                uri: product?.partner?.avatar?.fullThumbUrl as string,
              }}
            />
            <Text style={tw`text-grayscale-black font-semibold`}>{product?.partner?.fullname}</Text>
          </View>
        }
      />
      <View style={tw`flex-1 bg-[#F9F9F9] p-4`}>
        <ScrollView refreshControl={<RefreshControl onRefresh={refetchByUser} refreshing={isRefetchingByUser} />}>
          <View style={tw` bg-white p-3 rounded-1 shadow-sm `}>
            <View style={tw`flex-row mb-3`}>
              <Image source={{ uri: product?.avatar?.fullThumbUrl as string }} style={tw`w-14 h-14 rounded-4px`} />
              <View style={tw`flex-1 ml-3 gap-2`}>
                <Text numberOfLines={1} style={tw`text-13px text-grayscale-gray`}>
                  {product?.name}
                </Text>
                <Text style={tw`text-grayscale-black font-semibold`}>Thương lượng</Text>
                <Text style={tw`text-right text-grayscale-gray text-3`}>x{quantity}</Text>
              </View>
            </View>
            <Space size={1} backgroundColor={'#EEE'} />
            <Text style={tw`mt-3 text-13px text-grayscale-gray`}>Yêu cầu chi tiết/Câu hỏi của bạn</Text>
            <View style={tw`mt-2 px-4 py-10px bg-grayscale-bg rounded-1`}>
              <Text style={tw`text-13px text-grayscale-black`}>{detail}</Text>
            </View>
          </View>

          {status === ProductQuotationStatusEnum?.RESPONDED && (
            <View style={tw` bg-white p-3 rounded-1 shadow-sm mt-4`}>
              <View style={tw`flex-row items-center gap-2 mb-3`}>
                <Image
                  style={tw`h-6 w-6 rounded-1`}
                  source={{
                    uri: product?.partner?.avatar?.fullThumbUrl as string,
                  }}
                />
                <Text style={tw`text-grayscale-black font-semibold`}>{product?.partner?.fullname}</Text>
              </View>
              <Space size={1} backgroundColor={'#EEE'} />
              <View style={tw`mt-3 px-4 py-10px bg-grayscale-bg rounded-1`}>
                <Text style={tw`text-13px text-grayscale-black`}>{response}</Text>
              </View>

              <View>{medias?.map?.(renderMedia)}</View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
