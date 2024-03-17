import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Linking, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, tw } from '../../components';
import { usePartnerGetDocumentQuery } from '../../graphql/queries/partnerGetDocument.generated';
import { Media } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';

import { DocumentDetailScreenRouteProps } from './type';

export const DocumentDetailScreen = () => {
  const {
    params: { id },
  } = useRoute<DocumentDetailScreenRouteProps>();

  const { bottom } = useSafeAreaInsets();

  const { data, loading, refetch } = usePartnerGetDocumentQuery({
    variables: {
      id,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { name, files } = data?.partnerGetDocument || {};

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

  if (loading && !data?.partnerGetDocument) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      contentContainerStyle={tw`px-4 pb-${bottom + 20}px`}
      refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      scrollIndicatorInsets={{ right: 1 }}
      ListHeaderComponent={() => <Text style={tw`mt-2 mb-1 font-semibold text-19px`}>{name}</Text>}
      data={files}
      renderItem={renderItem}
    />
  );
};
