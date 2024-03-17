import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from '@rneui/themed';
import React, { useMemo } from 'react';
import { RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, ShortList, VehicleCard, tw } from '../../components';
import { FileType } from '../../graphql/type.interface';
import { AppStackNavigatorScreenProps, UseAppStackNavigatorScreenProps } from '../../navigator-params';
import { FilmIconSvg } from '../../svg';
import { useBookingQuery } from '../../graphql/queries/booking.generated';
import { useRefreshByUser } from '../../hooks';

export const MyRepairRequestsIssueDetail = () => {
  const navigation = useNavigation<UseAppStackNavigatorScreenProps<'my-repair-request/issue-detail'>>();
  const route = useRoute<AppStackNavigatorScreenProps<'my-repair-request/issue-detail'>['route']>();

  const { bookingId } = route?.params || {};
  const { bottom } = useSafeAreaInsets();

  const { data, loading, refetch } = useBookingQuery({ variables: { id: bookingId } });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const { medias, problemTexts } = data?.booking || {};

  const renderContent = useMemo(() => {
    if (loading) return <ActivityIndicator />;

    return (
      <>
        <VehicleCard item={data?.booking.vehicle!} containerStyle={tw`bg-grayscale-bg px-4`} />
        <ScrollView
          scrollIndicatorInsets={{ right: 1 }}
          contentContainerStyle={tw`px-4 grow pb-${bottom + 20}px`}
          refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
        >
          <Text style={tw`text-14px font-medium mt-6 mb-5`}>Hiện tượng hư hỏng</Text>
          <ShortList data={problemTexts as string[]} showAll />
          <View style={tw`flex-row flex-wrap gap-2 mt-2`}>
            {medias?.map?.((attached, index) => (
              <TouchableOpacity
                key={attached.id}
                onPress={() => {
                  navigation.navigate('media-preview', {
                    data: medias,
                    activeIndex: index,
                  });
                }}
              >
                {attached.type === FileType.VIDEO ? (
                  <View style={tw`items-center justify-center h-20 w-20 rounded bg-black`}>
                    <FilmIconSvg width={60} height={60} />
                  </View>
                ) : (
                  <Image
                    resizeMode="cover"
                    source={{ uri: attached.fullThumbUrl as string }}
                    style={tw`h-20 w-20 rounded`}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <View style={tw`py-3 px-4 bg-grayscale-bg mt-4`}>
            <Text style={tw`text-13px`}>{data?.booking.description}</Text>
          </View>
        </ScrollView>
      </>
    );
  }, [
    bottom,
    data?.booking.description,
    data?.booking.vehicle,
    isRefetchingByUser,
    loading,
    medias,
    navigation,
    problemTexts,
    refetchByUser,
  ]);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader title="Hiện tượng hư hỏng" />
      {renderContent}
    </SafeAreaView>
  );
};
