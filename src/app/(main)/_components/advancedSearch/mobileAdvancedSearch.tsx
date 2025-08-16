"use client"

import { Modal } from "@/app/_components/modal";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { cn, isEmpty } from "@/lib/utils";
import { CityWithDetails } from "@/types/location.type";
import { PathType, Project, ProjectType } from "@/types/project.type";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryFilter } from "./CategoryFilter";
import { CitySearchInput } from "./CitySearchInput";
import { DateRangeInput } from "./DateRangeInput";
import { PathTypeFilter } from "./PathTypeFilter";
import { getProjectsSearch, ProjectSearchParams } from "./searchServices";

export const MobileAdvancedSearch = () => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState<ProjectType>("passenger");
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

    const [originCity, setOriginCity] = useState<CityWithDetails | null>(null);
    const [destinationCity, setDestinationCity] = useState<CityWithDetails | null>(null);
    const [dateRange, setDateRange] = useState<{ from: string; to: string } | null>(null);
    const [pathType, setPathType] = useState<PathType | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const [searchResults, setSearchResults] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<ProjectSearchParams | null>(null);

    const searchTabs = [
        {
            id: 1,
            value: "passenger",
            icon: "ion--airplane",
            label: tPages("home.passengers"),
        },
        {
            id: 2,
            value: "sender",
            icon: "solar--bag-4-bold",
            label: tPages("home.senders"),
        },
    ];

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

        try {
            const response = await getProjectsSearch(searchParams);
            setSearchResults(response.data);
            setIsSearchModalOpen(false);
            setIsResultsModalOpen(true);
        } catch (error) {
            console.error("Search failed:", error);
        }
        setIsLoading(false);
    };

    const handleShowMore = () => {
        if (!searchParams) return;

        const queryParams = new URLSearchParams();
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
            queryParams.append("categories", searchParams.categories.toString());

        if (searchResults && searchResults?.length > 0) {
            router.push(`/projects/${searchParams.type}?${queryParams.toString()}`);
        } else router.push(`/projects/${searchParams.type}`);

        setIsResultsModalOpen(false);
    };

    const backToSearchHandler = () => {
        setIsSearchModalOpen(true);
        setIsResultsModalOpen(false);
    }

    const resetValues = () => {
        setOriginCity(null);
        setDestinationCity(null);
        setDateRange(null);
        setPathType(null);
        setSelectedCategory(null);
    }

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
                                        <div className="absolute h-px lg:h-0.5 rounded-full bg-sub -bottom-3 lg:-bottom-4.5 left-0 right-0"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-px bg-gradient-to-l from-border to-transparent mt-2.5 lg:mt-3.5"></div>
                    <div className="mt-5 lg:mt-7 flex items-center justify-between"
                        onClick={() => setIsSearchModalOpen(true)}>
                        <div className="flex-1 flex items-center gap-5">
                            <div className="flex gap-2">
                                <Icon icon="solar--map-point-outline" sizeClass="size-7 lg:size-8" className="text-caption" />
                                <div>
                                    <p className="text-title font-medium text-lg lg:text-xl">
                                        {tPages('home.originCity')}
                                    </p>
                                    <p className="text-caption lg:text-base text-sm mt-1 lg:mt-1.5 font-light">
                                        {selectedTab === "passenger"
                                            ? tPages('home.originPassengerDescription')
                                            : tPages('home.originSenderDescription')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="size-11 lg:size-16 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-all"
                        >
                            <Icon icon="solar--magnifer-outline" sizeClass="size-5 lg:size-7" className="text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={isSearchModalOpen}
                title={selectedTab === "passenger"
                    ? tPages("home.searchPassenger")
                    : tPages("home.searchSender")
                }
                onOpenChange={setIsSearchModalOpen}
                showCancel={true}
                cancelText={tCommon("buttons.cancel")}
                confirmText={tCommon("buttons.searchAdd")}
                onConfirm={handleSearch}
                loading={isLoading}
                disabled={!originCity || !destinationCity}
            >

                <div className="flex justify-end mb-4">
                    <button
                        onClick={resetValues}
                        className={cn("text-primary transition-colors text-sm flex items-center gap-1",
                            (isEmpty(originCity) && isEmpty(destinationCity) && isEmpty(dateRange) && isEmpty(pathType) && isEmpty(selectedCategory)) && "pointer-events-none opacity-50 text-caption"
                        )}
                        type="button"
                        disabled={isEmpty(originCity) && isEmpty(destinationCity) && isEmpty(dateRange) && isEmpty(pathType) && isEmpty(selectedCategory)}
                    >
                        <Icon icon="solar--refresh-outline" sizeClass="size-4" />
                        {tCommon("buttons.clearFilters")}
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <CitySearchInput
                            placeholder={tPages("home.originCity")}
                            icon="solar--map-point-outline"
                            description={selectedTab === "passenger"
                                ? tPages('home.originPassengerDescription')
                                : tPages('home.originSenderDescription')}
                            value={originCity}
                            onChange={setOriginCity}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <CitySearchInput
                            placeholder={tPages("home.destinationCity")}
                            icon="solar--map-point-outline"
                            description={selectedTab === "passenger"
                                ? tPages('home.destinationPassengerDescription')
                                : tPages('home.destinationSenderDescription')}
                            value={destinationCity}
                            onChange={setDestinationCity}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <DateRangeInput
                            icon="solar--calendar-outline"
                            placeholder={tPages("home.passengerDate")}
                            description={
                                selectedTab === "passenger"
                                    ? tPages("home.datePassengerDescription")
                                    : tPages("home.dateSenderDescription")
                            }
                            value={dateRange}
                            onChange={setDateRange}
                            className="w-full"
                        />
                    </div>

                    <div className="border border-border rounded-xl p-2.5">
                        <p className="text-title mb-2">
                            {selectedTab === 'passenger'
                                ? tCommon("inputs.selectPath")
                                : tCommon("inputs.selectCategory")}
                        </p>

                        {selectedTab === 'passenger' && (
                            <div>
                                <PathTypeFilter value={pathType} onChange={setPathType} />
                            </div>
                        )}

                        {selectedTab === 'sender' && (
                            <div>
                                <CategoryFilter
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Modal>

            <Modal
                open={isResultsModalOpen}
                onOpenChange={setIsResultsModalOpen}
                title={tPages("home.searchResults")}
                size="xl"
                onConfirm={handleShowMore}
                confirmText={tCommon('buttons.seeAllResults')}
                cancelText={tCommon("buttons.backToSearch")}
                onCancel={backToSearchHandler}
            >
                <div className="space-y-4">
                    {searchResults && searchResults?.length > 0 ? (
                        <div className="grid gap-3">
                            {searchResults.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`${selectedTab}/${project.id}`}
                                    className="border-2 border-border rounded-2xl p-4 hover:border-sub transition-all"
                                    onClick={() => setIsResultsModalOpen(false)}
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
                    ) : (
                        <div className="text-center text-lg py-8 text-caption">
                            {tCommon('messages.noResult')}
                        </div>
                    )}
                </div>
            </Modal>
        </>
    )
}