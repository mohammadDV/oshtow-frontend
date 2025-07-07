import { apiUrls } from "@/constants/apiUrls";
import { getFetch } from "@/core/publicService";
import { CitySearchParams, CitySearchResponse } from "@/types/location.type";
import { PathType, ProjectSearchResponse, ProjectType } from "@/types/project.type";
import { Category } from "@/types/category.type";

export interface ProjectSearchParams {
  type: ProjectType;
  page: number;
  count: number;
  o_city_id?: number;
  d_city_id?: number;
  send_date?: string;
  receive_date?: string;
  path_type?: PathType;
  categories?: number;
}

export const getCitiesSearch = async (
  params: CitySearchParams
): Promise<CitySearchResponse> => {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.append("query", params.query);
  if (params.count) searchParams.append("count", params.count.toString());
  if (params.page) searchParams.append("page", params.page.toString());

  const url = `${apiUrls.locations.cities}?${searchParams.toString()}`;

  return await getFetch<CitySearchResponse>(url);
};

export const getActiveCategories = async (): Promise<Category[]> => {
  return await getFetch<Category[]>(apiUrls.categories.active);
};

export const getProjectsSearch = async (
  params: ProjectSearchParams
): Promise<ProjectSearchResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.append("type", params.type);
  if (params.page) searchParams.append("page", params.page.toString());
  if (params.count) searchParams.append("count", params.count.toString());
  if (params.o_city_id)
    searchParams.append("o_city_id", params.o_city_id.toString());
  if (params.d_city_id)
    searchParams.append("d_city_id", params.d_city_id.toString());
  if (params.send_date) searchParams.append("send_date", params.send_date);
  if (params.receive_date)
    searchParams.append("receive_date", params.receive_date);
  if (params.path_type) searchParams.append("path_type", params.path_type);
  if (params.categories)
    searchParams.append("categories[]", params.categories.toString());

  const url = `${apiUrls.projects.search}?${searchParams.toString()}`;

  return await getFetch<ProjectSearchResponse>(url);
};
