import { apiUrls } from "@/constants/apiUrls";
import { getFetch } from "@/core/publicService";

export const getProvinces = async (countryId: number) => {
  return await getFetch(`${apiUrls.locations.provinces}/${countryId}`);
}

export const getCities = async (provinceId: number) => {
  return await getFetch(`${apiUrls.locations.cities}/${provinceId}`);
}

export const getCityDetails = async (cityId: number) => {
  return await getFetch(`${apiUrls.locations.cities}/${cityId}/details`);
}