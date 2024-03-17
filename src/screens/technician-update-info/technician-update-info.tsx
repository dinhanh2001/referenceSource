import { useMemo } from 'react';
import dayjs from 'dayjs';

import { RegisterTechnicianInformationFormData, TechnicianForm } from '../../components';
import { useAuth } from '../../contexts';
export const TechnicianUpdateInfo = () => {
  const { partner } = useAuth();

  const initValues: RegisterTechnicianInformationFormData & { education?: string } = useMemo(() => {
    return {
      fullname: partner?.fullname || '',
      bank: partner?.bank,
      address: {
        lat: partner?.latitude || 0,
        lng: partner?.longitude || 0,
        mapAddress: partner?.mapAddress || '',
      },
      qualifications: partner?.qualifications?.map((item) => item.id) || [],
      education: partner?.education?.id || undefined,
      addressMoreInfo: partner?.addressMoreInfo || '',
      birthday: partner?.birthday ? dayjs(partner?.birthday).format('DD/MM/YYYY') : '',
      phone: partner?.phone || '',
      hotline: partner?.hotline ?? undefined,
      email: partner?.email || '',
      citizenId: partner?.citizenId || '',
      cardNumber: partner?.cardNumber,
      description: partner?.description || undefined,
    };
  }, [partner]);

  return <TechnicianForm type="update" defaultValues={initValues} />;
};
