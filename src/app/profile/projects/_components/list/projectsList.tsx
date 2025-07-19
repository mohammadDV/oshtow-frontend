"use client";

import { useCommonTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils";
import { ProjectStatusType } from "@/types/project.type";
import { Button } from "@/ui/button";
import { useState } from "react";
import { ProfileProjectCard } from "../card/projectCard";

export const ProfileProjectsList = () => {
    const t = useCommonTranslation();
    const [selectedStatus, setSelectedStatus] = useState<ProjectStatusType>();

    const handleStatusSelect = (status?: ProjectStatusType) => {
        setSelectedStatus(status);
    };

    const projectsStatuses = [
        {
            value: undefined,
            label: t("projectStatus.all")
        },
        {
            value: "pending",
            label: t("projectStatus.pending")
        },
        {
            value: "in_progress",
            label: t("projectStatus.in_progress")
        },
        {
            value: "completed",
            label: t("projectStatus.completed")
        },
        {
            value: "canceled",
            label: t("projectStatus.canceled")
        },
        {
            value: "failed",
            label: t("projectStatus.failed")
        },
        {
            value: "reject",
            label: t("projectStatus.reject")
        },
    ];

    return (
        <div className="mt-3">
            <div className="flex items-center justify-between">
                <div className='flex items-center w-max py-1 lg:py-0 lg:justify-end gap-2.5 overflow-auto'>
                    {projectsStatuses.map((option: any) => {
                        const isSelected = selectedStatus === option.value;
                        return (
                            <div
                                key={option.label}
                                onClick={() => handleStatusSelect(option.value)}
                                className={cn(
                                    'border rounded-full px-3 py-1 cursor-pointer text-sm transition-all min-w-max',
                                    isSelected
                                        ? 'border-sub text-primary bg-primary/10'
                                        : 'border-border text-title hover:border-sub/50'
                                )}
                            >
                                {option.label}
                            </div>
                        );
                    })}
                </div>
                <Button variant={"default"} className="lg:block hidden">
                    {t("buttons.addNewAd")}
                </Button>
            </div>
            <div className="flex flex-col gap-5 mt-6">
                {Array.from({ length: 4 }, (_, index) => (
                    <ProfileProjectCard key={index} />
                ))}
            </div>
        </div>
    )
}