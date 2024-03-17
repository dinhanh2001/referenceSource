import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { ActivityIndicator, tw } from '../../../components';
import { useCategoriesQuery } from '../../../graphql/queries/categories.generated';
import { CategoryTypeEnum } from '../../../graphql/type.interface';

type Props = {
  value?: string | null;
  containerStyle?: ViewStyle;
  onSelectionChanged: (value: string) => void;
};

export const EducationSelector: React.FC<Props> = memo(({ value, containerStyle, onSelectionChanged }: Props) => {
  const { data, loading } = useCategoriesQuery({
    variables: {
      type: CategoryTypeEnum.EDUCATION,
      limit: 1000,
      page: 1,
    },
    fetchPolicy: 'cache-first',
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {loading && <ActivityIndicator />}
      {data?.categories.items?.map((item) => (
        <Pressable
          style={tw`border rounded mr-8px mb-8px px-12px py-8px
          bg-${value === item.id ? 'gray-50' : 'transparent'} 
          border-${value === item.id ? 'gray-800' : 'gray-100'}
          `}
          key={item.id}
          onPress={() => onSelectionChanged(item.id)}
        >
          <Text style={tw`text-[${value === item.id ? '#202C38' : '#676E72'}]`}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
