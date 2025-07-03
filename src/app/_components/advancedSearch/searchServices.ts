import { apiUrls } from "@/constants/apiUrls";
import { ApiResponse, readData } from "@/core/http-service";
import { CitySearchParams } from "@/types/location.type";
import { ProjectType } from "@/types/project.type";

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

export interface ProjectSearchParams {
  type: ProjectType;
  page?: number;
  count?: number;
  o_city_id?: number;
  d_city_id?: number;
  send_date?: string;
  receive_date?: string;
}

export const getProjectsSearch = async (
  params: ProjectSearchParams
): Promise<ApiResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.append("type", params.type);
  if (params.page) searchParams.append("page", params.page.toString());
  if (params.count) searchParams.append("count", params.count.toString());
  if (params.o_city_id) searchParams.append("o_city_id", params.o_city_id.toString());
  if (params.d_city_id) searchParams.append("d_city_id", params.d_city_id.toString());
  if (params.send_date) searchParams.append("send_date", params.send_date);
  if (params.receive_date) searchParams.append("receive_date", params.receive_date);

  const url = `${apiUrls.projects.search}?${searchParams.toString()}`;

  return await readData(url);
};
