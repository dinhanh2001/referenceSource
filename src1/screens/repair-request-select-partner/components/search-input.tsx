import { memo } from 'react';
import { View } from 'react-native';

import { ChipButton, TextInput, tw } from '../../../components';
import { CloseSvg, SearchNormalSvg } from '../../../svg';
import { useToggle } from '../../../hooks';

export const SearchInput = memo(() => {
  const [open, toggleOpen] = useToggle();

  if (open) {
    return (
      <View style={tw`flex-1 gap-2 flex-row w-full`}>
        <TextInput placeholder="Tìm kiếm..." containerStyle={tw`mb-0`} />
        <CloseSvg width={24} height={24} onPress={() => toggleOpen()} />
      </View>
    );
  }

  return (
    <ChipButton text="Tìm kiếm" leftIcon={<SearchNormalSvg width={16} height={16} />} onPress={() => toggleOpen()} />
  );
});
