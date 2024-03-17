import { Text } from '@rneui/themed';
import { Control, Controller, FieldErrors, UseFormTrigger } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { tw } from '../tw';
import { LatLng } from '../../graphql/type.interface';
import { AddressStackNavigatorParamList, AppRoutes } from '../../navigator-params';
import { TextInput } from '../text-input';
import { ArrowDownSVG } from '../../svg';

export type AddressGroupFormState = {
  address: LatLng & {
    mapAddress: string;
  };
  addressDetail: string;
};

type Props = {
  control: Control<AddressGroupFormState>;
  errors: FieldErrors<AddressGroupFormState>;
  trigger?: UseFormTrigger<AddressGroupFormState>;
  label: string;
};

export const AddressGroupInput = ({ control, label, errors, trigger }: Props) => {
  const navigation = useNavigation<NavigationProp<AddressStackNavigatorParamList>>();

  return (
    <>
      <Text style={tw`text-14px font-medium mb-8px`}>
        <Text style={tw`text-error`}>* </Text>
        {label}
      </Text>
      <Controller
        name="address"
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(AppRoutes.ADDRESS_AUTOCOMPLETE, {
                  onSelect: (data) => {
                    onChange(data);
                    trigger?.('address');
                  },
                })
              }
            >
              <View pointerEvents="none">
                <TextInput
                  maxLength={255}
                  placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                  value={value?.mapAddress}
                  rightIcon={<ArrowDownSVG />}
                  errorMessage={errors.address?.message ?? errors.address?.mapAddress?.message}
                />
              </View>
            </TouchableOpacity>
          </>
        )}
      />
      <Controller
        name="addressDetail"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            maxLength={1000}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Tên đường, Tên công trình, Tòa nhà, Số nhà"
            errorMessage={errors.addressDetail?.message}
          />
        )}
      />
    </>
  );
};
