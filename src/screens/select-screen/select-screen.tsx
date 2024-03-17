import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItemCheckBox } from '@rneui/base/dist/ListItem/ListItem.CheckBox';
import { Button, Text } from '@rneui/themed';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tw } from '../../components';
import { AppRoutes, RootNavigatorParamList } from '../../navigator-params';
import { CheckSVG } from '../../svg';

type ScreenRouteProp = RouteProp<RootNavigatorParamList, AppRoutes.SELECT>;
type ScreenNavigationProp = StackNavigationProp<RootNavigatorParamList>;

export const SelectScreen = memo(() => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    params: { title, value, options, multiple, onSelect, isSearchable },
  } = useRoute<ScreenRouteProp>();

  const [search, setSearch] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, title]);

  const [internalValue, setInternalValue] = useState<string[]>(
    (multiple ? value ?? [] : value ? [value] : []) as string[],
  );

  const onCompleted = useCallback(() => {
    const selectValue = multiple ? internalValue : internalValue[0];
    onSelect(selectValue as any);
    navigation.pop();
  }, [internalValue, multiple, navigation, onSelect]);

  const handleChecked = useCallback(
    (item: { label: string; value: string }) => {
      if (multiple) {
        setInternalValue((prev) =>
          prev.some((it) => it === item.value) ? prev.filter((it) => it !== item.value) : [...prev, item.value],
        );
      } else {
        setInternalValue([item.value]);
      }
    },
    [multiple],
  );

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={tw`flex-1  mb-${bottom}px`}>
      {isSearchable && (
        <View style={tw`mt-2 mx-4 bg-grayscale-bg rounded-1`}>
          <TextInput placeholder="Nhập tìm kiếm..." style={tw`py-3 px-4`} value={search} onChangeText={setSearch} />
        </View>
      )}
      <FlatList
        data={isSearchable ? options?.filter((it) => it.label.toLowerCase().includes(search.toLowerCase())) : options}
        contentContainerStyle={tw`p-16px`}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={item.value}
              style={tw`flex-row items-center justify-between py-12px ${
                options[index + 1] ? 'border-b border-grayscale-border' : ''
              }`}
              onPress={() => handleChecked(item)}
            >
              <View style={tw`flex-1 mr-20px`}>
                <Text>{item.label}</Text>
              </View>
              <ListItemCheckBox
                onPress={() => handleChecked(item)}
                checked={internalValue.some((it) => it === item.value)}
                checkedIcon={
                  <View style={tw`w-20px h-20px rounded-2px flex justify-center items-center bg-primary`}>
                    <CheckSVG />
                  </View>
                }
                uncheckedIcon={<View style={tw`w-20px h-20px rounded-2px border border-grayscale-gray`} />}
                containerStyle={tw`m-0 p-0`}
              />
            </TouchableOpacity>
          );
        }}
      />

      <View style={tw`w-full flex-row items-center p-16px`}>
        <Button
          title={'Làm lại'}
          containerStyle={tw`flex-1 mr-8px`}
          buttonStyle={tw`border-grayscale-black`}
          onPress={() => setInternalValue([])}
          type="outline"
        />
        <Button
          title={'Xác nhận'}
          disabled={internalValue.length === 0}
          containerStyle={tw`flex-1 ml-8px`}
          onPress={onCompleted}
        />
      </View>
    </View>
  );
});
