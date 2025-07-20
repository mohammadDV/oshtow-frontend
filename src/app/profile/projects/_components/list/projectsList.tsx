"use client";

import { useCommonTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils";
import { Project, ProjectStatusType, ProjectType } from "@/types/project.type";
import { Button } from "@/ui/button";
import { ProfileProjectCard } from "../card/projectCard";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface ProfileProjectsListProps {
    type: ProjectType;
    projects: Project[];
    selectedStatus?: ProjectStatusType;
}

export const ProfileProjectsList = ({ type, projects, selectedStatus }: ProfileProjectsListProps) => {
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
            if (name === 'status') {
                params.delete('page');
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleStatusSelect = (status?: ProjectStatusType) => {
        const queryString = createQueryString('status', status || '');
        router.push(`/profile/projects/${type}?${queryString}`);
    };

    const projectsStatuses = [
        {
            value: undefined,
            label: t("projectStatus.all")
        },
        {
            value: "pending" as ProjectStatusType,
            label: t("projectStatus.pending")
        },
        {
            value: "approved" as ProjectStatusType,
            label: t("projectStatus.approved")
        },
        {
            value: "in_progress" as ProjectStatusType,
            label: t("projectStatus.in_progress")
        },
        {
            value: "completed" as ProjectStatusType,
            label: t("projectStatus.completed")
        },
        {
            value: "canceled" as ProjectStatusType,
            label: t("projectStatus.canceled")
        },
        {
            value: "failed" as ProjectStatusType,
            label: t("projectStatus.failed")
        },
        {
            value: "reject" as ProjectStatusType,
            label: t("projectStatus.reject")
        },
    ];

    return (
        <div className="mt-3">
            <div className="flex items-center justify-between">
                <div className='flex items-center w-max py-1 lg:py-0 lg:justify-end gap-2 overflow-auto'>
                    {projectsStatuses.map((option) => {
                        const isSelected = selectedStatus === option.value;
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
                <Link href={`/profile/projects/${type}/create`}>
                    <Button variant={"default"} className="lg:block hidden">
                        {t("buttons.addNewAd")}
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col gap-5 mt-6">
                {projects?.length > 0 ? (
                    projects.map((project) => (
                        <ProfileProjectCard key={project.id} data={project} type={type} />
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