"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Project, ProjectType } from "@/types/project.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ProjectClaimsCard } from "../card";

interface ReceivedClaimsListProps {
    data: Project[];
    selectedType?: ProjectType;
}

export const ReceivedClaimsList = ({ data, selectedType }: ReceivedClaimsListProps) => {
    const t = useCommonTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            if (name === 'type') {
                params.delete('page');
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleStatusSelect = (type?: ProjectType) => {
        const queryString = createQueryString('type', type || '');
        router.push(`/profile/claims/received?${queryString}`);
    };

    const claimTypes = [
        {
            value: undefined,
            label: t("projectTypes.all")
        },
        {
            value: "sender" as ProjectType,
            label: t("projectTypes.sender")
        },
        {
            value: "passenger" as ProjectType,
            label: t("projectTypes.passenger")
        },
    ];

    return (
        <div className="mt-3">
            <div className='flex items-center w-max py-1 lg:py-0 lg:justify-end gap-2 overflow-auto'>
                {claimTypes.map((option) => {
                    const isSelected = selectedType === option.value;
                    return (
                        <div
                            key={option.label}
                            onClick={() => handleStatusSelect(option.value)}
                            className={cn(
                                'border rounded-full px-3 py-1 cursor-pointer text-sm transition-all min-w-max',
                                isSelected
                                    ? 'border-sub text-primary bg-primary/10'
                                    : 'border-border text-title hover:border-sub/50 bg-white'
                            )}
                        >
                            {option.label}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-col gap-4 mt-6">
                {data?.length > 0 ? (
                    data.map((item) => (
                        <ProjectClaimsCard key={item.id} data={item} />
                    ))
                ) : (
                    <div className="text-center py-8 text-text">
                        {t("messages.noResult")}
                    </div>
                )}
            </div>
        </div>
    )
}