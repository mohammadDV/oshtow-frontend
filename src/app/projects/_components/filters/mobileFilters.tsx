'use client'

import { Modal } from "@/app/_components/modal";
import { ProjectType } from "@/types/project.type";
import { useState } from "react";
import { ProjectsFilters } from "./filters";
import { Icon } from "@/ui/icon";
import { usePagesTranslation } from "@/hooks/useTranslation";

interface MobileProjectsFiltersProps {
    type: ProjectType
}

export const MobileProjectsFilters = ({ type }: MobileProjectsFiltersProps) => {
    const t = usePagesTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="bg-white px-2.5 py-1.5 rounded-full flex items-center gap-1.5 justify-center">
                <Icon
                    icon="solar--filters-outline"
                    sizeClass="size-4"
                    className="text-text"
                />
                <p className="text-sm text-text font-normal">
                    {t("projects.filters")}
                </p>
            </div>
            <Modal
                open={isOpen}
                title={t("projects.filters")}
                onOpenChange={setIsOpen}
                showCancel={false}
                confirmText="مشاهده آگهی ها"
                onConfirm={() => {
                    setIsOpen(false);
                }}
            >
                <ProjectsFilters type={type} />
            </Modal>
        </>

    )
}