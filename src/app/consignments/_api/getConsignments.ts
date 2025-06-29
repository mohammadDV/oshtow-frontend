import { API_URL } from "@/configs/global";
import { apiUrls } from "@/constants/apiUrls";
import { ProjectSearchResponse } from "@/types/project.type";

interface GetConsignmentsParams {
  page?: number;
  count?: number;
  o_country_id?: string;
  o_province_id?: string;
  o_city_id?: string;
}

export async function getConsignments({
  page = 1,
  count = 12,
  o_country_id,
  o_province_id,
  o_city_id
}: GetConsignmentsParams = {}): Promise<ProjectSearchResponse> {
  const searchParams = new URLSearchParams({
    type: "sender",
    count: count.toString(),
    page: page.toString()
  });

  if (o_country_id) searchParams.set('o_country_id', o_country_id);
  if (o_province_id) searchParams.set('o_province_id', o_province_id);
  if (o_city_id) searchParams.set('o_city_id', o_city_id);

  const res = await fetch(
    `${API_URL}${apiUrls.projects.search}?${searchParams.toString()}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch consignments');
  }

  return res.json();
}