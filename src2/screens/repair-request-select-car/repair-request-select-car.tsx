import { memo, useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppStackNavigatorParamList } from '../../navigator-params';
import { AppHeader, SearchInputHeader, tw, Screen, InfinityMyVehicleList } from '../../components';
import { CloseSvg, InfoCircleIcon, SearchNormalSvg } from '../../svg';
import { hitSlop } from '../../helpers';
import { useDebounce } from '../../hooks';
import { VehicleEntity } from '../../graphql/type.interface';

export const RepairRequestSelectCarScreen = memo(() => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();
  const { bottom } = useSafeAreaInsets();
  const {
    params: {
      isActive,
      onSelect,
      selectedVehicle: initVehicle,
      onQuickAddVehicle,
      quickAddData,
      title,
      excludes,
      textEmpty,
      hideQuickAdd,
    },
  } = useRoute<RouteProp<AppStackNavigatorParamList, 'repair-request/select-car'>>();

  const [showSearchInput, setShowSearchInput] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleEntity | undefined>(initVehicle);

  const [search, setSearch] = useState<string>();

  function onTapSearchIcon() {
    setShowSearchInput(true);
  }

  function onTapLeftIconSearchInput() {
    setSearch(undefined);
    setShowSearchInput(false);
  }

  const onTapContinue = useCallback(() => {
    selectedVehicle && onSelect(selectedVehicle);
    navigation.goBack();
  }, [navigation, onSelect, selectedVehicle]);

  const searchDebounce = useDebounce(search);

  const EmptyComponent = useMemo(() => {
    return (
      <View style={tw`flex-1 items-center p-24px`}>
        <InfoCircleIcon />
        <Text style={tw`text-17px font-semibold mt-24px`}>Bạn chưa có xe nào</Text>
        <Text style={tw`text-14px leading-20px text-grayscale-gray mt-12px text-center`}>
          {textEmpty ?? 'Bạn cần thêm máy/xe của mình trước khi tạo một Yêu cầu sửa chữa'}
        </Text>
        {!hideQuickAdd && (
          <Button
            onPress={() => {
              navigation.navigate('repair-request/select-car/quick-add', {
                quickAddData: quickAddData,
                onQuickAddVehicle: onQuickAddVehicle,
              });
            }}
            title={'Thêm xe nhanh'}
            style={tw`w-160px mt-16px`}
            type="outline"
            buttonStyle={tw`h-40px border-grayscale-disabled`}
          />
        )}
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title={'Đóng'}
          style={tw`w-160px mt-12px`}
          buttonStyle={tw`h-40px`}
        />
      </View>
    );
  }, [hideQuickAdd, navigation, onQuickAddVehicle, quickAddData, textEmpty]);

  return (
    <View style={tw`flex-1`}>
      <Screen edges={['top']}>
        <View>
          {showSearchInput ? (
            <SearchInputHeader
              placeholder="Nhập tên xe, nhãn hiệu, model,..."
              onTapLeftIcon={onTapLeftIconSearchInput}
              onChangeText={setSearch}
            />
          ) : (
            <AppHeader
              leftIcon={<CloseSvg width={24} height={24} />}
              title={title ?? 'Chọn xe gặp sự cố'}
              rightView={
                <TouchableOpacity onPress={onTapSearchIcon} hitSlop={hitSlop(4)} activeOpacity={0.5}>
                  <SearchNormalSvg />
                </TouchableOpacity>
              }
            />
          )}
        </View>

        <InfinityMyVehicleList
          viewType="LIST"
          listHeaderShown={false}
          searchFilter={searchDebounce}
          selectedVehicle={selectedVehicle}
          onVehiclePress={setSelectedVehicle}
          EmptyComponent={EmptyComponent}
          excludes={excludes}
          isActive={isActive}
        />

        <View style={tw`p-4 mb-${bottom}px`}>
          <Button onPress={onTapContinue} title="Tiếp tục" disabled={selectedVehicle == null} />
        </View>
      </Screen>
    </View>
  );
});
