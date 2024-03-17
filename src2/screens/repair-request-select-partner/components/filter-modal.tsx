import React, { memo, useCallback, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity, View } from 'react-native';
import { Button, Divider, Text } from '@rneui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Checkbox, tw } from '../../../components';
import { hitSlop } from '../../../helpers';
import { CloseSvg, MoneyOutlinedSVG, RoutingOutlinedSVG, StarOutlinedSVG } from '../../../svg';
import { PartnersForBookingQueryVariables } from '../../../graphql/queries/partnersForBooking.generated';
import { SortDirectionEnum } from '../../../graphql/type.interface';

export interface AgentFilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onFilterApplied: (filter: PartnersForBookingQueryVariables) => void;
  query: PartnersForBookingQueryVariables;
}

export enum AgentSortFilter {
  Suggested = 'Suggested',
  Distance = 'Distance',
  Rating = 'star',
  Cost = 'Cost',
}

export enum AgentSearchFilter {
  Agency = 'Agency',
  Technician = 'Technician',
}

export const sortItems = [
  {
    title: 'CALL ME đề xuất',
    value: AgentSortFilter.Suggested,
    icon: <StarOutlinedSVG width={24} height={24} />,
  },
  {
    title: 'Khoảng cách',
    value: AgentSortFilter.Distance,
    icon: <RoutingOutlinedSVG width={24} height={24} />,
  },
  {
    title: 'Đánh giá',
    value: AgentSortFilter.Rating,
    icon: <StarOutlinedSVG width={24} height={24} />,
  },
  {
    title: 'Chi phí',
    value: AgentSortFilter.Cost,
    icon: <MoneyOutlinedSVG width={24} height={24} />,
  },
];

export const searchFilterItems = [
  {
    title: 'Đơn vị sửa chữa là Đại lý',
    value: AgentSearchFilter.Agency,
  },
  {
    title: 'Đơn vị sửa chữa là Cá nhân',
    value: AgentSearchFilter.Technician,
  },
];

type State = Partial<PartnersForBookingQueryVariables> & {
  searchTypes?: AgentSearchFilter[];
  sortType?: AgentSortFilter;
};

const transformer = (query: PartnersForBookingQueryVariables): State =>
  ({
    ...query,
    searchTypes: [
      query.isAgency ? AgentSearchFilter.Agency : null,
      query.isTechnician ? AgentSearchFilter.Technician : null,
    ].filter((it) => it !== null),
    sortType:
      query.sortBy?.distance != null
        ? AgentSortFilter.Distance
        : query.sortBy?.suggestionPoint != null
        ? AgentSortFilter.Suggested
        : query.sortBy?.star != null
        ? AgentSortFilter.Rating
        : undefined,
  } as State);

export const AgentFilterModal = memo(({ isVisible, onClose, onFilterApplied, query }: AgentFilterModalProps) => {
  const { bottom } = useSafeAreaInsets();

  const [state, setState] = useState<State>(transformer(query));

  useEffect(() => {
    if (isVisible) {
      setState(transformer(query));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const onTapConfirmButton = useCallback(() => {
    const isAgency = state.searchTypes?.includes(AgentSearchFilter.Agency);
    const isTechnician = state.searchTypes?.includes(AgentSearchFilter.Technician);

    const sortDes = [
      state.sortType === AgentSortFilter.Distance
        ? 'Khoảng cách'
        : state.sortType === AgentSortFilter.Suggested
        ? 'CALL ME đề xuất'
        : state.sortType === AgentSortFilter.Rating
        ? 'Đánh giá'
        : state.sortType === AgentSortFilter.Cost
        ? 'Chi phí'
        : null,
      isAgency ? 'Đại lý' : null,
      isTechnician ? 'KTV' : null,
    ].filter((it) => it != null);

    onFilterApplied({
      ...state,
      isAgency: isAgency,
      isTechnician: isTechnician,
      sortBy:
        state.sortType === AgentSortFilter.Distance || state.sortType === AgentSortFilter.Cost
          ? {
              distance: SortDirectionEnum.ASC,
            }
          : state.sortType === AgentSortFilter.Suggested
          ? {
              suggestionPoint: SortDirectionEnum.DESC,
            }
          : state.sortType === AgentSortFilter.Rating
          ? {
              star: SortDirectionEnum.DESC,
            }
          : undefined,
      settingDescription: sortDes.length > 0 ? 'Lọc theo ' + sortDes.join(', ') : undefined,
    } as PartnersForBookingQueryVariables);
    onClose();
  }, [onClose, onFilterApplied, state]);

  const inset = useSafeAreaInsets();

  return (
    <Modal
      isVisible={isVisible}
      style={[
        tw`flex-1 bg-white m-0 justify-start`,
        {
          paddingTop: inset.top,
        },
      ]}
    >
      <View style={tw`p-4`}>
        <View style={tw`flex flex-row gap-4 mt-2 items-center`}>
          <TouchableOpacity hitSlop={hitSlop(4)} onPress={onClose} activeOpacity={0.5}>
            <CloseSvg width={24} height={24} />
          </TouchableOpacity>
          <Text style={tw`text-base font-bold`}>Bộ lọc</Text>
        </View>
        <View>
          {sortItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.value != null) {
                  setState((cur) => ({
                    ...cur,
                    sortType: cur.sortType === item.value ? undefined : item.value,
                  }));
                }
              }}
              disabled={item.value == null}
              style={[tw`flex flex-row gap-4 pt-4`, item.value == null && tw`opacity-60`]}
            >
              <View>{item.icon}</View>
              <View style={tw`flex-1 flex flex-row border-b border-grayscale-border items-center pb-4`}>
                <Text style={tw`flex-1`}>{item.title}</Text>
                <Checkbox isRadioCheckbox controlled checked={item.value != null && item.value === state.sortType} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Divider style={tw`h-4px bg-grayscale-border`} />
      <View style={tw`px-4 py-4`}>
        {searchFilterItems.map((item, index) => {
          const isLastItem = index === searchFilterItems.length - 1;
          return (
            <TouchableOpacity
              onPress={() =>
                setState((cur) => ({
                  ...cur,
                  searchTypes: cur.searchTypes?.includes(item.value)
                    ? cur.searchTypes.filter((it) => it !== item.value)
                    : [...(cur.searchTypes ?? []), item.value],
                }))
              }
              style={tw`flex flex-row gap-4 pb-4`}
              key={item.value}
              activeOpacity={0.5}
            >
              <Checkbox controlled checked={state.searchTypes?.includes(item.value)} />
              <View style={[tw`flex-1`, !isLastItem ? tw`border-b border-grayscale-border pb-4` : undefined]}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={tw`flex-1`} />
      <View style={tw`flex flex-row gap-2 mb-4 px-4 pb-${bottom}px`}>
        <Button
          onPress={() => setState({})}
          containerStyle={tw`flex-1`}
          buttonStyle={tw`bg-white border border-grayscale-disabled`}
          title="Làm lại"
        />
        <Button onPress={onTapConfirmButton} containerStyle={tw`flex-1`} title="Xem kết quả" />
      </View>
    </Modal>
  );
});
