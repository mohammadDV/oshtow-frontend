export interface Country {
  id: number;
  title: string;
  image: string | null;
  status: number;
  created_at: string | null;
  updated_at?: string | null;
}

export interface Province {
  id: number;
  title: string;
  status: number;
  country_id: number;
  created_at: string | null;
  updated_at?: string | null;
  image?: string | null;
  country?: Country;
}

export interface City {
  id: number;
  title: string;
  status: number;
  province_id: number;
  created_at: string | null;
  updated_at?: string | null;
}

export interface CityWithDetails extends City {
  province: Province;
}

export interface Location {
  country: Country;
  province: Province;
  city: City;
}

export interface CitySearchParams {
  query?: string;
  count?: number;
  page?: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface CitySearchResponse {
  current_page: number;
  data: CityWithDetails[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}