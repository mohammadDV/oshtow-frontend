"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { CitySearchResponse, CityWithDetails } from "@/types/location.type";
import { Icon } from "@/ui/icon";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { getCitiesSearch } from "./searchServices";
import { useCommonTranslation } from "@/hooks/useTranslation";

interface CitySearchInputProps {
  placeholder: string;
  icon: string;
  description: string;
  value?: CityWithDetails | null;
  onChange?: (city: CityWithDetails | null) => void;
  className?: string;
}

export interface CitySearchInputRef {
  focus: () => void;
}

export const CitySearchInput = forwardRef<CitySearchInputRef, CitySearchInputProps>((
  {
    placeholder,
    icon,
    description,
    value,
    onChange,
    className,
  },
  ref
) => {
  const t = useCommonTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState<CityWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityWithDetails | null>(
    value || null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    setSelectedCity(value || null);
    setSearchQuery(value?.title || "");
  }, [value]);

  useEffect(() => {
    if (debouncedSearchQuery && debouncedSearchQuery.length > 0) {
      searchCities(debouncedSearchQuery);
    } else if (isOpen) {
      loadInitialCities();
    }
  }, [debouncedSearchQuery, isOpen]);

  const loadInitialCities = async () => {
    setLoading(true);
    try {
      const data = await getCitiesSearch({ count: 12, page: 1 });
      setCities(data.data);
    } catch (error) {
      console.error('Failed to load initial cities:', error);
      setCities([]);
    }
    setLoading(false);
  };

  const searchCities = async (query: string) => {
    setLoading(true);
    try {
      const data = await getCitiesSearch({ query, count: 12, page: 1 });
      setCities(data.data);
    } catch (error) {
      console.error('Failed to search cities:', error);
      setCities([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleCitySelect = (city: CityWithDetails) => {
    setSelectedCity(city);
    setSearchQuery(city.title);
    setIsOpen(false);
    setIsFocused(false);
    onChange?.(city);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      setIsFocused(false);
    }, 200);
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  return (
    <div className={cn("flex gap-2 cursor-text border border-border lg:border-none rounded-xl py-3 px-2 lg:p-0", className)} onClick={handleContainerClick}>
      <Icon icon={icon} sizeClass="size-7 lg:size-8" className="text-caption" />
      <div className="flex-1">
        <div
          ref={containerRef}
          className="relative"
        >
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full bg-transparent border-none outline-none text-title font-medium text-lg lg:text-xl"
          />

          {!isFocused && !searchQuery && (
            <div className="absolute inset-0 pointer-events-none text-title font-medium text-lg lg:text-xl">
              {placeholder}
            </div>
          )}

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-caption">
                  {t("inputs.loading")}
                </div>
              ) : cities.length > 0 ? (
                cities.map((city) => (
                  <div
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className="p-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer border-b border-border last:border-b-0"
                  >
                    <div className="font-medium text-title">{city.title}</div>
                    <div className="text-sm text-caption">
                      {city.province.title}، {city.province.country?.title}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-caption">
                  {t("inputs.noCity")}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-caption lg:text-base text-sm mt-1 lg:mt-1.5 font-light">
          {description}
        </p>
      </div>
    </div>
  );
});

CitySearchInput.displayName = 'CitySearchInput';
