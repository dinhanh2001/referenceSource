import { CategoryEntity } from '../graphql/type.interface';

export const thousandSeparator = (num: number | string) => {
  let x = num?.toString?.();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1.$2');
  return x;
};

export const phoneWithAsterisks = (phone: string) => {
  if (phone) {
    const arr = phone.split('');
    arr.splice(-6, 3, '*', '*', '*');
    return arr.join('');
  }
  return '';
};

export const getQualification = (qualifications: CategoryEntity[], suffix = 'Chuyên môn') => {
  if (!qualifications || qualifications.length === 0) return '';

  const qualification = qualifications
    ?.map((it, idx: number) => {
      if (idx + 1 === qualifications.length) return it.name;
      return it?.name + ', ';
    })
    .join(' ');

  return `${suffix}: ${qualification}`;
};

export const arrayRange = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_val, index) => start + index * step);
