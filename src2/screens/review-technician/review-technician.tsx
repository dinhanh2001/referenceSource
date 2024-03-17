import { useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';

import { AppHeader, Screen, tw } from '../../components';
import { Stars } from '../../components/stars';
import { useReviewsOfPartnerQuery } from '../../graphql/queries/reviewsOfPartner.generated';
import { useUserPartnerDetailQuery } from '../../graphql/queries/userPartnerDetail.generated';
import { PartnerTypeEnum, ReviewEntity, ReviewTypeEnum } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { AppStackNavigatorScreenProps } from '../../navigator-params';

import { ReviewDetail } from './review-detail';

const buttons = [
  {
    label: 'Tất cả',
    value: 6,
  },
  {
    label: '5 sao',
    value: 5,
  },
  {
    label: '4 sao',
    value: 4,
  },
  {
    label: '3 sao',
    value: 3,
  },
  {
    label: '2 sao',
    value: 2,
  },
  {
    label: '1 sao',
    value: 1,
  },
];

export const ReviewTechnician = memo(() => {
  const {
    params: { partnerId, type: typePartner },
  } = useRoute<AppStackNavigatorScreenProps<'review-technician'>['route']>();

  const { data, refetch } = useUserPartnerDetailQuery({
    variables: {
      id: partnerId,
    },
    skip: partnerId == null,
  });

  const type = useMemo(() => {
    switch (typePartner) {
      case PartnerTypeEnum.AGENCY:
        return ReviewTypeEnum.CLIENT_AGENCY;
      case PartnerTypeEnum.TECHNICIAN:
        return ReviewTypeEnum.CLIENT_TECHNICIAN;
      default:
        return ReviewTypeEnum.CLIENT_AGENCY;
    }
  }, [typePartner]);

  const [active, setActive] = useState(6);

  const star = useMemo(() => {
    if (active > 5) {
      return undefined;
    }

    return active;
  }, [active]);

  const { data: dataReviews, refetch: refetchReviews } = useReviewsOfPartnerQuery({
    variables: { partnerId, type, star },
  });

  const { reviewSummary, starInfo } = data?.userPartnerDetail || {};

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(async () => {
    await refetch();
    await refetchReviews();
  });

  const renderHeader = useCallback(() => {
    const { percent, starAverage, total } = reviewSummary || {};

    return (
      <View style={tw`bg-white`}>
        <View style={tw`bg-white border border-[#EEEEEE] rounded p-16px flex-row items-center`}>
          <View style={tw`flex-row`}>
            <Text style={tw`text-31px leading-38px font-semibold`}>{starAverage?.toFixed?.(1)}</Text>
            <Text style={tw`text-17px leading-38px font-medium mt-4px`}>/ 5</Text>
          </View>
          <View style={tw`flex-1 ml-16px`}>
            <Stars value={starAverage as number} />
            <Text
              style={tw`text-12px leading-16px font-normal text-grayscale-gray`}
            >{`${total} đánh giá, ${percent?.toFixed?.(1)}% hài lòng`}</Text>
          </View>
        </View>
        <View />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`my-24px h-36px`}>
          {buttons.map((b) => {
            const count = starInfo?.find((s) => s.star === b.value)?.total || 0;
            const textCount = count ? `(${count})` : '';
            return (
              <Button
                key={b.value}
                titleStyle={tw`${active === b.value ? 'font-bold' : 'font-normal'}`}
                containerStyle={tw`mr-8px`}
                buttonStyle={tw`rounded-full text-14px leading-20px h-30px py-0 border 
                  ${active === b.value ? 'border-[#202C38]' : 'border-[#EEEEEE]'}`}
                type="outline"
                size="lg"
                onPress={() => setActive(b.value)}
              >
                {`${b.label} ${textCount}`}
              </Button>
            );
          })}
        </ScrollView>
      </View>
    );
  }, [active, reviewSummary, starInfo]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<ReviewEntity>) => {
    return <ReviewDetail item={item} />;
  }, []);

  return (
    <Screen style={tw`flex-1`}>
      <SafeAreaView style={tw`flex-1`}>
        <AppHeader title="Đánh giá và nhận xét" />
        <FlatList
          keyExtractor={(item) => item?.id}
          stickyHeaderIndices={[0]}
          data={dataReviews?.reviewsOfPartner?.items as ReviewEntity[]}
          renderItem={renderItem}
          contentContainerStyle={tw`p-16px`}
          ListHeaderComponent={renderHeader}
          refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
        />
      </SafeAreaView>
    </Screen>
  );
});
