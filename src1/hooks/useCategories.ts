import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesSelectors } from 'store/categories';
import * as CategoriesActions from 'store/categories';
import * as CategoriesReducer from 'store/categories/Reducer';
import {
  IExtraFood,
  IFood,
  IFoodCatalog,
  IHomeActionPayload,
  IListFoodParams,
  IPage,
  IPromotion,
  IRestaurantDetail,
} from 'types';

import { API_ENDPOINT, axiosClient } from 'utils';
import { useLocation } from 'hooks/useLocation';
// import { useLocation } from './useLocation';
export const useCategories = (key = '') => {
  const dispatch = useDispatch();
  const { locationUser } = useLocation();
  const loading = useSelector(CategoriesSelectors.getLoading);
  const listRestaurants: null | { result: IRestaurantDetail[] } = useSelector(
    CategoriesSelectors.getAttrByKey('listRestaurants'),
  ) as any;
  const detailRestaurant = useSelector(
    CategoriesSelectors.getAttrByKey('detailRestaurant'),
  ) as IRestaurantDetail;
  const listFoodCatalog = useSelector(
    CategoriesSelectors.getAttrByKey('listFoodCatalog'),
  ) as IFoodCatalog[];
  const listFoods = useSelector(
    CategoriesSelectors.getAttrByKey('listFoods'),
  ) as IFood[];
  const listDiscoutFood = useSelector(
    CategoriesSelectors.getAttrByKey('listDiscoutFood'),
  ) as IFood[];
  const listExtraFood = useSelector(
    CategoriesSelectors.getAttrByKey('listExtraFood'),
  ) as IExtraFood;
  const selectedPromos = useSelector(
    CategoriesSelectors.getAttrByKey('selectedPromos'),
  ) as IPromotion[];

  const [estimatedPrice, setEstimatedPrice] = useState<any>();

  const estimatePrices = useCallback(
    async (data: any) => {
      const result = await axiosClient.post(
        key === 'Snack'
          ? API_ENDPOINT.CATEGORY_SNACK.CALCULATE_PRICE
          : API_ENDPOINT.CATEGORY.CALCULATE_PRICE,
        data,
      );

      setEstimatedPrice(result);
    },
    [setEstimatedPrice],
  );

  const setSelectedPromos = useCallback(
    (selected: IPromotion[]) => {
      dispatch(
        CategoriesReducer.setSelectedPromos({ selectedPromos: selected }),
      );
    },
    [dispatch],
  );
  const getListRestaurants = useCallback(
    ({ ...rest }: IPage, cb?: IHomeActionPayload['callback']) => {
      console.log(rest, locationUser);
      dispatch(
        CategoriesActions.getBaseActionsRequest(
          {
            dataKey: 'listRestaurants',
            endPoint:
              key === 'Snack'
                ? API_ENDPOINT.CATEGORY_SNACK.RESTAURANT
                : API_ENDPOINT.CATEGORY.RESTAURANT,
            isPaginate: true,

            // Hardcode for location because api just show with these paramsß
            // params: { ...locationUser, ...rest },
            params: {
              // long: 106.64354939796388,
              // lat: 10.864089278331392,
              ...locationUser,
              ...rest,
            },
          },
          cb,
        ),
      );
    },
    [dispatch],
  );

  const getDetailRestaurant = useCallback(
    (restaurantId: string, cb) => {
      dispatch(
        CategoriesActions.getBaseActionsRequest(
          {
            dataKey: 'detailRestaurant',
            endPoint:
              key === 'Snack'
                ? `${API_ENDPOINT.CATEGORY_SNACK.DETAIL_RESTAURANT}/${restaurantId}`
                : `${API_ENDPOINT.CATEGORY.DETAIL_RESTAURANT}/${restaurantId}`,
            isObject: true,
            type: CategoriesActions.CategoriesActions.GET_DETAIL_RESTAURANT,
          },
          cb,
        ),
      );
    },
    [dispatch],
  );

  const getListFoodCatalog = useCallback((restaurantId: string) => {
    dispatch(
      CategoriesActions.getBaseActionsRequest({
        dataKey: 'listFoodCatalog',
        endPoint:
          key === 'Snack'
            ? `${API_ENDPOINT.CATEGORY_SNACK.LIST_FOOD_CATALOG}/${restaurantId}`
            : API_ENDPOINT.CATEGORY.LIST_FOOD_CATALOG + `/${restaurantId}`,
        type: CategoriesActions.CategoriesActions.GET_LIST_CATALOG_FOOD,
      }),
    );
  }, []);

  const getListFoods = useCallback(
    ({ ...rest }: IListFoodParams, cb?: IHomeActionPayload['callback']) => {
      dispatch(
        CategoriesActions.getBaseActionsRequest(
          {
            endPoint:
              key === 'Snack'
                ? API_ENDPOINT.CATEGORY_SNACK.LIST_FOOD
                : API_ENDPOINT.CATEGORY.LIST_FOOD,
            params: { ...rest },
            dataKey: 'listFoods',
            type: CategoriesActions.CategoriesActions.GET_LIST_FOOD,
          },
          cb,
        ),
      );
    },
    [],
  );

  const getListDiscountFood = useCallback((rest, cb) => {
    dispatch(
      CategoriesActions.getBaseActionsRequest(
        {
          endPoint: API_ENDPOINT.CATEGORY.LIST_DISCOUNT_FOOD,
          params: { ...rest },
          dataKey: 'listDiscoutFood',
          type: CategoriesActions.CategoriesActions.GET_LIST_DISCOUNT_FOOD,
        },
        cb,
      ),
    );
  }, []);

  const getExtraFood = useCallback((foodId: string) => {
    dispatch(
      CategoriesActions.getBaseActionsRequest({
        endPoint:
          key === 'Snack'
            ? `${API_ENDPOINT.CATEGORY.EXTRA_FOOD}/${foodId}`
            : API_ENDPOINT.CATEGORY.EXTRA_FOOD + `/${foodId}`,
        dataKey: 'listExtraFood',
        isObject: true,
      }),
    );
  }, []);

  return {
    detailRestaurant,
    listFoodCatalog,
    listFoods,
    listExtraFood,
    listRestaurants:
      listRestaurants && listRestaurants?.result ? listRestaurants?.result : [],
    selectedPromos,
    loading,
    estimatedPrice,
    listDiscoutFood,
    getListRestaurants,
    getDetailRestaurant,
    getListFoodCatalog,
    getListFoods,
    getExtraFood,
    setSelectedPromos,
    estimatePrices,
    getListDiscountFood,
  };
};
