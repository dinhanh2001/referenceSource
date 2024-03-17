import React, { memo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { AppStackNavigatorParamList } from '../../navigator-params';
import { AppHeader, SearchInputHeader, tw, Screen, Checkbox } from '../../components';
import { CloseSvg, SearchNormalSvg } from '../../svg';
import { hitSlop, normalizeSearch } from '../../helpers';

export const RepairRequestSelectProblemScreen = memo(() => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();
  const {
    params: { initialIds, onSelect, options },
  } = useRoute<RouteProp<AppStackNavigatorParamList, 'repair-request/select-problem'>>();

  const [search, setSearch] = useState('');

  const [showSearchInput, setShowSearchInput] = React.useState(false);

  const [selectedItems, setSelectedItems] = useState<string[]>(initialIds ?? []);

  function onTapSearchIcon() {
    setShowSearchInput(true);
  }

  function onTapLeftIconSearchInput() {
    setSearch('');
    setShowSearchInput(false);
  }

  function onTapContinue() {
    onSelect(selectedItems);
    navigation.goBack();
  }

  return (
    <View style={tw`flex-1`}>
      <Screen edges={['top', 'bottom']}>
        {showSearchInput ? (
          <SearchInputHeader
            placeholder="Nhập tên hiện tượng"
            onChangeText={(text) => setSearch(text)}
            onTapLeftIcon={onTapLeftIconSearchInput}
          />
        ) : (
          <AppHeader
            leftIcon={<CloseSvg width={24} height={24} />}
            title="Hiện tượng hư hỏng"
            rightView={
              <TouchableOpacity onPress={onTapSearchIcon} hitSlop={hitSlop(4)} activeOpacity={0.5}>
                <SearchNormalSvg />
              </TouchableOpacity>
            }
          />
        )}

        <FlatList
          style={tw`mt-4 px-16px`}
          data={options.filter((it) => normalizeSearch(it.label, search))}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`rounded border border-grayscale-border p-4 flex flex-row items-center`}
              onPress={() =>
                setSelectedItems(
                  selectedItems.includes(item.value)
                    ? selectedItems.filter((it) => it !== item.value)
                    : [...selectedItems, item.value],
                )
              }
            >
              <View style={tw`flex-shrink flex-grow pr-4`}>
                <Text>{item.label}</Text>
              </View>
              <View style={tw`flex-shrink-0`}>
                <Checkbox value={selectedItems.includes(item.value)} />
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={tw`h-4`} />}
        />
        <View style={tw`p-4`}>
          <Button onPress={onTapContinue} title="Tiếp tục" />
        </View>
      </Screen>
    </View>
  );
});
