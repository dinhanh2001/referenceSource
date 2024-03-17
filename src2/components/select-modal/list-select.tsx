import { View, Text, TouchableOpacity, Pressable, SafeAreaView, ActivityIndicator, Keyboard } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlashList } from '@shopify/flash-list';

import { tw } from '../tw';
import { TextInput } from '../text-input';
import { ArrowDown, CloseSvg, EmptyListSvg } from '../../svg';
import { RNModal } from '../rn-modal';
import { CategoryEntity, CategoryTypeEnum } from '../../graphql/type.interface';
import { useCategoriesQuery } from '../../graphql/queries/categories.generated';
import { normalizeSearch, showFlashMessageError } from '../../helpers';
import { EmptyView } from '../empty-view';

type ListSelectProps = {
  title?: string;
  categoryType: CategoryTypeEnum;
  searchPlaceholder?: string;
  value: CategoryEntity;
  placeholder?: string;
  onValueChange: (val: CategoryEntity) => void;
  errorMessage?: string;
};

export const ListSelect = React.memo(
  ({ categoryType, title, onValueChange, placeholder, value, errorMessage }: ListSelectProps) => {
    const [showSelect, setShowSelect] = useState(false);
    const { control, watch } = useForm<{ text: string }>({
      mode: 'onChange',
    });
    const text = watch('text');

    const { data, loading } = useCategoriesQuery({
      variables: {
        limit: 1000,
        page: 1,
        type: categoryType,
      },
      fetchPolicy: 'cache-first',
      skip: !categoryType,
      onError: showFlashMessageError,
    });

    const filteredData = useMemo(() => {
      if (!text) return data?.categories?.items;
      return data?.categories.items?.filter((d) => normalizeSearch(d.name, text));
    }, [data, text]);

    const onOpen = useCallback(() => {
      Keyboard.dismiss();

      setShowSelect(true);
    }, [setShowSelect]);

    const onClose = useCallback(() => {
      setShowSelect(false);
    }, [setShowSelect]);

    const renderItem = useCallback(
      ({ item, index }: { item: CategoryEntity; index: number }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              onValueChange(item);
              setShowSelect(false);
            }}
            style={[
              tw`py-12px px-16px`,
              { backgroundColor: index % 2 === 0 ? tw.color('white') : tw.color('grayscale-bg') },
            ]}
          >
            <Text style={tw`text-grayscale-black text-14px`} numberOfLines={2}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      },
      [onValueChange],
    );

    const ListEmptyComponent = useMemo(() => {
      return <EmptyView icon={<EmptyListSvg />} text="Không tìm thấy kết quả" />;
    }, []);

    const renderValue = useMemo(() => {
      if (value) {
        return <Text style={tw`text-14px text-grayscale-black`}>{value.name}</Text>;
      }
      return <Text style={tw`text-14px text-grayscale-gray`}>{placeholder}</Text>;
    }, [value, placeholder]);

    return (
      <>
        <TouchableOpacity
          style={[
            tw`min-h-45px border rounded p-16px items-center flex-row justify-between`,
            { borderColor: errorMessage ? tw.color('error') : tw.color('border-grayscale-border') },
          ]}
          onPress={onOpen}
        >
          <Text style={tw`text-14px text-grayscale-gray mr-8px`}>{renderValue}</Text>
          <ArrowDown />
        </TouchableOpacity>
        {!!errorMessage && <Text style={tw`text-12px text-error mt-8px`}>{errorMessage}</Text>}
        <RNModal style={tw`bg-white`} isVisible={showSelect}>
          <SafeAreaView style={tw`flex-1`}>
            <View style={tw`flex-row items-center p-16px`}>
              <Pressable style={tw`mr-16px`} onPress={onClose}>
                <CloseSvg width={28} height={28} />
              </Pressable>
              <Controller
                name="text"
                control={control}
                render={({ field: { onChange, value: searchValue } }) => (
                  <View style={tw`flex-1`}>
                    <TextInput
                      inputContainerStyle={tw`bg-grayscale-bg`}
                      value={searchValue}
                      onChangeText={onChange}
                      clearButtonMode="while-editing"
                      renderErrorMessage={false}
                      placeholder={title}
                    />
                  </View>
                )}
              />
            </View>
            <FlashList
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={tw`py-32px`}
              data={filteredData || []}
              renderItem={renderItem}
              estimatedItemSize={42}
              ListEmptyComponent={ListEmptyComponent}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0.8}
              ListFooterComponent={loading ? <ActivityIndicator color={tw.color('primary')} /> : null}
            />
          </SafeAreaView>
        </RNModal>
      </>
    );
  },
);
