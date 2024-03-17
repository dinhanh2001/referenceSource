import { IconName } from 'assets';
import { TextInputs, ViewCus } from 'components';
import { NavigationService, Routes } from 'navigation';
import React from 'react';
import { Colors } from 'theme';
import { styleSpacing } from 'utils';

interface IProps {}

const InputSearch: React.FC<IProps> = props => {
  return (
    <ViewCus f-1>
      <TextInputs
        rightIcon=""
        leftIcon={IconName.Search}
        leftIconColor={Colors.main}
        styleInput={[styleSpacing('px-8')]}
        style={[
          {
            height: 36,
            borderRadius: 33,
            borderWidth: 0,
            backgroundColor: Colors.white,
            paddingRight: 45,
          },
        ]}
        placeholder="Tìm kiếm..."
        onChangeText={text => props.onPress(text)}
        onSubmitEditing={({ nativeEvent: { text } }) =>
          NavigationService.navigate(Routes.Categories, {
            searchText: text,
          })
        }
        value={props.value}
      />
      <ViewCus style={{ position: 'absolute', right: 15, top: 7 }}>
        {props?.renderRight && props?.renderRight()}
      </ViewCus>
    </ViewCus>
  );
};

export default InputSearch;
