import { useNavigation } from '@react-navigation/native';
import { Image, Text } from '@rneui/themed';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

import { tw } from '../../components';
import { VehicleSection } from '../../components/vehicle-section';
import { Space } from '../../components/spacer';
import { usePartnerBookingQuery } from '../../graphql/queries/partnerBooking.generated';
import { FileType, Media, VehicleEntity } from '../../graphql/type.interface';
import { AppRoutes } from '../../navigator-params';
import { FilmSVG } from '../../svg';

import { MalfunctionScreenNavigationProps, PropsType } from './type';
const { width } = Dimensions.get('window');

export const MalfunctionScreen: React.FC<PropsType> = (props: PropsType) => {
  const navigation = useNavigation<MalfunctionScreenNavigationProps>();
  const { bookingId } = props.route.params;
  const { data } = usePartnerBookingQuery({ variables: { id: bookingId } });

  return (
    <View style={tw`flex-1 p-16px`}>
      <VehicleSection data={data?.partnerBooking.vehicle as VehicleEntity} />
      <Space size={24} />
      <Text style={tw`font-semibold`}>Thông tin hỏng hóc</Text>
      <Space size={20} />
      <View style={tw`flex-row`}>
        {data?.partnerBooking.problemTexts &&
          data?.partnerBooking.problemTexts.map((e) => (
            <View
              key={e.toString()}
              style={tw`border-solid border border-grayscale-border rounded-4px mr-10px px-12px py-6px`}
            >
              <Text>{e}</Text>
            </View>
          ))}
      </View>
      <Space size={10} />
      <View style={tw`flex-row flex-wrap -mr-16px`}>
        {data?.partnerBooking.medias.map((e, index) => (
          <TouchableOpacity
            key={e?.id}
            style={tw`mt-10px mr-10px`}
            onPress={() =>
              navigation.navigate(AppRoutes.MEDIA_LIST_VIEW_SCREEN, {
                listImage: data.partnerBooking.medias as Media[],
                index,
              })
            }
          >
            {e.type === FileType.VIDEO ? (
              <View
                style={tw`w-${(width - 62) / 4}px h-${
                  (width - 62) / 4
                }px rounded-4px justify-center items-center bg-black`}
              >
                <FilmSVG width={60} height={60} />
              </View>
            ) : (
              <Image
                style={tw`w-${(width - 62) / 4}px h-${(width - 62) / 4}px rounded-4px`}
                source={{ uri: e.fullThumbUrl ?? '' }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Space />
      {data?.partnerBooking.description && (
        <View style={tw`px-16px py-12px bg-grayscale-bg rounded-4px`}>
          <Text>{data?.partnerBooking.description}</Text>
        </View>
      )}
    </View>
  );
};
