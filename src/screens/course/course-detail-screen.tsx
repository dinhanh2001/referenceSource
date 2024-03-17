import { useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { Image, RefreshControl, ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, tw } from '../../components';
import { useEnrollCourseMutation } from '../../graphql/mutations/enrollCourse.generated';
import { usePartnerGetCourseQuery } from '../../graphql/queries/partnerGetCourse.generated';
import { thousandSeparator } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { CalendarSVG, ClockSVG } from '../../svg';

import { CourseDetailScreenRouteProps } from './type';

export const CourseDetailScreen = () => {
  const {
    params: { courseId },
  } = useRoute<CourseDetailScreenRouteProps>();

  const { data, refetch, loading } = usePartnerGetCourseQuery({ variables: { id: courseId } });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const [checkInCourseEnroll, { loading: loadingEnroll }] = useEnrollCourseMutation({
    onCompleted: () => {
      refetch();
      showMessage({
        message: 'Tham gia khoá học thành công',
        type: 'success',
        position: 'top',
      });
    },
  });

  const {
    banner,
    teacher,
    content,
    name,
    teacherDescription,
    startDate,
    endDate,
    // updatedAt,
    openDate,
    address,
    price,
    isEnrolled,
  } = data?.partnerGetCourse || {};

  const handleErrollCheckCourse = useCallback(async () => {
    await checkInCourseEnroll({ variables: { id: courseId } });
  }, [checkInCourseEnroll, courseId]);

  if (loading && !data?.partnerGetCourse)
    return (
      <View style={tw`flex-1 flex items-center justify-center`}>
        <ActivityIndicator />
      </View>
    );

  return (
    <SafeAreaView edges={['bottom']} style={tw` flex-1`}>
      <ScrollView
        scrollIndicatorInsets={{ right: 1 }}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
      >
        <Image
          source={{
            uri: banner?.fullThumbUrl ?? '',
          }}
          style={tw`w-full aspect-${1 / RATIO}`}
        />
        <View style={tw`mx-4 mt-5`}>
          <Text style={tw`font-semibold text-19px`}>{name}</Text>
          {!!content && <Text style={tw`mt-1.5`}>{content}</Text>}

          <View style={tw`mt-5`}>
            <Text style={tw`font-semibold`}>{teacher}</Text>
            {!!teacherDescription && <Text style={tw`text-grayscale-gray mt-0.5 text-13px`}>{teacherDescription}</Text>}
          </View>
          {/* <Text style={tw`mt-5 text-13px`}>Cập nhật gần đây nhất {dayjs(updatedAt).format('MM/YYYY')}</Text> */}

          <Field
            icon={<ClockSVG />}
            title="Thời gian học:"
            value={`${dayjs(startDate).format('DD/MM/YYYY')}-${dayjs(endDate).format('DD/MM/YYYY')}`}
          />
          <Field icon={<CalendarSVG />} title="Ngày khai giảng:" value={dayjs(openDate).format('DD/MM/YYYY')} />
          <Field icon={<CalendarSVG />} title="Địa điểm học:" value={address || ''} />

          <View style={tw`flex flex-row items-center mt-4`}>
            <Text style={tw`font-bold text-2xl`}>{`${thousandSeparator(price || 0)} đ`}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={tw`mb-4 mt-2 mx-4 `}>
        <Button
          onPress={handleErrollCheckCourse}
          disabled={isEnrolled as boolean}
          title={isEnrolled ? 'Đã ghi danh' : 'Ghi danh'}
          loading={loadingEnroll}
        />
      </View>
    </SafeAreaView>
  );
};

const RATIO = 0.56;

type FieldProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

const Field = ({ title, value, icon, containerStyle }: FieldProps) => (
  <View style={[tw`flex flex-row items-center mt-3`, containerStyle]}>
    {icon}
    <Text style={tw`text-grayscale-gray ml-2 text-13px`}>
      {title} <Text style={tw`text-grayscale-black text-13px`}>{value || ''}</Text>
    </Text>
  </View>
);
