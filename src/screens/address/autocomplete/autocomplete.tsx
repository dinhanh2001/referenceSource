import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { Divider, Input, Text } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ArrowLeftSVG, LocationSVG } from '../../../svg';
import { ActivityIndicator, Screen, tw } from '../../../components';
import { useDebounce } from '../../../hooks';
import { useSearchPlacesAutocompleteQuery } from '../../../graphql/queries/searchPlacesAutocomplete.generated';
import { useFullScreenLoading, useLocation } from '../../../contexts';
import { AddressStackScreenNavigationProps, AddressStackScreenRouteProps, AppRoutes } from '../../../navigator-params';
import { showFlashMessageError } from '../../../helpers';
import { SearchPlace } from '../../../graphql/type.interface';
import { useGetPlaceDetailLazyQuery } from '../../../graphql/queries/getPlaceDetail.generated';

const CACHE_LATEST_ADDRESS_LIST = 'CACHE_LATEST_ADDRESS_LIST';

export const AddressAutoCompleteScreen = memo(() => {
  const navigation = useNavigation<AddressStackScreenNavigationProps>();
  const { params } = useRoute<AddressStackScreenRouteProps<AppRoutes.ADDRESS_AUTOCOMPLETE>>();

  const [addresses, setAddresses] = useState<SearchPlace[]>([]);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(CACHE_LATEST_ADDRESS_LIST);

      if (data != null) setAddresses(JSON.parse(data));
    })();
  }, []);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);
  }, []);

  const [input, setInput] = useState('');

  const debounceValue = useDebounce(input.trim().toLowerCase());

  const { latlng } = useLocation();

  const { loading: searchingAutoComplete } = useSearchPlacesAutocompleteQuery({
    variables: {
      input: {
        keyword: debounceValue,
        location: latlng,
      },
    },
    onCompleted: (res) => {
      setAddresses(res.searchPlacesAutocomplete);
    },
    fetchPolicy: 'cache-first',
    skip: debounceValue == null || debounceValue.length === 0,
  });

  const [getPlace, { loading: gettingPlace }] = useGetPlaceDetailLazyQuery({
    fetchPolicy: 'cache-first',
    onError: showFlashMessageError,
  });

  const { showFullscreenLoading } = useFullScreenLoading();

  useEffect(() => {
    showFullscreenLoading(gettingPlace);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gettingPlace]);

  return (
    <Screen>
      <View style={tw`flex-row px-16px items-center`}>
        <TouchableOpacity style={tw`mb-20px mr-16px`} onPress={() => navigation.goBack()}>
          <ArrowLeftSVG fill={tw.color('black')} />
        </TouchableOpacity>
        <View style={tw`flex-grow`}>
          <Input
            ref={inputRef as any}
            inputContainerStyle={tw`mb-0 border-0 border-b-0 bg-grayscale-bg`}
            leftIcon={<LocationSVG />}
            leftIconContainerStyle={tw`pr-8px`}
            clearButtonMode="always"
            value={input}
            onChangeText={setInput}
            placeholder="Tìm kiếm địa chỉ..."
            maxLength={255}
          />
        </View>
      </View>

      {searchingAutoComplete && <ActivityIndicator />}
      <ScrollView>
        {addresses.map((it, index, self) => (
          <Fragment key={it.place_id}>
            <TouchableOpacity
              style={tw`flex-row p-16px`}
              onPress={() =>
                getPlace({
                  variables: {
                    place_id: it.place_id,
                  },
                  onCompleted: async (res) => {
                    const data = await AsyncStorage.getItem(CACHE_LATEST_ADDRESS_LIST);

                    const list: SearchPlace[] = data != null ? JSON.parse(data) : [];

                    await AsyncStorage.setItem(
                      CACHE_LATEST_ADDRESS_LIST,
                      JSON.stringify(
                        [it, ...list]
                          .filter((item, ix, se) => se.findIndex((s) => s.place_id === item.place_id) === ix)
                          .slice(0, 5),
                      ),
                    );
                    navigation.navigate(AppRoutes.ADDRESS_MAP, {
                      onSelect: params.onSelect,
                      initial: res.getPlaceDetail,
                    });
                  },
                })
              }
            >
              <View
                style={tw`w-24px h-24px bg-primary-dark justify-center items-center mr-12px flex-shrink-0 rounded-full`}
              >
                <LocationSVG fill={tw.color('black')} />
              </View>
              <View style={tw`flex-grow flex-shrink`}>
                <Text style={tw`font-semibold`} numberOfLines={1}>
                  {it.name}
                </Text>
                <Text style={tw`text-13px mt-4px `} numberOfLines={1}>
                  {it.address}
                </Text>
              </View>
            </TouchableOpacity>
            {self[index + 1] != null && <Divider />}
          </Fragment>
        ))}
      </ScrollView>
    </Screen>
  );
});
