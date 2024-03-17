import { useRoute } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import React, { memo, useCallback } from 'react';
import { FlatList, Linking, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, tw } from '../../components';
import { Media } from '../../graphql/type.interface';

import { GuideContentScreenRouteProps, PropsType } from './type';

export const GuideContentScreen: React.FC<PropsType> = memo(() => {
  const { params } = useRoute<GuideContentScreenRouteProps>();

  const { bottom } = useSafeAreaInsets();

  const onDownload = useCallback(async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      showMessage({
        message: 'Không thể mở báo giá',
        type: 'danger',
      });
    }
  }, []);

  const renderItem = ({ item }: { item: Media }) => {
    return (
      <View style={tw`flex-row items-center mt-4`}>
        <View style={tw`flex-1 mr-2`}>
          <Text>{item?.name}</Text>
        </View>
        <TouchableOpacity
          style={tw` px-4 py-1 bg-primary rounded-1`}
          onPress={() => onDownload(item?.fullOriginalUrl as string)}
        >
          <Text>Tải</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`bg-white flex-1`}>
      <AppHeader />
      <FlatList
        contentContainerStyle={tw`px-4 pb-${bottom + 20}px`}
        scrollIndicatorInsets={{ right: 1 }}
        ListHeaderComponent={() => <Text style={tw`text-19px font-semibold `}>{params.title}</Text>}
        data={params?.files}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
});
