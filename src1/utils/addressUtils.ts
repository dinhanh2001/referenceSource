import Provinces from './data/provinces';

interface IAddressTerms {
  offset: string;
  value: string;
}

export const getProvinceFromAutocomplete = (
  terms: IAddressTerms[] | undefined,
) => {
  const found = terms?.reverse().find(e => {
    const foundProvince = Provinces.find(
      (p: string) => e?.value?.toLocaleLowerCase() === p?.toLocaleLowerCase(),
    );
    return foundProvince;
  });
  return found?.value;
};
