"use client";

import { apiUrls } from "@/constants/apiUrls";
import { useFetchData } from "@/hooks/useFetchData";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { City, Country, Province } from "@/types/location.type";
import { Combobox } from "@/ui/combobox";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getCities, getCityDetails, getProvinces } from "../../_api/getLocations";

interface DestinationFilterProps {
    onFilterChange?: (filters: {
        d_country_id?: string;
        d_province_id?: string;
        d_city_id?: string;
    }) => void;
}

export const DestinationFilter = ({ onFilterChange }: DestinationFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const tPage = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const { response: countriesResponse, loading: loadingCountries } = useFetchData<Country[]>(apiUrls.locations.countries);

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);

    const countries: Country[] = countriesResponse || [];

    // Initialize from URL parameters with proper dependency handling
    useEffect(() => {
        const initializeFromURL = async () => {
            const countryId = searchParams.get('d_country_id');
            const provinceId = searchParams.get('d_province_id');
            const cityId = searchParams.get('d_city_id');

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
                    try {
                        const cityResponse = await getCityDetails(parseInt(cityId));
                        if (cityResponse && cityResponse.length > 0) {
                            const cityData = cityResponse[0];
                            const countryIdFromCity = cityData.province.country.id.toString();
                            const provinceIdFromCity = cityData.province.id.toString();

                            setSelectedCountry(countryIdFromCity);
                            setSelectedProvince(provinceIdFromCity);
                            setSelectedCity(cityId);

                            // Load provinces for the country
                            try {
                                const provincesResponse = await getProvinces(cityData.province.country.id);
                                setProvinces(provincesResponse || []);
                            } catch (error) {
                                console.error('Error fetching provinces:', error);
                                setProvinces([]);
                            }

                            // Load cities for the province
                            try {
                                const citiesResponse = await getCities(cityData.province.id);
                                setCities(citiesResponse || []);
                            } catch (error) {
                                console.error('Error fetching cities:', error);
                                setCities([]);
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching city details:', error);
                    }
                } else if (provinceId && !countryId) {
                    // Only province ID provided - need to find country
                    try {
                        const citiesResponse = await getCities(parseInt(provinceId));
                        if (citiesResponse && citiesResponse.length > 0) {
                            const firstCityId = citiesResponse[0].id;
                            try {
                                const cityDetailsResponse = await getCityDetails(firstCityId);
                                if (cityDetailsResponse && cityDetailsResponse.length > 0) {
                                    const countryIdFromProvince = cityDetailsResponse[0].province.country.id.toString();

                                    setSelectedCountry(countryIdFromProvince);
                                    setSelectedProvince(provinceId);
                                    if (cityId) setSelectedCity(cityId);

                                    // Load provinces for the country
                                    try {
                                        const provincesResponse = await getProvinces(cityDetailsResponse[0].province.country.id);
                                        setProvinces(provincesResponse || []);
                                    } catch (error) {
                                        console.error('Error fetching provinces:', error);
                                        setProvinces([]);
                                    }

                                    setCities(citiesResponse);
                                }
                            } catch (error) {
                                console.error('Error fetching city details:', error);
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching cities:', error);
                    }
                } else {
                    // Normal case - country provided or all provided
                    if (countryId) {
                        setSelectedCountry(countryId);

                        // Load provinces
                        try {
                            const provincesResponse = await getProvinces(parseInt(countryId));
                            setProvinces(provincesResponse || []);
                        } catch (error) {
                            console.error('Error fetching provinces:', error);
                            setProvinces([]);
                        }
                    }

                    if (provinceId) {
                        setSelectedProvince(provinceId);

                        // Load cities
                        try {
                            const citiesResponse = await getCities(parseInt(provinceId));
                            setCities(citiesResponse || []);
                        } catch (error) {
                            console.error('Error fetching cities:', error);
                            setCities([]);
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
                try {
                    const response = await getProvinces(parseInt(selectedCountry));
                    setProvinces(response || []);
                } catch (error) {
                    console.error('Error fetching provinces:', error);
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
                try {
                    const response = await getCities(parseInt(selectedProvince));
                    setCities(response || []);
                } catch (error) {
                    console.error('Error fetching cities:', error);
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
            d_country_id: value || null,
            d_province_id: null,
            d_city_id: null,
        };

        updateURL(updates);
        onFilterChange?.({
            d_country_id: value || undefined,
            d_province_id: undefined,
            d_city_id: undefined,
        });
    };

    const handleProvinceChange = (value: string) => {
        setSelectedProvince(value);
        setSelectedCity("");

        const updates = {
            d_country_id: selectedCountry,
            d_province_id: value || null,
            d_city_id: null,
        };

        updateURL(updates);
        onFilterChange?.({
            d_country_id: selectedCountry || undefined,
            d_province_id: value || undefined,
            d_city_id: undefined,
        });
    };

    const handleCityChange = (value: string) => {
        setSelectedCity(value);

        const updates = {
            d_country_id: selectedCountry,
            d_province_id: selectedProvince,
            d_city_id: value || null,
        };

        updateURL(updates);
        onFilterChange?.({
            d_country_id: selectedCountry || undefined,
            d_province_id: selectedProvince || undefined,
            d_city_id: value || undefined,
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
                loading={loadingCountries}
                placeholder={tPage("projects.chooseDestinationCountry")}
                className="w-full"
            />

            <Combobox
                options={provinceOptions}
                value={selectedProvince}
                onChange={handleProvinceChange}
                loading={loadingProvinces}
                placeholder={tPage("projects.chooseDestinationProvince")}
                className="w-full"
            />

            <Combobox
                options={cityOptions}
                value={selectedCity}
                onChange={handleCityChange}
                loading={loadingCities}
                placeholder={tPage("projects.chooseDestinationCity")}
                className="w-full"
            />
        </div>
    );
};