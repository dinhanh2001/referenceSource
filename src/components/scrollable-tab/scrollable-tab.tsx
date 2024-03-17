import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { memo, useCallback, useRef, useState } from 'react';

import { tw } from '../tw';
import { hitSlop } from '../../helpers';
import { DEVICE_WIDTH } from '../../utils';

type ScrollableTabProps<T> = {
  tabData: Array<T>;
  onChangeTab?: (val: any) => void;

  keyId?: string;
  keyLabel?: string;
  formatLabel?: (val: T) => string;
};

function _ScrollableTab<T>({ tabData = [], onChangeTab, keyId, keyLabel, formatLabel }: ScrollableTabProps<T>) {
  const [active, setActive] = useState<string>((keyId ? tabData[0]?.[keyId as keyof T] : tabData[0]) as string);
  const scrollRef = useRef<ScrollView>(null);
  const itemTabRef = useRef<Array<View | null>>([]);
  const scrollX = useRef<number>(0);

  const onChange = useCallback(
    (tab: T) => {
      const id = keyId ? tab[keyId as keyof T] : tab;
      setActive(id as string);
      onChangeTab?.(tab);
    },
    [keyId, onChangeTab],
  );

  const renderItem = useCallback(
    (dF: T, index: number) => {
      const id = keyId ? dF[keyId as keyof T] : dF;
      const label = formatLabel ? formatLabel(dF) : keyLabel ? dF[keyLabel as keyof T] : dF;
      const badge = dF?.['badge' as keyof T] as string;
      const isActive = id === active;

      return (
        <View key={id as string} style={tw`h-48px justify-center`} ref={(ref) => (itemTabRef.current[index] = ref)}>
          <TouchableOpacity
            hitSlop={hitSlop(10)}
            onPress={() => {
              if (isActive) {
                return;
              }
              itemTabRef?.current[index]?.measureInWindow((x, y, width) => {
                let distance = 0;
                if (x + width >= DEVICE_WIDTH / 2) {
                  distance = scrollX.current + DEVICE_WIDTH / 3;
                } else {
                  distance = scrollX.current - DEVICE_WIDTH / 3;
                }
                scrollRef.current?.scrollTo({ x: distance, y: 0, animated: true });
                scrollX.current = distance;
              });
              onChange(dF);
            }}
            style={[tw`mr-16px justify-center`, isActive && tw`bg-primary-light rounded-full px-8px h-30px`]}
          >
            <View style={tw`flex-row items-center`}>
              <Text style={[tw`text-grayscale-black text-14px font-normal`, isActive && tw`font-semibold`]}>
                {label as string}
              </Text>
              {badge &&
                (isActive ? (
                  <View style={tw`ml-6px h-20px w-20px bg-primary rounded-full items-center justify-center`}>
                    <Text style={tw`text-grayscale-black text-14px font-semibold`}>{badge}</Text>
                  </View>
                ) : (
                  <Text style={tw`text-grayscale-black text-14px font-normal ml-6px`}>({badge})</Text>
                ))}
            </View>
          </TouchableOpacity>
        </View>
      );
    },
    [active, formatLabel, keyId, keyLabel, onChange],
  );

  return (
    <View style={tw`shadow-md`}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-16px items-center h-[52px]`}
        onScrollEndDrag={(e) => {
          scrollX.current = e.nativeEvent.contentOffset.x;
        }}
        bounces={false}
      >
        {tabData.map(renderItem)}
      </ScrollView>
    </View>
  );
}

export const ScrollableTab = memo(_ScrollableTab) as typeof _ScrollableTab;
