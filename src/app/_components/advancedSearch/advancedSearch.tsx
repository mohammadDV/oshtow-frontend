"use client";

import { usePagesTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import { useEffect, useState } from "react";
import { CityWithDetails } from "@/types/location.type";
import { Modal } from "../modal/modal";
import { getProjectsSearch, ProjectSearchParams } from "./searchServices";
import {
  ProjectSearchResponse,
  Project,
  ProjectType,
  PathType,
} from "@/types/project.type";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { Loading } from "@/ui/loading";
import Link from "next/link";
import { CitySearchInput } from "./CitySearchInput";
import { DateRangeInput } from "./DateRangeInput";
import { PathTypeFilter } from "./PathTypeFilter";
import { CategoryFilter } from "./CategoryFilter";
import { Combobox } from "@/ui/combobox";

export const AdvancedSearch = () => {
  const t = usePagesTranslation();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<ProjectType>("passenger");
  const [originCity, setOriginCity] = useState<CityWithDetails | null>(null);
  const [destinationCity, setDestinationCity] = useState<CityWithDetails | null>(null);
  const [dateRange, setDateRange] = useState<{ from: string; to: string; } | null>(null);
  const [pathType, setPathType] = useState<PathType | null>();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<ProjectSearchParams | null>(
    null
  );

  const searchTabs = [
    {
      id: 1,
      value: "passenger",
      icon: "ion--airplane",
      label: t("home.passengers"),
    },
    {
      id: 2,
      value: "sender",
      icon: "solar--bag-4-bold",
      label: t("home.senders"),
    },
  ];

  useEffect(() => {
    setSelectedCategory(null);
    if (selectedTab === 'sender') {
      setPathType(undefined)
    } else setPathType('air')
  }, [selectedTab])

  const selectTabHandler = (value: ProjectType) => setSelectedTab(value);

  const handleSearch = async () => {
    if (!originCity || !destinationCity) {
      return;
    }

    setIsLoading(true);

    const searchParams: ProjectSearchParams = {
      type: selectedTab,
      page: 1,
      count: 9,
      o_city_id: originCity?.id,
      d_city_id: destinationCity?.id,
      send_date: dateRange?.from,
      receive_date: dateRange?.to,
      path_type: pathType || undefined,
      categories: selectedCategory || undefined,
    };

    setSearchParams(searchParams);

    const response = await getProjectsSearch(searchParams);
    if (response.isSuccess && response.data) {
      const projectData = response.data as ProjectSearchResponse;
      setSearchResults(projectData.data);
      setIsModalOpen(true);
    } else {
      console.error("Search failed:");
    }
    setIsLoading(false);
  };

  const handleShowMore = () => {
    if (!searchParams) return;

    const queryParams = new URLSearchParams();
    queryParams.append("type", searchParams.type);
    if (searchParams.o_city_id)
      queryParams.append("o_city_id", searchParams.o_city_id.toString());
    if (searchParams.d_city_id)
      queryParams.append("d_city_id", searchParams.d_city_id.toString());
    if (searchParams.send_date)
      queryParams.append("send_date", searchParams.send_date);
    if (searchParams.receive_date)
      queryParams.append("receive_date", searchParams.receive_date);
    if (searchParams.path_type)
      queryParams.append("path_type", searchParams.path_type);
    if (searchParams.categories)
      queryParams.append("path_type", searchParams.categories.toString());

    router.push(`/projects/${searchParams.type}?${queryParams.toString()}`);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="lg:max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl lg:rounded-3xl lg:py-6 lg:px-8 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-7">
              {searchTabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => selectTabHandler(tab.value as ProjectType)}
                  className="flex items-center relative gap-2 cursor-pointer"
                >
                  <Icon
                    icon={tab.icon}
                    className={cn(
                      "size-6 transition-all",
                      tab.value === selectedTab ? "text-primary" : "text-caption"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm lg:text-base",
                      tab.value === selectedTab
                        ? "text-primary font-medium"
                        : "text-caption font-normal"
                    )}
                  >
                    {tab.label}
                  </span>
                  {tab.value === selectedTab && (
                    <div className="absolute h-px lg:h-0.5 rounded-full bg-sub -bottom-3 lg:-bottom-5 left-0 right-0"></div>
                  )}
                </div>
              ))}
            </div>
            {selectedTab === 'passenger' && (
              <PathTypeFilter
                value={pathType}
                onChange={setPathType}
              />
            )}
            {selectedTab === 'sender' && (
              <CategoryFilter
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            )}
          </div>
          <div className="h-px bg-gradient-to-l from-border to-transparent mt-2.5 lg:mt-4"></div>
          <div className="mt-5 lg:mt-8 flex items-center justify-between">
            <div className="flex-1 flex items-center gap-6">
              <CitySearchInput
                icon="solar--map-point-outline"
                placeholder={t("home.originCity")}
                description={t("home.originDescription")}
                value={originCity}
                onChange={setOriginCity}
              />

              <div className="hidden lg:block">
                <CitySearchInput
                  icon="solar--map-point-outline"
                  placeholder={t("home.intentionCity")}
                  description={t("home.intentionDescription")}
                  value={destinationCity}
                  onChange={setDestinationCity}
                />
              </div>

              <div className="hidden lg:block">
                <DateRangeInput
                  icon="solar--calendar-outline"
                  placeholder={t("home.passengerDate")}
                  description={t("home.dateDescription")}
                  value={dateRange}
                  onChange={setDateRange}
                />
              </div>
            </div>
            <div
              onClick={handleSearch}
              className={cn(
                "size-11 lg:size-16 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-all",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loading type="spinner" className="text-white" size="default" />
              ) : (
                <Icon
                  icon="solar--magnifer-outline"
                  sizeClass="size-5 lg:size-7"
                  className="text-white"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={"نتایج جستجو"}
        size="xl"
        showConfirm={false}
        showCancel={false}
      >
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            <>
              <div className="grid lg:grid-cols-3 gap-3">
                {searchResults.map((project) => (
                  <Link
                    key={project.id}
                    href={`${selectedTab}/${project.id}`}
                    className="border-2 border-border rounded-2xl p-4 hover:border-sub transition-all"
                  >
                    <h3 className="font-semibold text-title mb-3.5">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="solar--map-point-wave-bold-duotone"
                          sizeClass="size-4"
                          className="text-sub"
                        />
                        <p className="text-text text-xs font-normal">
                          {project.origin.city.title} به{" "}
                          {project.destination.city.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="solar--calendar-bold-duotone"
                          sizeClass="size-4"
                          className="text-sub"
                        />
                        <p className="text-text text-xs font-normal">
                          {project.send_date}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center pt-4">
                <Button onClick={handleShowMore} className="w-full sm:w-auto">
                  {/* {t('common.showMore')} */}
                  مشاهده همه نتایج
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center text-lg py-8 text-caption">
              {/* {t('search.noResults')} */}
              نتیجه ای یافت نشد!
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
