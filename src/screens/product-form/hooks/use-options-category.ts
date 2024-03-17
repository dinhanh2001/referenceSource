import { useMemo } from 'react';

import { useCategoriesQuery } from '../../../graphql/queries/categories.generated';
import { CategoryTypeEnum, StatusEnum } from '../../../graphql/type.interface';
import { showFlashMessageError } from '../../../helpers';

export const useOptionsCategory = () => {
  const { data: dataVehicleType } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.VEHICLE_TYPE,
      isActive: StatusEnum.ACTIVE,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });
  const { data: dataManufacturer } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.MANUFACTURER,
      isActive: StatusEnum.ACTIVE,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });
  const { data: dataModel } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.MODEL,
      isActive: StatusEnum.ACTIVE,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });
  const { data: dataOrigin } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.ORIGIN,
      isActive: StatusEnum.ACTIVE,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });
  const { data: dataProductUnit } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.PRODUCT_UNIT,
      isActive: StatusEnum.ACTIVE,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });

  const vehicleTypeOptions = useMemo(
    () =>
      dataVehicleType?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataVehicleType],
  );
  const manufacturerOptions = useMemo(
    () =>
      dataManufacturer?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataManufacturer],
  );
  const modelOptions = useMemo(
    () =>
      dataModel?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataModel],
  );
  const originOptions = useMemo(
    () =>
      dataOrigin?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataOrigin],
  );
  const productUniOptions = useMemo(
    () =>
      dataProductUnit?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataProductUnit],
  );
  const yearOptions = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const minYear = 1950;

    const arr = [];
    for (let index = minYear; index < year + 1; index++) {
      arr.push(index.toString());
    }
    return arr.reverse().map((it) => ({ value: it, label: it }));
  }, []);

  return {
    vehicleTypeOptions,
    manufacturerOptions,
    modelOptions,
    originOptions,
    productUniOptions,
    yearOptions,
  };
};

export const useOptionsCategoryAccessories = () => {
  const { data: dataOrigin } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.ORIGIN,
      isActive: StatusEnum.ACTIVE,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });
  const { data: dataProductUnit } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.PRODUCT_UNIT,
      isActive: StatusEnum.ACTIVE,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });
  const { data: dataPart } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.PART_OF_PRODUCT,
      isActive: StatusEnum.ACTIVE,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });

  const originOptions = useMemo(
    () =>
      dataOrigin?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataOrigin],
  );
  const productUniOptions = useMemo(
    () =>
      dataProductUnit?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataProductUnit],
  );
  const partOptions = useMemo(
    () =>
      dataPart?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataPart],
  );

  return {
    originOptions,
    productUniOptions,
    partOptions,
  };
};

export const useOptionsProductDevices = () => {
  const { data: dataVehicleType } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.VEHICLE_TYPE,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });
  const { data: dataManufacturer } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.MANUFACTURER,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });
  const { data: dataModel } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.MODEL,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });

  const vehicleTypeOptions = useMemo(
    () =>
      dataVehicleType?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataVehicleType],
  );
  const manufacturerOptions = useMemo(
    () =>
      dataManufacturer?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataManufacturer],
  );
  const modelOptions = useMemo(
    () =>
      dataModel?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataModel],
  );

  return {
    vehicleTypeOptions,
    manufacturerOptions,
    modelOptions,
  };
};

export const useOptionsPreview = () => {
  const { data: dataVehicleType } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.VEHICLE_TYPE,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });
  const { data: dataModel } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.MODEL,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });
  const { data: dataOrigin } = useCategoriesQuery({
    variables: {
      limit: 1000,
      page: 1,
      type: CategoryTypeEnum.ORIGIN,
    },
    fetchPolicy: 'cache-first',
    skip: false,
    onError: showFlashMessageError,
  });

  const vehicleTypeOptions = useMemo(
    () =>
      dataVehicleType?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataVehicleType],
  );
  const modelOptions = useMemo(
    () =>
      dataModel?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataModel],
  );
  const originOptions = useMemo(
    () =>
      dataOrigin?.categories.items?.map((it) => ({
        value: it.id,
        label: it.name,
      })) ?? [],
    [dataOrigin],
  );

  return {
    vehicleTypeOptions,
    modelOptions,
    originOptions,
  };
};
