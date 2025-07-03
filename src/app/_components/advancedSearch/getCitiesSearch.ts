import { apiUrls } from "@/constants/apiUrls";
import { ApiResponse, readData } from "@/core/http-service";
import { CitySearchParams, CitySearchResponse } from "@/types/location.type";

export const getCitiesSearch = async (
  params: CitySearchParams
): Promise<ApiResponse> => {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.append("query", params.query);
  if (params.count) searchParams.append("count", params.count.toString());
  if (params.page) searchParams.append("page", params.page.toString());

  const url = `${apiUrls.locations.cities}?${searchParams.toString()}`;

  return await readData(url);
};
