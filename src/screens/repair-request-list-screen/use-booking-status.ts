import { useMemo } from 'react';

import { useAuth } from '../../contexts';
import { BookingStatusEnum, PartnerTypeEnum } from '../../graphql/type.interface';

export const bookingStatusAgencyMapping = {
  waitToConfirm: [BookingStatusEnum.WAIT_FOR_CONFIRM],
  onGoing: [BookingStatusEnum.ASSIGNED_TECHNICIAN],
  checking: [BookingStatusEnum.RESCHEDULED, BookingStatusEnum.TECHNICIAN_ARRIVING],
  handOver: [
    BookingStatusEnum.TECHNICIAN_ARRIVED,
    BookingStatusEnum.QUOTATION_REQUESTED,
    BookingStatusEnum.QUOTATION_REJECTED,
    BookingStatusEnum.QUOTATION_ACCEPTED,
    BookingStatusEnum.SETTLEMENT_ACCEPTED,
    BookingStatusEnum.SETTLEMENT_REJECTED,
    BookingStatusEnum.SETTLEMENT_REQUESTED,
  ],
  completed: [BookingStatusEnum.COMPLETE],
  canceled: [BookingStatusEnum.CANCEL],
};

export const bookingStatusTechnicianMapping = {
  waitToConfirm: [BookingStatusEnum.WAIT_FOR_CONFIRM, BookingStatusEnum.ASSIGNED_TECHNICIAN],
  onGoing: [BookingStatusEnum.RESCHEDULED, BookingStatusEnum.TECHNICIAN_ARRIVING],
  checking: [
    BookingStatusEnum.TECHNICIAN_ARRIVED,
    BookingStatusEnum.QUOTATION_REQUESTED,
    BookingStatusEnum.QUOTATION_REJECTED,
    BookingStatusEnum.QUOTATION_ACCEPTED,
  ],
  handOver: [
    BookingStatusEnum.SETTLEMENT_ACCEPTED,
    BookingStatusEnum.SETTLEMENT_REJECTED,
    BookingStatusEnum.SETTLEMENT_REQUESTED,
  ],
  completed: [BookingStatusEnum.COMPLETE],
  canceled: [BookingStatusEnum.CANCEL],
};

export const useBookingStatus = () => {
  const { partner } = useAuth();

  const isAgency = useMemo(() => partner?.type === PartnerTypeEnum.AGENCY, [partner?.type]);

  const bookingStatusMapping = useMemo(() => {
    if (isAgency) {
      return bookingStatusAgencyMapping;
    }
    return bookingStatusTechnicianMapping;
  }, [isAgency]);

  return { bookingStatusMapping, isAgency };
};
