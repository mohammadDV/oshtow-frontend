"use client"

import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { cn, isEmpty } from "@/lib/utils";
import { Category } from "@/types/category.type";
import { CityWithDetails } from "@/types/location.type";
import { PathType, Project, ProjectSearchResponse, ProjectType } from "@/types/project.type";
import { Combobox } from "@/ui/combobox";
import { DatePickerComponent } from "@/ui/datepicker";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getActiveCategories, getCitiesSearch, getProjectsSearch, ProjectSearchParams } from "./searchServices";
import { Modal } from "@/app/_components/modal";

export const MobileAdvancedSearch = () => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState<ProjectType>("passenger");
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

    const [originCity, setOriginCity] = useState<string>("");
    const [destinationCity, setDestinationCity] = useState<string>("");
    const [dateRange, setDateRange] = useState<{ from: string; to?: string } | undefined>(undefined);
    const [pathType, setPathType] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
    const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
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

    const pathTypeOptions = [
        { label: tCommon("path.air"), value: "air" },
        { label: tCommon("path.land"), value: "land" },
        { label: tCommon("path.sea"), value: "sea" },
    ];

    const fetchCities = async () => {
        try {
            const response = await getCitiesSearch({ query: "", count: 50, page: 1 });
            if (response.data) {
                const cityOptions = response.data.map((city: CityWithDetails) => ({
                    label: `${city.title} - ${city.province.title}`,
                    value: city.id.toString()
                }));
                setCities(cityOptions);
            }
        } catch (error) {
            console.error('Failed to fetch cities:', error);
        }
    };

    useEffect(() => {
        if (selectedTab === 'sender') {
            const fetchCategories = async () => {
                try {
                    const categories = await getActiveCategories();
                    const categoryOptions = categories.map((category: Category) => ({
                        label: category.title,
                        value: category.id.toString()
                    }));
                    setCategories(categoryOptions);
                } catch (error) {
                    console.error('Failed to fetch categories:', error);
                }
            };
            fetchCategories();
        }
    }, [selectedTab]);

    useEffect(() => {
        if (isSearchModalOpen) {
            fetchCities();
        }
    }, [isSearchModalOpen]);

    useEffect(() => {
        setOriginCity("");
        setDestinationCity("");
        setDateRange(undefined);
        setPathType('');
        setSelectedCategory("");
    }, [selectedTab]);

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
            o_city_id: parseInt(originCity),
            d_city_id: parseInt(destinationCity),
            send_date: dateRange?.from,
            receive_date: dateRange?.to,
            path_type: pathType as PathType || undefined,
            categories: selectedCategory ? parseInt(selectedCategory) : undefined,
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

        router.push(`/projects/${searchParams.type}?${queryParams.toString()}`);
        setIsResultsModalOpen(false);
    };

    const backToSearchHandler = () => {
        setIsSearchModalOpen(true);
        setIsResultsModalOpen(false);
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
                <div className="space-y-4">
                    <div>
                        <Combobox
                            options={cities}
                            value={originCity}
                            onChange={setOriginCity}
                            placeholder={tPages("home.originCity")}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <Combobox
                            options={cities}
                            value={destinationCity}
                            onChange={setDestinationCity}
                            placeholder={tPages("home.destinationCity")}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <DatePickerComponent
                            mode="range"
                            value={dateRange}
                            onChange={(value) => {
                                if (typeof value === 'object' || value === undefined) {
                                    setDateRange(value as { from: string; to?: string } | undefined);
                                }
                            }}
                            placeholder={selectedTab === "passenger"
                                ? tPages("home.passengerDate")
                                : tPages("home.passengerDate")}
                            className="w-full"
                        />
                    </div>

                    {selectedTab === 'passenger' && (
                        <div>
                            <Combobox
                                options={pathTypeOptions}
                                value={pathType}
                                onChange={setPathType}
                                placeholder={tCommon("inputs.selectPath")}
                                className="w-full"
                            />
                        </div>
                    )}

                    {selectedTab === 'sender' && (
                        <div>
                            <Combobox
                                options={categories}
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                placeholder={tCommon("inputs.selectCategory")}
                                className="w-full"
                            />
                        </div>
                    )}
                </div>
            </Modal>

            <Modal
                open={isResultsModalOpen}
                onOpenChange={setIsResultsModalOpen}
                title={tPages("home.searchResults")}
                size="xl"
                onConfirm={handleShowMore}
                confirmText={tCommon('buttons.seeAllResults')}
                showConfirm={searchResults && searchResults?.length > 0}
                showCancel={isEmpty(searchResults)}
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