import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import React, { memo, useCallback } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, tw } from '../../components';
import { InstructionEntity, Media } from '../../graphql/type.interface';
import { useUserGetGuideQuery } from '../../graphql/queries/userGetGuide.generated';
import { ArrowRight } from '../../svg';
import { useRefreshByUser } from '../../hooks';

import { GuideDetailScreenNavigationProps, GuideDetailScreenRouteProps, PropsType } from './type';

export const GuideDetailScreen: React.FC<PropsType> = memo(() => {
  const { params } = useRoute<GuideDetailScreenRouteProps>();
  const navigation = useNavigation<GuideDetailScreenNavigationProps>();

  const { data, refetch, loading } = useUserGetGuideQuery({
    variables: {
      id: params.guideId,
    },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const handleOpenGuide = useCallback(
    (name: string, files: Media[]) => {
      navigation.navigate('guide/content', { title: name, files });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: InstructionEntity }) => {
      return (
        <TouchableOpacity
          style={tw`flex-row border mb-12px rounded-4px border-grayscale-border p-16px items-center`}
          onPress={() => handleOpenGuide(item.name, item.files)}
        >
          <View style={tw`flex-1`}>
            <Text style={tw`font-medium `}>{item.name}</Text>
          </View>
          <ArrowRight />
        </TouchableOpacity>
      );
    },
    [handleOpenGuide],
  );

  if (loading && !isRefetchingByUser) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`bg-white flex-1`}>
      <AppHeader title={data?.userGetGuide.name} />
      <FlatList
        style={tw`p-16px`}
        renderItem={renderItem}
        data={data?.userGetGuide.instructions as InstructionEntity[]}
        initialNumToRender={10}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
      />
    </SafeAreaView>
  );
});
