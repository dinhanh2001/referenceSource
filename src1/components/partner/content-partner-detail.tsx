import { useHeaderHeight } from '@react-navigation/elements';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/themed';
import React, { Fragment, useCallback, useState } from 'react';
import {
  ImageBackground,
  LayoutAnimation,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import { useUserGetAgencyTechniciansQuery } from '../../graphql/queries/userGetAgencyTechnicians.generated';
import { useUserPartnerDetailQuery } from '../../graphql/queries/userPartnerDetail.generated';
import { CategoryEntity, PartnerEntity, PartnerTypeEnum, StatusEnum } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { ArrowRight, CallSVG } from '../../svg';
import { getQualification } from '../../utils';
import { AfterInteraction } from '../after-interaction';
import { tw } from '../tw';
import { TechnicianItem } from '../technician-item';
import { Stars } from '../stars';
import { CallButton } from '../call-button';

const cover = require('../../images/cover-partner.png');
const RATIO_COVER = 274 / 375;

type Props = {
  id: string;
  type: PartnerTypeEnum;
};

export const ContentPartnerDetail = ({ id, type }: Props) => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  const { data, loading, refetch } = useUserPartnerDetailQuery({
    variables: {
      id,
    },
    skip: id == null,
  });
  const { data: techniciansData, refetch: refetchTechnician } = useUserGetAgencyTechniciansQuery({
    variables: {
      filterTechniciansByAgencyId: id ?? '',
      isActive: StatusEnum.ACTIVE,
      limit: 3,
      page: 1,
    },
    skip: type !== PartnerTypeEnum.AGENCY,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    refetch();
    refetchTechnician();
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
      refetchTechnician();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const headerHeight = useHeaderHeight();
  const { width } = useWindowDimensions();

  const [collapsed, setCollapsed] = useState(false);

  const { reviewSummary, avatar, fullname, qualifications, phone, description } = data?.userPartnerDetail || {};

  const onViewListTechnicians = () => {
    navigation.navigate('repair-request/select-partner/list-technician', { partnerId: id ?? '' });
  };

  const onCollapsed = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(!collapsed);
  };

  return (
    <AfterInteraction forceShow={loading}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      >
        <ImageBackground source={cover} resizeMode="cover" style={{ width, height: width * RATIO_COVER }}>
          <View style={tw`pt-${headerHeight}px px-16px pb-94px mt-6px`}>
            <View>
              <View style={tw`flex-row`}>
                <View style={tw``}>
                  <Image source={{ uri: avatar?.fullThumbUrl ?? '' }} style={tw`w-56px h-56px rounded-4px`} />
                </View>
                <View style={tw`justify-center ml-16px flex-1`}>
                  <View>
                    <Text style={tw`font-semibold text-17px text-white`} numberOfLines={1}>
                      {fullname}
                    </Text>
                    <Text style={tw`font-medium text-12px text-white mt-4px opacity-80`} numberOfLines={1}>
                      {getQualification(qualifications as CategoryEntity[])}
                    </Text>
                  </View>
                  <View
                    style={tw`flex-row border border-primary self-start rounded-full px-16px py-7px justify-center items-center mt-16px`}
                  >
                    <CallButton phone={phone}>
                      <CallSVG />
                    </CallButton>
                    <Text style={tw`text-11px text-primary ml-6px`}>{phone}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={tw`flex-1 pt-16px px-16px`}>
          <View style={tw`absolute right-16px left-16px -top-80px`}>
            <View style={tw`bg-white shadow-xl rounded-4px  p-16px`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`flex-row`}>
                  <Text style={tw`text-31px font-semibold`}>{reviewSummary?.starAverage?.toFixed?.(1)}</Text>
                  <Text style={tw`text-17px font-medium mt-4px`}>/ 5</Text>
                </View>
                <View style={tw`flex-1 ml-16px`}>
                  <Stars value={reviewSummary?.starAverage as number} />
                  <Text>{`${reviewSummary?.total} đánh giá, ${reviewSummary?.percent?.toFixed?.(1)}% hài lòng`}</Text>
                </View>
                <TouchableOpacity
                  style={tw`rounded-full bg-primary-light p-6px items-center justify-center`}
                  onPress={() =>
                    navigation.navigate('review-technician', {
                      partnerId: id,
                      type: PartnerTypeEnum.AGENCY,
                      // type: params.partner?.type as PartnerTypeEnum,
                    })
                  }
                >
                  <ArrowRight fill={tw.color('grayscale-black')} width={14} height={14} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {techniciansData?.userGetAgencyTechnicians.items && (
            <View>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-17px font-semibold`}>Kỹ thuật viên</Text>
                <TouchableOpacity
                  style={tw`rounded-full bg-primary-light p-6px items-center justify-center`}
                  onPress={onViewListTechnicians}
                >
                  <ArrowRight fill={tw.color('grayscale-black')} width={14} height={14} />
                </TouchableOpacity>
              </View>
              {techniciansData?.userGetAgencyTechnicians.items?.map((it) => (
                <Fragment key={it.id}>
                  <View style={tw`h-12px`} />
                  <TechnicianItem technician={it as PartnerEntity} />
                  <View style={tw`h-12px`} />
                </Fragment>
              ))}
            </View>
          )}

          <View style={tw`h-12px`} />
          <View style={tw`h-4px bg-grayscale-border -mx-16px`} />
          <View style={tw`mt-20px`}>
            <Text style={tw`text-17px font-semibold mb-12px`}>Thông tin</Text>
            <Text numberOfLines={collapsed ? undefined : 10} style={tw`text-13px text-grayscale-black leading-18px`}>
              {description}
            </Text>
            <TouchableOpacity onPress={onCollapsed}>
              <Text style={tw`text-blue font-semibold mt-2`}>{collapsed ? 'Ẩn bớt' : 'Xem thêm'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AfterInteraction>
  );
};
