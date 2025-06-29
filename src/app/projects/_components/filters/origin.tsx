"use client";

import { useState, useEffect } from "react";
import { Combobox } from "@/ui/combobox";
import { getProvinces, getCities } from "../../_api/getLocations";
import { Country, Province, City } from "@/types/project.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useFetchData } from "@/hooks/useFetchData";
import { apiUrls } from "@/constants/apiUrls";
import { ApiResponse } from "@/core/http-service";

interface OriginFilterProps {
  onFilterChange?: (filters: {
    o_country_id?: string;
    o_province_id?: string;
    o_city_id?: string;
  }) => void;
}

export const OriginFilter = ({ onFilterChange }: OriginFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tPage = usePagesTranslation();
  const tCommon = useCommonTranslation();

  const { response: countriesResponse, loading: loadingCountries } = useFetchData<ApiResponse>(apiUrls.locations.countries);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const countries: Country[] = countriesResponse?.isSuccess ? countriesResponse.data : [];

  useEffect(() => {
    const countryId = searchParams.get('o_country_id');
    const provinceId = searchParams.get('o_province_id');
    const cityId = searchParams.get('o_city_id');

    if (countryId) setSelectedCountry(countryId);
    if (provinceId) setSelectedProvince(provinceId);
    if (cityId) setSelectedCity(cityId);
  }, [searchParams]);

  useEffect(() => {
    if (selectedCountry) {
      const fetchProvinces = async () => {
        setLoadingProvinces(true);
        const response = await getProvinces(parseInt(selectedCountry));
        if (response.isSuccess) {
          setProvinces(response.data);
        } else {
          console.error('Error fetching provinces:', response);
          setProvinces([]);
        }
        setLoadingProvinces(false);
      };

      fetchProvinces();
    } else {
      setProvinces([]);
      setSelectedProvince("");
      setSelectedCity("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        setLoadingCities(true);
        const response = await getCities(parseInt(selectedProvince));
        if (response.isSuccess) {
          setCities(response.data);
        } else {
          console.error('Error fetching cities:', response);
          setCities([]);
        }
        setLoadingCities(false);
      };

      fetchCities();
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedProvince]);

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  const updateURL = (updates: Record<string, string | null>) => {
    const queryString = createQueryString(updates);
    router.push(`projects/senders${queryString ? `?${queryString}` : ''}`);
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedProvince("");
    setSelectedCity("");

    const updates = {
      o_country_id: value || null,
      o_province_id: null,
      o_city_id: null,
    };

    updateURL(updates);
    onFilterChange?.({
      o_country_id: value || undefined,
      o_province_id: undefined,
      o_city_id: undefined,
    });
  };

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedCity("");

    const updates = {
      o_country_id: selectedCountry,
      o_province_id: value || null,
      o_city_id: null,
    };

    updateURL(updates);
    onFilterChange?.({
      o_country_id: selectedCountry || undefined,
      o_province_id: value || undefined,
      o_city_id: undefined,
    });
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);

    const updates = {
      o_country_id: selectedCountry,
      o_province_id: selectedProvince,
      o_city_id: value || null,
    };

    updateURL(updates);
    onFilterChange?.({
      o_country_id: selectedCountry || undefined,
      o_province_id: selectedProvince || undefined,
      o_city_id: value || undefined,
    });
  };

  const countryOptions = countries.map(country => ({
    label: country.title,
    value: country.id.toString(),
  }));

  const provinceOptions = provinces.map(province => ({
    label: province.title,
    value: province.id.toString(),
  }));

  const cityOptions = cities.map(city => ({
    label: city.title,
    value: city.id.toString(),
  }));

  return (
    <div className="space-y-3">
      <Combobox
        options={countryOptions}
        value={selectedCountry}
        onChange={handleCountryChange}
        placeholder={loadingCountries ? tCommon("messages.loading") : tPage("projects.chooseOriginCountry")}
        className="w-full"
      />

      <Combobox
        options={provinceOptions}
        value={selectedProvince}
        onChange={handleProvinceChange}
        placeholder={loadingProvinces ? tCommon("messages.loading") : tPage("projects.chooseOriginProvince")}
        className="w-full"
      />

      <Combobox
        options={cityOptions}
        value={selectedCity}
        onChange={handleCityChange}
        placeholder={loadingCities ? tCommon("messages.loading") : tPage("projects.chooseOriginCity")}
        className="w-full"
      />
    </div>
  );
};