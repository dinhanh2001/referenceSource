import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Image, Text } from '@rneui/themed';
import React, { memo, useCallback, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { ActivityIndicator, Space, tw } from '../../components';
import { CallButton } from '../../components/call-button';
import { useAgencyAssignBookingMutation } from '../../graphql/mutations/agencyAssignBooking.generated';
import { useAgencyGetTechniciansQuery } from '../../graphql/queries/agencyGetTechnicians.generated';
import { PartnerEntity, StatusEnum } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { CheckedSVG, StarSVG, UncheckSVG } from '../../svg';
import { getQualification } from '../../utils';
import { useRefreshByUser } from '../../hooks';

import { PropsType } from './type';

export const RepairRequestAgencyAssignTechnicianScreen: React.FC<PropsType> = memo((props: PropsType) => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();
  const [checkedItemId, setCheckedItemId] = useState<string | null>(null);

  const [agencyAssignBooking, { loading: assigningTechnician }] = useAgencyAssignBookingMutation({
    onError: showFlashMessageError,
    onCompleted: () => {
      navigation.goBack();
      props.route.params.onCompleted?.();
    },
  });

  const { data, loading, refetch } = useAgencyGetTechniciansQuery({
    variables: {
      limit: 1000,
      page: 1,
      isActive: StatusEnum.ACTIVE,
      isApproved: true,
    },
    fetchPolicy: 'cache-and-network',
    onError: showFlashMessageError,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const renderItem = (item: PartnerEntity) => {
    return (
      <View style={tw`px-16px py-8px`}>
        <TouchableOpacity
          style={tw`flex-row items-center border border-grayscale-border rounded-4px p-16px`}
          onPress={() => setCheckedItemId(item.id)}
        >
          <View style={tw`bottom-5px rounded-full`}>
            <Image source={{ uri: item.avatar?.fullThumbUrl || '' }} style={tw`w-48px h-48px rounded-full`} />
          </View>
          <Space horizontal size={12} />
          <View style={tw`flex-1 justify-between`}>
            <Text style={tw`font-semibold text-black overflow-hidden`} numberOfLines={1}>
              {item.fullname}
            </Text>
            <Space size={4} />
            <View style={tw`flex-row items-center`}>
              <StarSVG />
              <Space horizontal size={4} />
              <Text style={tw`text-12px`}>{item?.reviewSummary?.starAverage?.toFixed?.(1) || 0}</Text>
              <Space horizontal size={4} />
              <Text style={tw`text-grayscale-light text-12px`}>{`${item?.reviewSummary?.total} đánh giá`}</Text>
            </View>
            <Space size={4} />
            <Text numberOfLines={2} style={tw`text-12px leading-16px text-grayscale-gray`}>
              {item.qualifications && item.qualifications.length > 0
                ? getQualification(item.qualifications ?? [])
                : item.description}
            </Text>
          </View>
          <CallButton phone={item?.phone} />

          <View style={tw`ml-20px`}>{checkedItemId === item.id ? <CheckedSVG /> : <UncheckSVG />}</View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleAssignTechnician = useCallback(async () => {
    if (checkedItemId != null) {
      await agencyAssignBooking({
        variables: { input: { bookingId: props.route.params.bookingId, technicianId: checkedItemId } },
      });
    }
  }, [agencyAssignBooking, checkedItemId, props.route.params.bookingId]);

  if (loading && !data?.agencyGetTechnicians?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`flex-1`}>
      <FlatList
        style={tw`flex-1`}
        data={data?.agencyGetTechnicians?.items as PartnerEntity[]}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.8}
        onRefresh={refetchByUser}
        refreshing={isRefetchingByUser}
      />
      <View style={tw`bottom-0 left-0 right-0 pb-40px pt-10px px-16px bg-white`}>
        <Button
          title={'Xác nhận'}
          onPress={handleAssignTechnician}
          disabled={checkedItemId == null || assigningTechnician}
          loading={assigningTechnician}
        />
      </View>
    </View>
  );
});
