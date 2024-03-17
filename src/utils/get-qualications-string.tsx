export const getQualification = (qualifications: any) => {
  if (!qualifications || qualifications.length === 0) return '';
  return qualifications
    ?.map((qualification: any, idx: number) => {
      if (idx + 1 === qualifications.length) return qualification.name;
      return (qualification?.name as string) + ', ';
    })
    .join(' ');
};
