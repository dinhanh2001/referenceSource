import { useRoute } from '@react-navigation/native';
import { Button, Image } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { Linking, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  ActivityIndicator,
  AppHeader,
  ProductQuotationProductItem,
  RowMedia,
  Space,
  TextInput,
  tw,
} from '../../../components';
import { usePartnerProductQuotationQuery } from '../../../graphql/queries/partnerProductQuotation.generated';
import { Media, ProductEntity, ProductQuotationStatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { FormResponse, ProductQuotationDetailRouteProp } from './type';
import { useUpload } from './use-upload';
import { MAX_FILES, useSchema, useSubmitForm } from './use-form';

export const ProductQuotationDetailScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const {
    params: { id },
  } = useRoute<ProductQuotationDetailRouteProp>();

  const { upload } = useUpload();
  const { validationSchema } = useSchema();
  const { onSubmit } = useSubmitForm(id);

  const {
    trigger,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormResponse>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      response: '',
      medias: [],
    },
  });

  const mediasWatch = watch('medias');
  const errorFile = errors?.medias?.message;

  const { loading, data, refetch } = usePartnerProductQuotationQuery({
    variables: {
      id,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const { user, status } = data?.partnerProductQuotation || {};
  const isSent = status === ProductQuotationStatusEnum.SENT;

  const onViewMedia = useCallback(async (media?: Media) => {
    try {
      await Linking.openURL(media?.fullOriginalUrl as string);
    } catch (error) {
      showMessage({
        message: 'Không thể mở báo giá',
        type: 'danger',
      });
    }
  }, []);

  const onUpload = useCallback(
    () =>
      upload((res) => {
        setValue('medias', [...(mediasWatch || []), res]);
        trigger('medias');
      }),
    [mediasWatch, setValue, trigger, upload],
  );

  const renderMedia = useCallback(
    (media: Media) => (
      <RowMedia key={media?.id} label={isSent ? 'Tải lên' : 'Xem'} media={media} onPress={onViewMedia} />
    ),
    [isSent, onViewMedia],
  );

  const renderMediaUpload = useCallback(
    (media: Media, index: number) => (
      <RowMedia
        key={index}
        label={'Xóa'}
        media={media}
        onPress={() => {
          setValue(
            'medias',
            mediasWatch?.filter((_, i) => i !== index),
          );
          trigger('medias');
        }}
      />
    ),
    [mediasWatch, setValue, trigger],
  );

  const renderResponse = useMemo(() => {
    const { partner, response, updatedAt, medias } = data?.partnerProductQuotation || {};

    if (isSent) {
      return (
        <View style={tw`mt-4 bg-white p-3 rounded-1`}>
          <Controller
            name="response"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                inputContainerStyle={tw`h-14`}
                renderErrorMessage={false}
                placeholder="Nhập phản hồi..."
                multiline
                maxLength={1000}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors?.response?.message}
              />
            )}
          />

          {mediasWatch?.map?.(renderMediaUpload)}

          {mediasWatch?.length < MAX_FILES && (
            <TouchableOpacity style={tw`bg-primary py-7px px-4 rounded-1 mt-3 self-start`} onPress={onUpload}>
              <Text style={tw`font-semibold text-3 text-grayscale-black`}>Tải lên</Text>
            </TouchableOpacity>
          )}
          {errorFile != null && <Text style={tw`text-error text-12px mt-8px`}>{errorFile}</Text>}
          <Button
            title={'Gửi đi'}
            containerStyle={tw`self-end mt-3`}
            buttonStyle={tw`px-8`}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      );
    }

    return (
      <View style={tw`mt-4 bg-white p-3`}>
        <View style={tw`flex-row items-center mb-3`}>
          <Image source={{ uri: partner?.avatar?.fullThumbUrl as string }} style={tw`w-6 h-6 rounded-full`} />
          <View style={tw`flex-1 ml-2 `}>
            <Text numberOfLines={1} style={tw`font-semibold`}>
              {partner?.fullname}
            </Text>
          </View>
        </View>
        <Space size={1} backgroundColor={'#EEE'} />
        <View style={tw`mt-2 px-4 py-10px bg-grayscale-bg rounded-1`}>
          <Text style={tw`text-13px text-grayscale-black`}>{response}</Text>
        </View>
        <View>{medias?.map?.(renderMedia)}</View>
        <Text style={tw`text-right text-3 text-grayscale-gray mt-3`}>
          {dayjs(updatedAt).format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>
    );
  }, [
    control,
    data?.partnerProductQuotation,
    errorFile,
    errors?.response?.message,
    handleSubmit,
    isSent,
    mediasWatch,
    onSubmit,
    onUpload,
    renderMedia,
    renderMediaUpload,
  ]);

  const renderContent = useMemo(() => {
    const { product, quantity, detail, createdAt } = data?.partnerProductQuotation || {};

    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
        contentContainerStyle={tw`m-4 mb-${bottom + 20}px`}
      >
        <View style={tw`bg-white p-3 rounded-1`}>
          <ProductQuotationProductItem
            containerStyle={tw`mt-0`}
            product={product as ProductEntity}
            quantity={quantity as number}
          />
          <Space size={1} backgroundColor={'#EEE'} />
          <Text style={tw`mt-3 text-13px text-grayscale-gray`}>Yêu cầu chi tiết/Câu hỏi</Text>
          <View style={tw`mt-2 px-4 py-10px bg-grayscale-bg rounded-1`}>
            <Text style={tw`text-13px text-grayscale-black`}>{detail}</Text>
          </View>
          <Text style={tw`text-right text-3 text-grayscale-gray mt-3`}>
            {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>

        {renderResponse}
      </ScrollView>
    );
  }, [bottom, data?.partnerProductQuotation, isRefetchingByUser, refetchByUser, renderResponse]);

  const renderLoadingContent = useMemo(() => {
    if (loading) {
      return <ActivityIndicator />;
    }

    return <View style={tw`flex-1 bg-grayscale-bg`}>{renderContent}</View>;
  }, [loading, renderContent]);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader>
        <View style={tw`flex-row items-center flex-1`}>
          <Image source={{ uri: user?.avatar?.fullThumbUrl as string }} style={tw`w-6 h-6 rounded-full`} />
          <View style={tw`flex-1 ml-2 `}>
            <Text numberOfLines={1} style={tw`font-semibold`}>
              {user?.fullname}
            </Text>
          </View>
        </View>
      </AppHeader>
      {renderLoadingContent}
    </SafeAreaView>
  );
};
