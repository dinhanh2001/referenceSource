import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, tw } from '../../components';
import { DocumentEntity } from '../../graphql/type.interface';
import { ArrowRightSVG } from '../../svg';
import { usePartnerGetReferenceQuery } from '../../graphql/queries/partnerGetReference.generated';
import { useRefreshByUser } from '../../hooks';
import { AppRoutes } from '../../navigator-params';

import { DocumentListScreenNavigationProps, DocumentListScreenRouteProps } from './type';

export const DocumentListScreen = () => {
  const {
    params: { id },
  } = useRoute<DocumentListScreenRouteProps>();
  const navigation = useNavigation<DocumentListScreenNavigationProps>();

  const { bottom } = useSafeAreaInsets();

  const { data, loading, refetch } = usePartnerGetReferenceQuery({
    variables: {
      id,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { name, documents } = data?.partnerGetReference || {};

  const handleOpenDocument = useCallback(
    (documentId: string) => {
      navigation.navigate(AppRoutes.DOCUMENT_DETAIL_SCREEN, { id: documentId });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: DocumentEntity }) => {
      return (
        <TouchableOpacity
          style={tw`flex-row border mb-12px rounded-4px border-grayscale-border p-16px items-center`}
          onPress={() => handleOpenDocument(item?.id)}
        >
          <View style={tw`flex-1`}>
            <Text style={tw`font-medium `}>{item.name}</Text>
          </View>
          <ArrowRightSVG />
        </TouchableOpacity>
      );
    },
    [handleOpenDocument],
  );

  if (loading && !data?.partnerGetReference) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`bg-white flex-1`}>
      <AppHeader title={name} numberOfLines={2} />
      <FlatList
        contentContainerStyle={tw`px-4 pt-4 pb-${bottom + 20}px`}
        renderItem={renderItem}
        data={documents}
        initialNumToRender={20}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </SafeAreaView>
  );
};
