import { BookingStatusEnum } from '../../graphql/type.interface';

export const bookingStatusMapping = {
  waitToConfirm: [BookingStatusEnum.WAIT_FOR_CONFIRM, BookingStatusEnum.ASSIGNED_TECHNICIAN],
  onGoing: [BookingStatusEnum.RESCHEDULED, BookingStatusEnum.TECHNICIAN_ARRIVING],
  checking: [
    BookingStatusEnum.TECHNICIAN_ARRIVED,
    BookingStatusEnum.QUOTATION_REQUESTED,
    BookingStatusEnum.QUOTATION_REJECTED,
    BookingStatusEnum.QUOTATION_ACCEPTED,
    BookingStatusEnum.SETTLEMENT_REQUESTED,
    BookingStatusEnum.SETTLEMENT_ACCEPTED,
    BookingStatusEnum.SETTLEMENT_REJECTED,
  ],
  completed: [BookingStatusEnum.COMPLETE],
  canceled: [BookingStatusEnum.CANCEL],
};
