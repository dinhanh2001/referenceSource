import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@rneui/themed';
import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { BackButton, ActivityIndicator, Screen, tw } from '../../../components';
import { useReverseGeocodingQuery } from '../../../graphql/queries/reverseGeocoding.generated';
import { AddressStackScreenRouteProps, AppRoutes, RootNavigatorParamList } from '../../../navigator-params';
import { MarkerCircleIcon, MarkerSvg } from '../../../svg';

export const AddressMapScreen = React.memo(() => {
  const navigation = useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const { params } = useRoute<AddressStackScreenRouteProps<AppRoutes.ADDRESS_MAP>>();

  const [location, setLocation] = useState<Region>({
    latitude: params.initial.lat,
    longitude: params.initial.lng,
    latitudeDelta: 0.0125,
    longitudeDelta: 0.0125,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useReverseGeocodingQuery({
    variables: {
      input: {
        lat: location?.latitude ?? 0,
        lng: location?.longitude ?? 0,
      },
    },
    skip: location === null,
    fetchPolicy: 'cache-first',
    onCompleted: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const addressTitle = useMemo(() => {
    if (data?.reverseGeocoding && Array.isArray(data.reverseGeocoding)) {
      return (
        <Text numberOfLines={1} style={tw`text-13px leading-18px font-semibold text-grayscale-black`}>
          {data.reverseGeocoding[0].name}
        </Text>
      );
    }
  }, [data]);

  const addressDescription = useMemo(() => {
    if (data?.reverseGeocoding && Array.isArray(data.reverseGeocoding)) {
      return (
        <Text numberOfLines={1} style={tw`text-13px leading-18px text-grayscale-black`}>
          {data.reverseGeocoding[0].address}
        </Text>
      );
    }
  }, [data]);

  const renderMapView = useMemo(() => {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={tw`flex-1`}
        showsTraffic={false}
        loadingEnabled={true}
        onRegionChange={() => {
          setLoading(true);
        }}
        onRegionChangeComplete={(e) => {
          setLocation(e);
          setLoading(false);
        }}
        showsBuildings={false}
        initialRegion={location}
      />
    );
  }, [location]);

  const onSaveAddress = useCallback(() => {
    params.onSelect({
      lat: location.latitude,
      lng: location.longitude,
      mapAddress: data?.reverseGeocoding[0].address ?? '',
    });
    navigation.pop(2);
  }, [data?.reverseGeocoding, location.latitude, location.longitude, navigation, params]);

  return (
    <Screen style={tw`flex-1`}>
      <View style={tw`flex-1`}>
        {renderMapView}

        <View style={[tw`absolute top-1/2 left-1/2`, { transform: [{ translateX: -34 }, { translateY: -34 }] }]}>
          <MarkerSvg />
        </View>
        <BackButton containerStyle={[tw`absolute left-24px top-24px`]} />
      </View>
      <View style={tw`bg-white pb-34px pt-16px`}>
        <View style={tw`mx-16px`}>
          <Text style={tw`text-grayscale-black font-semibold`}>Địa chỉ</Text>
          <View style={tw`flex-row items-start py-20px h-80px`}>
            <MarkerCircleIcon width={24} height={24} />
            <View style={tw`ml-12px shrink`}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <>
                  {addressTitle}
                  {addressDescription}
                </>
              )}
            </View>
          </View>
          <Button loading={loading} disabled={loading} title="Xác nhận địa chỉ này" onPress={onSaveAddress} />
        </View>
      </View>
    </Screen>
  );
});
