import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItemCheckBox } from '@rneui/base/dist/ListItem/ListItem.CheckBox';
import { Button, Text } from '@rneui/themed';
import { memo, useCallback, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthStackNavigatorParamList, AppRoutes } from '../../../navigator-params';
import { useBackHandler } from '../../../hooks';
import { ActivityIndicator, tw } from '../../../components';
import { CheckSVG, Empty1 } from '../../../svg';
import { useCategoriesQuery } from '../../../graphql/queries/categories.generated';
import { CategoryEntity, CategoryTypeEnum } from '../../../graphql/type.interface';

type ScreenRouteProp = RouteProp<AuthStackNavigatorParamList, AppRoutes.QUALIFICATION_SELECTOR>;
type ScreenNavigationProp = StackNavigationProp<AuthStackNavigatorParamList>;

export const QualificationSelectorScreen = memo(() => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { params: routeParams } = useRoute<ScreenRouteProp>();

  const { data, loading } = useCategoriesQuery({
    variables: {
      type: CategoryTypeEnum.QUALIFICATION,
      limit: 1000,
      page: 1,
    },
    fetchPolicy: 'cache-first',
  });

  const [selectedIndices, setSelectedIndices] = useState<CategoryEntity[]>(routeParams?.selectedQualifications ?? []);

  useBackHandler(() => true);

  const onCompleted = useCallback(() => {
    routeParams?.onSelect(selectedIndices);
    navigation.pop();
  }, [navigation, routeParams, selectedIndices]);

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={tw`flex-1 px-16px mb-${bottom}px`}>
      <FlatList
        data={data?.categories.items ?? []}
        style={tw`mt-8px flex-1`}
        ListEmptyComponent={() => (loading ? <ActivityIndicator /> : <Empty1 />)}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={tw`flex-row items-center justify-between py-12px flex-1 
              ${data?.categories.items?.[index + 1] ? '' : 'border-b border-grayscale-border'}`}
              onPress={() =>
                setSelectedIndices((prev) =>
                  prev.some((it) => it.id === item.id) ? prev.filter((it) => it.id !== item.id) : [...prev, item],
                )
              }
            >
              <Text>{item.name}</Text>
              <ListItemCheckBox
                checked={selectedIndices.some((it) => it.id === item.id)}
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

      <View style={tw`w-full flex-row items-center`}>
        <Button
          title={'Làm lại'}
          containerStyle={tw`flex-1 mr-5px border border-grayscale-gray rounded`}
          buttonStyle={tw`bg-transparent`}
          onPress={() => setSelectedIndices([])}
        />
        <Button
          title={'Xác nhận'}
          disabled={selectedIndices.length === 0}
          containerStyle={tw`flex-1 mr-5px`}
          onPress={onCompleted}
        />
      </View>
    </View>
  );
});
