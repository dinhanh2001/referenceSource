import { memo, useCallback, useMemo, useState } from 'react';
import { LayoutAnimation, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, tw } from '../../components';
import { ArrowLeftSVG, BookSavedSVG, SearchNormalSVG } from '../../svg';
import { useDebounce } from '../../hooks';

import { InfiniteCourses } from './infinite-course';

export const CourseScreen = memo(() => {
  const { top } = useSafeAreaInsets();

  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');

  const searchDebounce = useDebounce(search);

  const toggleSearch = useCallback((value: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSearch(value);
    setSearch('');
  }, []);

  const rightViewHeader = useMemo(
    () => (
      <TouchableOpacity style={tw`bg-white flex-row items-center rounded-3xl px-3 py-2`}>
        <BookSavedSVG width={16} height={16} fill={'black'} style={tw`px-1 w-3`} />
        <Text style={tw`ml-2`}>Ghi danh </Text>
        <Text>(0)</Text>
      </TouchableOpacity>
    ),
    [],
  );

  const renderHeader = useMemo(() => {
    if (isSearch) {
      return (
        <View style={tw`flex-row items-center mx-4 mt-${top}px`}>
          <TouchableOpacity
            hitSlop={{ bottom: 10, top: 10, left: 10, right: 10 }}
            onPress={() => {
              toggleSearch(false);
            }}
          >
            <ArrowLeftSVG />
          </TouchableOpacity>
          <View style={tw`flex-1`}>
            <TextInput
              autoFocus
              placeholder="Tìm theo tên khoá học, giảng viên"
              style={tw`bg-grayscale-bg px-5 py-2 rounded  ml-3`}
              value={search}
              onChangeText={setSearch}
              placeholderTextColor={tw.color('grayscale-disabled')}
            />
          </View>
        </View>
      );
    }

    return (
      <>
        <View style={tw`pb-8 bg-primary pt-${top}px`}>
          <AppHeader title="Khóa học" rightView={rightViewHeader} />
        </View>
        <TouchableOpacity
          style={tw`flex-row items-center bg-white mx-20px h-12 rounded-md pl-4 -mt-6 z-10 shadow-xl`}
          activeOpacity={0.8}
          onPress={() => toggleSearch(true)}
        >
          <SearchNormalSVG />
          <Text style={tw`ml-2 text-grayscale-gray`}>Tìm theo tên khóa học, giảng viên</Text>
        </TouchableOpacity>
      </>
    );
  }, [isSearch, top, rightViewHeader, search, toggleSearch]);

  return (
    <View style={tw`flex-1`}>
      {renderHeader}
      <InfiniteCourses search={searchDebounce} />
    </View>
  );
});
