import { NavigationService, Routes } from 'navigation';
import { FindCarType } from './enum';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export interface ICategory {
  icon: string;
  queue_number: string;
  type: TTypeCategory;
  name: string;
  id: string;
  defaultIcon?: string;
  onPress?: () => void;
}
export interface IHomeState {
  loading: boolean;
  listCategories: any[];
  listPromotions: IPromotion[];
  listSuggests: any[];
  listRestaurantNearMe: any[];
  listMessageHistory: any[];
  infoUser: any;
}
export enum ETypeCategory {
  FOOD = 'FOOD',
  SNACK_FOOD = 'SNACK_FOOD',
  DRINK = 'DRINK',
  BOOKING = 'BOOKING',
  BUY_FOR_ME = 'BUY_FOR_ME',
  PROMOTION = 'PROMOTION',
  MOTORBIKE_BOOKING = 'MOTORBIKE_BOOKING',
  DELIVERY = 'DELIVERY',
  COSMETIC = 'COSMETIC',
  DOMESTIC_WOKER = 'DOMESTIC_WOKER',
  ALL = 'ALL',
  CARBOOKING = 'CAR_BOOKING',
  DRIVER_BOOKING = 'DRIVER_BOOKING',
  CARRENTAL = 'CAR_RENTAL',
  DELIVERYNATIONWIDE = 'DELIVERY_NATIONWIDE',
  TO_MARKET = 'TO_MARKET',
  HELP_HOME = 'HELP_HOME',
  TAKE_CARE = 'TAKE_CARE',
  BABY_SHOWER = 'BABY_SHOWER',
  NAILS = 'NAILS',
  PRIVATE_GUARDIAN = 'PRIVATE_GUARDIAN',
  CHEF = 'CHEF',
  MAKE_UP = 'MAKE_UP',
  TATTOO = 'TATTOO',
  AIR_CONDITION = 'AIR_CONDITION',
  WASHING = 'WASHING',
  HOUSE_CLEANING = 'HOUSE_CLEANING',
  COMPUTER = 'COMPUTER',
  DRAIN = 'DRAIN',
  FIX_LOCK = 'FIX_LOCK',
  REPAIRS = 'REPAIRS',
  RESCUE = 'RESCUE',
  FACTORY = 'FACTORY',
  WASH_SOFA = 'WASH_SOFA',
  WASH_CURTAINS = 'WASH_CURTAINS',
  CONSTRUCTION = 'CONSTRUCTION',
  DRAIN_2 = 'DRAIN_2',
  CLEAN_GLASSES = 'CLEAN_GLASSES',
  LINE_UP = 'LINE_UP',
  LAUNDRY = 'LAUNDRY',
  BOOKING_TABLE = 'BOOKING_TABLE',
}
export type TTypeCategory =
  | ETypeCategory.FOOD
  | ETypeCategory.DRINK
  | ETypeCategory.BOOKING
  | ETypeCategory.PROMOTION
  | ETypeCategory.MOTORBIKE_BOOKING
  | ETypeCategory.DELIVERY
  | ETypeCategory.COSMETIC
  | ETypeCategory.DOMESTIC_WOKER
  | ETypeCategory.ALL
  | ETypeCategory.CARBOOKING
  | ETypeCategory.DRIVER_BOOKING
  | ETypeCategory.CARRENTAL
  | ETypeCategory.DELIVERYNATIONWIDE
  | ETypeCategory.TO_MARKET
  | ETypeCategory.HELP_HOME
  | ETypeCategory.TAKE_CARE
  | ETypeCategory.NAILS
  | ETypeCategory.BABY_SHOWER
  | ETypeCategory.PRIVATE_GUARDIAN
  | ETypeCategory.CHEF
  | ETypeCategory.MAKE_UP
  | ETypeCategory.TATTOO
  | ETypeCategory.AIR_CONDITION
  | ETypeCategory.WASHING
  | ETypeCategory.HOUSE_CLEANING
  | ETypeCategory.COMPUTER
  | ETypeCategory.DRAIN
  | ETypeCategory.FIX_LOCK
  | ETypeCategory.REPAIRS
  | ETypeCategory.RESCUE
  | ETypeCategory.FACTORY
  | ETypeCategory.WASH_SOFA
  | ETypeCategory.WASH_CURTAINS
  | ETypeCategory.CONSTRUCTION
  | ETypeCategory.DRAIN_2
  | ETypeCategory.CLEAN_GLASSES
  | ETypeCategory.LINE_UP
  | ETypeCategory.BOOKING_TABLE
  | ETypeCategory.LAUNDRY;
interface ITypeCategory {
  icon: string;
  screen?: string;
  onPress?: () => void;
}
export const DATA_CATEGORY: Record<ETypeCategory, ITypeCategory> = {
  [ETypeCategory.FOOD]: {
    icon: 'giaodoan',
  },
  [ETypeCategory.SNACK_FOOD]: {
    icon: 'anvat',
    onPress: () => {
      Toast.show({
        text1: 'Tính năng đang được phát triển',
        position: 'top',
        type: 'error',
      });
    },
  },
  [ETypeCategory.DRINK]: {
    icon: 'drink1',
  },
  [ETypeCategory.BOOKING]: {
    icon: 'booking',
  },
  [ETypeCategory.PROMOTION]: {
    icon: 'promotion',
  },
  [ETypeCategory.MOTORBIKE_BOOKING]: {
    icon: 'xemay',
    onPress: () =>
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.MOTORBIKE,
        isShowRecentLocation: true,
      }),
  },
  [ETypeCategory.DELIVERY]: {
    icon: 'giaohang',
    onPress: () => NavigationService.navigate(Routes.RequestDelivery),
  },
  [ETypeCategory.COSMETIC]: {
    icon: 'comestic',
    onPress: () => {},
  },
  [ETypeCategory.DOMESTIC_WOKER]: {
    icon: 'houseHelper',
    onPress: () => {},
  },
  [ETypeCategory.ALL]: {
    icon: 'all',
    onPress: () => NavigationService.navigate(Routes.AllCategories),
  },
  [ETypeCategory.CARBOOKING]: {
    icon: 'oto',
    onPress: () =>
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR,
      }),
  },
  [ETypeCategory.DRIVER_BOOKING]: {
    icon: 'taixerieng',
    onPress: () =>
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        marker: 'chauffeur',
      }),
  },
  [ETypeCategory.CARRENTAL]: {
    icon: 'carRental',
    onPress: () => {
      NavigationService.navigate(Routes.VehicleRental);
    },
  },
  [ETypeCategory.TO_MARKET]: {
    icon: 'dicho',
    onPress: () => {
      Toast.show({
        text1: 'Tính năng đang được phát triển',
        position: 'top',
        type: 'error',
      });
    },
  },
  [ETypeCategory.BUY_FOR_ME]: {
    icon: 'muaho',
    onPress: () => {
      Toast.show({
        text1: 'Tính năng đang được phát triển',
        position: 'top',
        type: 'error',
      });
    },
  },
  [ETypeCategory.BOOKING_TABLE]: {
    icon: 'datban',
    onPress: () => {
      Toast.show({
        text1: 'Tính năng đang được phát triển',
        position: 'top',
        type: 'error',
      });
    },
  },
  [ETypeCategory.DELIVERYNATIONWIDE]: {
    icon: 'guiditinh',
    onPress: () => {
      NavigationService.navigate(Routes.DeliveryProvince);
    },
  },

  [ETypeCategory.HELP_HOME]: {
    icon: 'helpHome',
    onPress: () =>
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'giúp việc nhà',
        marker: 'personHelp',
      }),
  },
  [ETypeCategory.TAKE_CARE]: {
    icon: 'takeCare',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'chăm bệnh',
        marker: 'personHelp',
      });
    },
  },
  [ETypeCategory.BABY_SHOWER]: {
    icon: 'babyShower',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'tắm bé',
        marker: 'personHelp',
      });
    },
  },
  [ETypeCategory.PRIVATE_GUARDIAN]: {
    icon: 'privateGuardian',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'hộ lí riêng',
        marker: 'privateGuardianMarker',
      });
    },
  },
  [ETypeCategory.CHEF]: {
    icon: 'chef',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'đầu bếp',
        marker: 'chefMarker',
      });
    },
  },
  [ETypeCategory.NAILS]: {
    icon: 'nails',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'thợ nails',
        marker: 'personHelp',
      });
    },
  },
  [ETypeCategory.MAKE_UP]: {
    icon: 'makeUp',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'trang điểm',
        marker: 'personHelp',
      });
    },
  },
  [ETypeCategory.TATTOO]: {
    icon: 'tattoo',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'thợ xăm',
        marker: 'personHelp',
      });
    },
  },
  [ETypeCategory.AIR_CONDITION]: {
    icon: 'airCondition',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'thợ sửa máy lạnh',
        marker: 'repairerMarker',
      });
    },
  },
  [ETypeCategory.WASHING]: {
    icon: 'washing',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'thợ sửa máy giặt',
        marker: 'repairerMarker',
      });
    },
  },
  [ETypeCategory.HOUSE_CLEANING]: {
    icon: 'houseCleaning',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'dọn nhà',
        marker: 'repairerMarker',
      });
    },
  },
  [ETypeCategory.COMPUTER]: {
    icon: 'computer',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'thợ sửa máy tính',
        marker: 'repairerMarker',
      });
    },
  },
  [ETypeCategory.DRAIN]: {
    icon: 'drain',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'bốc xếp',
        marker: 'repairerMarker',
      });
    },
  },
  [ETypeCategory.FIX_LOCK]: {
    icon: 'fixLock',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'thợ sửa khóa',
        marker: 'repairerMarker',
      });
    },
  },
  [ETypeCategory.REPAIRS]: {
    icon: 'repairs',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'thợ sửa xe',
        marker: 'repairerMarker',
      });
    },
  },
  [ETypeCategory.RESCUE]: {
    icon: 'rescue',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'rửa xe',
        marker: 'repairerMarker',
      });
    },
  },
  [ETypeCategory.FACTORY]: {
    icon: 'Factory',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'nhà xưởng',
        marker: 'laborMarker',
      });
    },
  },
  [ETypeCategory.WASH_SOFA]: {
    icon: 'washSofa',
    onPress: () => {
      Toast.show({
        text1: 'Tính năng đang được phát triển',
        position: 'top',
        type: 'error',
      });
    },
  },
  [ETypeCategory.WASH_CURTAINS]: {
    icon: 'washCurtains',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'gặt sofa',
        marker: 'laborMarker',
      });
    },
  },
  [ETypeCategory.CONSTRUCTION]: {
    icon: 'construction',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'công trình',
        marker: 'laborMarker',
      });
    },
  },
  [ETypeCategory.DRAIN_2]: {
    icon: 'drain2',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'thông cống',
        marker: 'laborMarker',
      });
    },
  },
  [ETypeCategory.CLEAN_GLASSES]: {
    icon: 'cleaningGlasses',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'lau kính',
        marker: 'laborMarker',
      });
    },
  },
  [ETypeCategory.LINE_UP]: {
    icon: 'lineUp',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'ba gác',
        marker: 'laborMarker',
      });
    },
  },
  [ETypeCategory.LAUNDRY]: {
    icon: 'laundry',
    onPress: () => {
      NavigationService.navigate(Routes.FindCar, {
        type: FindCarType.CAR_DRIVER,
        title: 'giặt ủi',
        marker: 'laborMarker',
      });
    },
  },
};

interface IPromoCondition {
  condition_value: number;
  condition_type: 'MINIMUM_ORDER';
}

interface IPromoOffer {
  offer_type: 'DISCOUNT_ORDER';
  offer_value: number;
  offer_unit: 'AMOUNT';
}

interface IPromoQuantity {
  remaining: number;
  initialized: number;
}

export interface IPromotion {
  condition: IPromoCondition;
  offer: IPromoOffer;
  quantity: IPromoQuantity;
  status: 'ACTIVE';
  apply_payment_methods: ['ALL'];
  _id: string;
  name: string;
  start_date: string;
  end_date: string;
  code: string;
  usable_catalog: 'ALL';
  id: string;
  image_url: string;
  description: string;
  restaurant_id: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface IMetaDataResponse<T = any> {
  status: number;
  data: Data<T>;
}

export interface Data<T> {
  result: T[];
  total?: number;
  currentPage?: number;
  limit?: number;
}

export interface IPromotion {
  condition: IPromoCondition;
  offer: IPromoOffer;
  quantity: IPromoQuantity;
  status: 'ACTIVE';
  apply_payment_methods: ['ALL'];
  _id: string;
  name: string;
  start_date: string;
  end_date: string;
  code: string;
  usable_catalog: 'ALL';
  id: string;
  image_url: string;
  description: string;
  restaurant_id: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
