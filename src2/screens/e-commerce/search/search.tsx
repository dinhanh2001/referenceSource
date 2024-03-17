import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AppHeader,
  ECommerceSearchExplore,
  ECommerceSearchSection,
  KeyboardAwareScrollViewComponent,
  tw,
} from '../../../components';
import { Space } from '../../../components/spacer';
import { CloseCircleCustomSVG, ManSVG, Protection, RefreshSVG, Trash } from '../../../svg';
import { KEY_STORAGE } from '../../../utils';
import { useUserSearchSuggestionsQuery } from '../../../graphql/queries/userSearchSuggestions.generated';
import { useDebounce } from '../../../hooks';

import { ECommerceSearchNavigationProp } from './type';

export const ECommerceSearch = () => {
  const navigation = useNavigation<ECommerceSearchNavigationProp>();

  const [input, setInput] = useState('');
  const [dataSearch, setDataSearch] = useState<string[]>([]);

  const debounceValue = useDebounce(input?.trim?.());

  const { data: dataSugestion } = useUserSearchSuggestionsQuery({
    variables: {
      search: debounceValue,
    },
  });
  const { data, refetch } = useUserSearchSuggestionsQuery();

  const getData = async () => {
    try {
      const res = await AsyncStorage.getItem(KEY_STORAGE.SEARCH_E_COMMERCE);
      if (res !== null) {
        setDataSearch(JSON.parse(res));
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSearch = useCallback(
    async (_search: string) => {
      const search = _search?.trim?.();
      if (search) {
        const newData = [
          search,
          ...(dataSearch?.filter?.((item: string) => item?.toLowerCase?.() !== search?.toLowerCase()) || []),
        ].slice(0, 5);
        await AsyncStorage.setItem(KEY_STORAGE.SEARCH_E_COMMERCE, JSON.stringify(newData));
        setDataSearch(newData);
        navigation.navigate('e-commerce/search-result', { search });
      }
    },
    [dataSearch, navigation],
  );

  const onClearSearchHistory = useCallback(() => {
    AsyncStorage.removeItem(KEY_STORAGE.SEARCH_E_COMMERCE);
    setDataSearch([]);
  }, []);

  const onRefreshSuggestion = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderInput = useMemo(
    () => (
      <View style={tw`flex-1 flex-row px-16px py-10px bg-grayscale-bg rounded-4px`}>
        <TextInput
          autoFocus
          placeholder={'|Nhập tên sản phẩm'}
          value={input}
          onChangeText={setInput}
          placeholderTextColor={tw.color('grayscale-disabled')}
          onSubmitEditing={() => onSearch(input)}
          style={tw`flex-1 text-14px`}
        />
        {!!input && (
          <TouchableOpacity onPress={() => setInput('')}>
            <CloseCircleCustomSVG fill={tw.color('grayscale-light')} />
          </TouchableOpacity>
        )}
      </View>
    ),
    [input, onSearch],
  );

  const renderContent = useMemo(() => {
    if (input) {
      return (
        <View style={tw`mx-4`}>
          {dataSugestion?.userSearchSuggestions?.map?.((item: string, idx: number) => (
            <TouchableOpacity key={idx} onPress={() => onSearch(item)}>
              <Text style={tw`my-12px`}>{item}</Text>
              <Space size={1} backgroundColor={'#EEE'} />
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return (
      <View style={tw`m-4`}>
        <ECommerceSearchSection
          title="Tìm kiếm gần đây"
          right={
            <TouchableOpacity onPress={onClearSearchHistory}>
              <Trash fill={tw.color('grayscale-gray')} />
            </TouchableOpacity>
          }
          data={dataSearch}
          collapse
          onPress={onSearch}
          containerStyle={tw`mb-7`}
        />
        <ECommerceSearchSection
          title="Đề xuất cho bạn"
          right={
            <TouchableOpacity style={tw`flex-row items-center`} onPress={onRefreshSuggestion}>
              <Text style={tw`text-grayscale-gray text-13px mr-2`}>Làm mới</Text>
              <RefreshSVG />
            </TouchableOpacity>
          }
          data={data?.userSearchSuggestions || []}
          onPress={onSearch}
        />
        <Space size={28} />
        <KeyboardAwareScrollViewComponent>
          <Text style={tw`font-semibold`}>Khám phá</Text>
          <View style={tw`flex-row mt-16px`}>
            <ECommerceSearchExplore label={'CALL ME\nkiểm định'} icon={<Protection width={32} height={32} />} />
            <Space size={16} horizontal />
            <ECommerceSearchExplore label={'Gian hàng\nUy tín'} icon={<ManSVG />} />
          </View>
        </KeyboardAwareScrollViewComponent>
      </View>
    );
  }, [
    data?.userSearchSuggestions,
    dataSearch,
    dataSugestion?.userSearchSuggestions,
    input,
    onClearSearchHistory,
    onRefreshSuggestion,
    onSearch,
  ]);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader centerView={renderInput} containerStyle={tw`justify-center items-center`} />
      <ScrollView>{renderContent}</ScrollView>
    </SafeAreaView>
  );
};
