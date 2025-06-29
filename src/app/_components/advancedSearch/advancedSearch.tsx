'use client'

import { usePagesTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import { useState } from "react";

type Tabs = 'passengers' | 'senders'

export const AdvancedSearch = () => {
    const t = usePagesTranslation();

    const searchTabs = [
        {
            id: 1,
            value: "passengers",
            icon: "ion--airplane",
            label: t("home.passengers")
        },
        {
            id: 2,
            value: "senders",
            icon: "solar--bag-4-bold",
            label: t("home.senders")
        },
    ]

    const [selectedTab, setSelectedTab] = useState<Tabs>('passengers');

    const selectTabHandler = (value: Tabs) => setSelectedTab(value)

    return (
        <div className="lg:max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl lg:rounded-3xl lg:py-7 lg:px-10 p-4">
                <div className="flex items-center gap-7">
                    {searchTabs.map(tab => (
                        <div key={tab.id}
                            onClick={() => selectTabHandler(tab.value as Tabs)}
                            className="flex items-center relative gap-2 cursor-pointer">
                            <Icon
                                icon={tab.icon}
                                className={cn('size-6 transition-all',
                                    tab.value === selectedTab ? "text-primary" : "text-caption")} />
                            <span
                                className={cn("text-sm lg:text-base",
                                    tab.value === selectedTab ? "text-primary font-medium" : "text-caption font-normal")}>
                                {tab.label}
                            </span>
                            {tab.value === selectedTab && <div className="absolute h-px lg:h-0.5 rounded-full bg-sub -bottom-3 lg:-bottom-4.5 left-0 right-0"></div>}
                        </div>
                    ))}
                </div>
                <div className="h-px bg-gradient-to-l from-border to-transparent mt-2.5 lg:mt-4"></div>
                <div className="mt-5 lg:mt-8 flex items-center justify-between">
                    <div className="flex-1 flex items-center gap-16">
                        <div className="flex gap-2">
                            <Icon icon="solar--map-point-outline" sizeClass="size-7 lg:size-8" className="text-caption" />
                            <div>
                                <p className="text-title font-medium text-lg lg:text-xl">
                                    {t('home.originCity')}
                                </p>
                                <p className="text-caption lg:text-base text-sm mt-1 lg:mt-1.5 font-light">
                                    {t('home.originDescription')}
                                </p>
                            </div>
                        </div>
                        <div className="hidden lg:flex gap-2">
                            <Icon icon="solar--map-point-outline" sizeClass="size-8" className="text-caption" />
                            <div>
                                <p className="text-title font-medium text-xl">
                                    {t('home.intentionCity')}
                                </p>
                                <p className="text-caption mt-1.5 font-light">
                                    {t('home.intentionDescription')}
                                </p>
                            </div>
                        </div>
                        <div className="hidden lg:flex gap-2">
                            <Icon icon="solar--calendar-outline" sizeClass="size-8" className="text-caption" />
                            <div>
                                <p className="text-title font-medium text-xl">
                                    {t('home.passengerDate')}
                                </p>
                                <p className="text-caption mt-1.5 font-light">
                                    {t('home.dateDescription')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="size-11 lg:size-16 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-all">
                        <Icon icon="solar--magnifer-outline" sizeClass="size-5 lg:size-7" className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    )
}