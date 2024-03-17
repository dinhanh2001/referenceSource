import { BookingStatusEnum, QuickAddVehicleInput, StatusEnum, VehicleEntity } from '../graphql/type.interface';
import { BookingFormFields } from '../screens';

export type MyRepairRequestTabScreenParam = {
  bookingStatuses: BookingStatusEnum[];
  refetchBadge?(): Promise<any>;
};

export type RepairRequestTabParamList = {
  'my-repair-request/waiting': MyRepairRequestTabScreenParam;
  'my-repair-request/ongoing': MyRepairRequestTabScreenParam;
  'my-repair-request/checking': MyRepairRequestTabScreenParam;
  'my-repair-request/sucess': MyRepairRequestTabScreenParam;
  'my-repair-request/cancel': MyRepairRequestTabScreenParam;
};

export type RepairStackNavigatorParamList = {
  'repair-request': undefined;
  'repair-request/select-problem': {
    options: {
      label: string;
      value: string;
    }[];
    initialIds?: string[];
    onSelect(ids: string[]): void;
  };
  'repair-request/select-car': {
    isActive?: StatusEnum;
    excludes?: {
      excludeActiveBooking?: boolean;
      excludeActiveMaintenance?: boolean;
    };
    title?: string;
    selectedVehicle?: VehicleEntity;
    quickAddData?: QuickAddVehicleInput;
    onSelect(vehicle: VehicleEntity): void;
    onQuickAddVehicle(data: QuickAddVehicleInput): void;
    textEmpty?: string;
    hideQuickAdd?: boolean;
  };
  'repair-request/select-car/quick-add': {
    quickAddData?: QuickAddVehicleInput;
    onQuickAddVehicle(data: QuickAddVehicleInput): void;
  };
  'repair-request/select-partner': BookingFormFields;
  'repair-request/select-partner/partner-detail': BookingFormFields;
  'repair-request/select-partner/list-technician': { partnerId: string };
};
