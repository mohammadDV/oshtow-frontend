"use client";

import { useState, useEffect } from "react";
import { Combobox } from "@/ui/combobox";
import { getProvinces, getCities, getCityDetails } from "../../_api/getLocations";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useFetchData } from "@/hooks/useFetchData";
import { apiUrls } from "@/constants/apiUrls";
import { ApiResponse } from "@/core/http-service";
import { City, Country, Province } from "@/types/location.type";

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
  const params = useParams();
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
  const [isInitializing, setIsInitializing] = useState(false);

  const countries: Country[] = countriesResponse?.isSuccess ? countriesResponse.data : [];

  // Initialize from URL parameters with proper dependency handling
  useEffect(() => {
    const initializeFromURL = async () => {
      const countryId = searchParams.get('o_country_id');
      const provinceId = searchParams.get('o_province_id');
      const cityId = searchParams.get('o_city_id');

      // If no parameters exist, clear all selections
      if (!countryId && !provinceId && !cityId) {
        setSelectedCountry("");
        setSelectedProvince("");
        setSelectedCity("");
        setProvinces([]);
        setCities([]);
        return;
      }

      setIsInitializing(true);

      try {
        if (cityId && !provinceId && !countryId) {
          // Only city ID provided - fetch city details to get province and country
          const cityResponse = await getCityDetails(parseInt(cityId));
          if (cityResponse.isSuccess && cityResponse.data.length > 0) {
            const cityData = cityResponse.data[0];
            const countryIdFromCity = cityData.province.country.id.toString();
            const provinceIdFromCity = cityData.province.id.toString();

            setSelectedCountry(countryIdFromCity);
            setSelectedProvince(provinceIdFromCity);
            setSelectedCity(cityId);

            // Load provinces for the country
            const provincesResponse = await getProvinces(cityData.province.country.id);
            if (provincesResponse.isSuccess) {
              setProvinces(provincesResponse.data);
            }

            // Load cities for the province
            const citiesResponse = await getCities(cityData.province.id);
            if (citiesResponse.isSuccess) {
              setCities(citiesResponse.data);
            }
          }
        } else if (provinceId && !countryId) {
          // Only province ID provided - need to find country
          // We can get this by fetching cities and getting the first city's details
          const citiesResponse = await getCities(parseInt(provinceId));
          if (citiesResponse.isSuccess && citiesResponse.data.length > 0) {
            const firstCityId = citiesResponse.data[0].id;
            const cityDetailsResponse = await getCityDetails(firstCityId);
            if (cityDetailsResponse.isSuccess && cityDetailsResponse.data.length > 0) {
              const countryIdFromProvince = cityDetailsResponse.data[0].province.country.id.toString();

              setSelectedCountry(countryIdFromProvince);
              setSelectedProvince(provinceId);
              if (cityId) setSelectedCity(cityId);

              // Load provinces for the country
              const provincesResponse = await getProvinces(cityDetailsResponse.data[0].province.country.id);
              if (provincesResponse.isSuccess) {
                setProvinces(provincesResponse.data);
              }

              setCities(citiesResponse.data);
            }
          }
        } else {
          // Normal case - country provided or all provided
          if (countryId) {
            setSelectedCountry(countryId);

            // Load provinces
            const provincesResponse = await getProvinces(parseInt(countryId));
            if (provincesResponse.isSuccess) {
              setProvinces(provincesResponse.data);
            }
          }

          if (provinceId) {
            setSelectedProvince(provinceId);

            // Load cities
            const citiesResponse = await getCities(parseInt(provinceId));
            if (citiesResponse.isSuccess) {
              setCities(citiesResponse.data);
            }
          }

          if (cityId) {
            setSelectedCity(cityId);
          }
        }
      } catch (error) {
        console.error('Error initializing from URL:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    if (countries.length > 0) {
      initializeFromURL();
    }
  }, [searchParams, countries]);

  useEffect(() => {
    if (selectedCountry && !isInitializing) {
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
    } else if (!selectedCountry) {
      setProvinces([]);
      setSelectedProvince("");
      setSelectedCity("");
    }
  }, [selectedCountry, isInitializing]);

  useEffect(() => {
    if (selectedProvince && !isInitializing) {
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
    } else if (!selectedProvince) {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedProvince, isInitializing]);

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
    router.push(`/projects/${params.type}${queryString ? `?${queryString}` : ''}`);
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
        placeholder={loadingCountries
          ? tCommon("messages.loading")
          : tPage("projects.chooseOriginCountry")}
        className="w-full"
      />

      <Combobox
        options={provinceOptions}
        value={selectedProvince}
        onChange={handleProvinceChange}
        placeholder={loadingProvinces
          ? tCommon("messages.loading")
          : tPage("projects.chooseOriginProvince")}
        className="w-full"
      />

      <Combobox
        options={cityOptions}
        value={selectedCity}
        onChange={handleCityChange}
        placeholder={loadingCities
          ? tCommon("messages.loading")
          : tPage("projects.chooseOriginCity")}
        className="w-full"
      />
    </div>
  );
};