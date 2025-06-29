import { apiUrls } from "@/constants/apiUrls";
import { ApiResponse, readData } from "@/core/http-service";

export const getProvinces = async (countryId: number): Promise<ApiResponse> => {
  return await readData(`${apiUrls.locations.provinces}/${countryId}`);
}

export const getCities = async (provinceId: number): Promise<ApiResponse> => {
  return await readData(`${apiUrls.locations.cities}/${provinceId}`);
}