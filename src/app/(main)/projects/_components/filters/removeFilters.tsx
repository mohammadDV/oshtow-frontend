"use client"

import { usePagesTranslation } from "@/hooks/useTranslation"
import { Icon } from "@/ui/icon"
import { useParams, useRouter, useSearchParams } from "next/navigation"

export const RemoveFilters = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const params = useParams();
    const t = usePagesTranslation()

    const handleClearFilters = () => {
        router.push(`/projects/${params.type}`);
    };

    return (
        searchParams.size > 0 && <span
            className="text-sm text-primary flex items-center gap-1 bg-white lg:bg-transparent px-3 py-1.5 lg:p-0 rounded-full font-normal cursor-pointer hover:underline transition-colors"
            onClick={handleClearFilters}
            role="button"
            tabIndex={0}
        >
            <Icon icon="ep--close" sizeClass="size-3.5" />
            {t("projects.removeFilters")}
        </span>
    )
}